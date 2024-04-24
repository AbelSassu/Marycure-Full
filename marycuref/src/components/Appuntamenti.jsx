import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useUser, useSession } from "@clerk/clerk-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ServiziContext } from "./ServiziContext";
import Calendario from "./Calendario";
import OrariDisponibili from "./OrariDisponibili";
import NessunServizio from "./NessunServizio";
import { SuccessAnimation, ErrorAnimation } from "./ModaleAppuntamento";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faXmark,
    faChevronDown,
    faChevronUp,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";

const dropdownVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2 },
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.2 },
    },
};

const buttonVariants = {
    hidden: (index) => ({
        x: -30,
        opacity: 0,
        transition: {
            x: {
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: 0.1 + index * 0.1,
            },
            opacity: { duration: 0.2 },
        },
    }),
    visible: (index) => ({
        x: 0,
        opacity: 1,
        transition: {
            x: {
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: 0.1 + index * 0.1,
            },
            opacity: { duration: 0.2 },
        },
    }),
};

const Appuntamenti = () => {
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const [showErrorAnimation, setShowErrorAnimation] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { session } = useSession();
    const { user } = useUser();
    const [orarioSelezionato, setOrarioSelezionato] = useState(null);
    const {
        serviziSelezionati,
        setServiziSelezionati,
        resetServiziSelezionati,
    } = useContext(ServiziContext); // Usa useContext per accedere allo stato e al setter dal tuo context
    const location = useLocation();
    const navigate = useNavigate();
    const serviziSelezionatiDaNavigazione =
        location.state?.serviziSelezionati ?? serviziSelezionati; // Ottieni i servizi selezionati dalla navigazione o dallo stato globale se non ci sono dati di navigazione
    const [lavoratrici, setLavoratrici] = useState([]);
    const [lavoratriceSelezionata, setLavoratriceSelezionata] = useState("any");
    const [orariDisponibili, setOrariDisponibili] = useState([]);
    const [dataSelezionata, setDataSelezionata] = useState(new Date());

    useEffect(() => {
        // Chiamata GET per ottenere le lavoratrici

        axios
            .get("https://localhost:7225/api/Lavoratrici")
            .then((response) => {
                setServiziSelezionati(serviziSelezionatiDaNavigazione);
                setLavoratrici([
                    {
                        lavoratriciID: "any",
                        nomeLav: "Prima operatrice disponibile",
                    },
                    ...response.data.map((l) => ({
                        lavoratriciID: l.lavoratriciID,
                        nomeLav: l.nomeLav,
                    })),
                ]);
            })
            .catch((error) => {
                console.error("Errore nel recupero delle lavoratrici", error);
                // Qui potresti impostare un messaggio di errore nello stato per mostrare un feedback all'utente
            });
    }, [serviziSelezionatiDaNavigazione, setServiziSelezionati]);

    const handleSelect = (lavoratriceId) => {
        onChangeLavoratrice(lavoratriceId);
        setIsDropdownOpen(false);
    };
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const scegliData = (data) => {
        // Imposta l'orario selezionato solo se già presente, altrimenti usa mezzanotte.
        let oraSelezionata = 0;
        let minutiSelezionati = 0;

        if (orarioSelezionato) {
            const orarioDate = new Date(orarioSelezionato.timestamp);
            oraSelezionata = orarioDate.getHours();
            minutiSelezionati = orarioDate.getMinutes();
        }

        const dataConOrario = new Date(
            data.getFullYear(),
            data.getMonth(),
            data.getDate(),
            oraSelezionata,
            minutiSelezionati,
            0,
            0
        );

        setDataSelezionata(dataConOrario);
    };

    const fetchOrariDisponibili = async (
        data,
        lavoratriciID,
        servizioIds,
        token
    ) => {
        servizioIds = Array.isArray(servizioIds) ? servizioIds : [servizioIds];
        const url = new URL(
            "https://localhost:7225/api/Appuntamenti/OrariDisponibili",
            window.location.origin
        );
        const dataFormat = data.toLocaleDateString("en-US");
        url.searchParams.append("data", dataFormat);
        const lavoratriceIdParam =
            lavoratriciID === "any" ? null : lavoratriciID;

        // Altre parti della funzione rimangono invariate...

        if (lavoratriceIdParam !== null) {
            url.searchParams.append("lavoratriceId", lavoratriceIdParam);
        }
        servizioIds.forEach((id) => {
            url.searchParams.append("servizioIds", id);
        });

        try {
            const response = await axios.get(url.toString(), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const slots = response.data;

            let filteredOrari;
            if (lavoratriciID === null) {
                // Filtra per mantenere solo gli slot della lavoratrice con ID 1 se disponibili
                const slotMap = new Map();
                slots.forEach((slot) => {
                    const key = slot.orario;
                    if (!slotMap.has(key) || slot.lavoratriciID === 1) {
                        slotMap.set(key, slot);
                    }
                });
                filteredOrari = Array.from(slotMap.values());
            } else {
                filteredOrari = slots;
            }

            const adaptedOrari = filteredOrari.map((slot) => ({
                ora: new Date(slot.orario).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                }),
                lavoratrice: slot.lavoratrice,
                lavoratriceId: slot.lavoratriceId, // Assicurati che questo valore venga restituito dal backend
                disponibile: true,
                timestamp: new Date(slot.orario).getTime(),
            }));

            adaptedOrari.sort((a, b) => a.timestamp - b.timestamp);
            setOrariDisponibili(adaptedOrari);
        } catch (error) {
            console.error("Errore nel recupero degli orari disponibili", error);
            setOrariDisponibili([]);
        }
    };

    const onChangeLavoratrice = (valoreSelezionato) => {
        setLavoratriceSelezionata(valoreSelezionato);
        // Chiama fetchOrariDisponibili solo se hai tutti i dati necessari
        if (dataSelezionata && serviziSelezionati.length > 0) {
            fetchOrariDisponibili(
                dataSelezionata,
                valoreSelezionato, // passa il nuovo valore selezionato
                serviziSelezionati.map((servizio) => servizio.serviziID)
            );
        }
    };

    useEffect(() => {
        const getTokenAndFetchSlots = async () => {
            // Assicurati che `session` esista prima di chiamare `getToken`
            if (session && dataSelezionata && serviziSelezionati.length > 0) {
                try {
                    const token = await session.getToken();
                    if (token) {
                        const lavoratriciID =
                            lavoratriceSelezionata === "any"
                                ? null
                                : lavoratriceSelezionata;
                        const servizioIds = serviziSelezionati.map(
                            (servizio) => servizio.serviziID
                        );
                        await fetchOrariDisponibili(
                            dataSelezionata,
                            lavoratriciID,
                            servizioIds,
                            token
                        );
                    }
                } catch (error) {
                    console.error(
                        "Si è verificato un errore durante il recupero del token: ",
                        error
                    );
                }
            } else {
                setOrariDisponibili([]);
            }
        };

        // Controlla se la sessione esiste prima di procedere
        if (session) {
            getTokenAndFetchSlots();
        }
    }, [dataSelezionata, lavoratriceSelezionata, serviziSelezionati, session]);

    const riepilogoServizi = serviziSelezionatiDaNavigazione.map(
        (servizio, index) => (
            <div key={index} className="my-2 text-lg">
                {" "}
                <div className="flex">
                    <p className="font-semibold mb-1">{servizio.nomeSer}</p>
                    <button
                        className="rounded-2xl ms-2 mb-1 text-gray-500 px-2 hover:bg-gray-200"
                        onClick={() => rimuoviServizio(servizio)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
                <div>
                    <p>Durata: {servizio.durata}</p>
                    <p className="mt-1">{servizio.prezzo}€</p>
                </div>
            </div>
        )
    );

    const aggiungiServizio = () => {
        navigate("/servizi", {
            state: { serviziSelezionati: serviziSelezionatiDaNavigazione },
        });
    };
    const rimuoviServizio = (servizioDaRimuovere) => {
        const serviziAggiornati = serviziSelezionatiDaNavigazione.filter(
            (servizio) => servizio.serviziID !== servizioDaRimuovere.serviziID
        );
        // Aggiorna lo stato globale per riflettere la rimozione
        setServiziSelezionati(serviziAggiornati);
        if (serviziAggiornati.length === 0) {
            setOrariDisponibili([]);
        } else {
            // Altrimenti, fai un nuovo fetch degli orari disponibili con i servizi rimanenti
            fetchOrariDisponibili(
                dataSelezionata,
                lavoratriceSelezionata,
                serviziAggiornati[0].serviziID
            );
        }

        navigate("/appuntamenti", {
            state: { serviziSelezionati: serviziAggiornati },
        });
    };
    const costoTotale = serviziSelezionatiDaNavigazione.reduce(
        (acc, servizio) => acc + servizio.prezzo,
        0
    );
    const handleOrarioClick = (orario) => {
        // Controlla se l'orario cliccato è già quello selezionato
        if (orarioSelezionato && orarioSelezionato.ora === orario.ora) {
            setOrarioSelezionato(null); // Deseleziona l'orario
        } else {
            const orarioDate = new Date(orario.timestamp);
            const dataConOrario = new Date(
                dataSelezionata.getFullYear(),
                dataSelezionata.getMonth(),
                dataSelezionata.getDate(),
                orarioDate.getHours(),
                orarioDate.getMinutes(),
                0,
                0
            );

            setOrarioSelezionato(orario);
            setDataSelezionata(dataConOrario); // Aggiorna la data selezionata con l'orario cliccato
        }
    };

    const syncUserAndGetUserId = async () => {
        let token;
        if (session) {
            token = await session.getToken();
        }
        try {
            const response = await axios.post(
                "https://localhost:7225/api/Users/sync",
                {
                    ClerkUserId: user.id,
                    Email: user.emailAddresses[0]?.emailAddress,
                    FirstName: user.firstName,
                    LastName: user.lastName,
                    PhoneNumber: user.primaryPhoneNumber?.phoneNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.userID;
        } catch (error) {
            console.error(
                "Errore nel sincronizzare l'utente con Clerk e ottenere l'UserID",
                error
            );
            throw error;
        }
    };

    const confermaAppuntamento = async () => {
        // Se l'utente non è autenticato, salva lo stato e reindirizza al login
        if (!user) {
            sessionStorage.setItem(
                "appuntamentoState",
                JSON.stringify({
                    orarioSelezionato,
                    lavoratriceSelezionata,
                    serviziSelezionati: serviziSelezionatiDaNavigazione,
                })
            );
            navigate("/login");
            return;
        }

        // Assicurati di ottenere il token prima di procedere con la chiamata
        const token = await session.getToken();
        if (!token) {
            alert("Impossibile ottenere il token di autenticazione. Riprova.");
            return;
        }

        try {
            const userId = await syncUserAndGetUserId();
            if (!userId) {
                throw new Error(
                    "UserID non ottenuto dal processo di sincronizzazione."
                );
            }
            const dataAppuntamento = new Date(dataSelezionata);

            // Calcola l'offset del fuso orario in minuti e convertilo in millisecondi
            const timezoneOffset = dataAppuntamento.getTimezoneOffset() * 60000;

            // Sottrai l'offset per ottenere l'ora UTC
            const dataUTC = new Date(
                dataAppuntamento.getTime() - timezoneOffset
            );

            // Converte in stringa ISO senza l'offset del fuso orario
            const dataISO = dataUTC.toISOString();
            const appuntamentoData = {
                data: dataISO,
                lavoratriciID: orarioSelezionato.lavoratriceId,
                userID: userId,
                serviziID: serviziSelezionatiDaNavigazione.map(
                    (s) => s.serviziID
                ),
            };
            // Invia la richiesta POST al server

            const response = await axios.post(
                "https://localhost:7225/api/Appuntamenti",
                appuntamentoData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Appointment created successfully:", response.data);

            // Se tutto va bene, reindirizza l'utente o mostra un messaggio di conferma
            setShowSuccessAnimation(true);
            setTimeout(() => {
                resetServiziSelezionati();
            }, 3000);

            setTimeout(() => {
                navigate("/Prenotazioni");
            }, 3000);
        } catch (error) {
            console.error(
                "Errore durante la creazione dell'appuntamento",
                error
            );
            setShowErrorAnimation(true);
            setTimeout(() => {
                setShowErrorAnimation(false);
            }, 3000);
        }
    };

    const handleCloseSuccessModal = () => showSuccessAnimation(false);
    const handleCloseErrorModal = () => showErrorAnimation(false);

    useEffect(() => {
        // Al caricamento, controlla se c'è uno stato salvato in sessionStorage
        const savedState = sessionStorage.getItem("appuntamentoState");
        if (savedState) {
            const {
                orarioSelezionato,
                lavoratriceSelezionata,
                serviziSelezionati,
            } = JSON.parse(savedState);
            setOrarioSelezionato(orarioSelezionato);
            setLavoratriceSelezionata(lavoratriceSelezionata);
            setServiziSelezionati(serviziSelezionati);
            sessionStorage.removeItem("appuntamentoState"); // Pulisce lo stato salvato
        }
    }, [
        setOrarioSelezionato,
        setLavoratriceSelezionata,
        setServiziSelezionati,
    ]);

    const isFormValid = () => {
        const isValid =
            orarioSelezionato !== null &&
            orarioSelezionato.lavoratriceId !== undefined &&
            serviziSelezionatiDaNavigazione.length > 0 &&
            user !== undefined;

        return isValid;
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Marycure - Scegli appuntamento</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                {showSuccessAnimation && (
                    <SuccessAnimation onClose={handleCloseSuccessModal} />
                )}
                {showErrorAnimation && (
                    <ErrorAnimation onClose={handleCloseErrorModal} />
                )}
                {serviziSelezionati.length === 0 ? (
                    <div className="flex justify-center mt-5">
                        <NessunServizio />
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row md:justify-between bg-white shadow-md rounded-lg px-4 py-10">
                        <div className="mb-4 md:mb-0 md:flex-1 md:mr-4 relative">
                            <div className="relative ">
                                <button
                                    className="border border-verde rounded p-2 pl-10 w-full flex justify-between items-center"
                                    onClick={toggleDropdown}
                                >
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="absolute inset-y-0 mt-3 left-0 flex items-center pl-4 pointer-events-none"
                                    />
                                    <span>
                                        {lavoratrici.find(
                                            (l) =>
                                                l.lavoratriciID ===
                                                lavoratriceSelezionata
                                        )?.nomeLav || "Seleziona operatrice"}
                                    </span>
                                    <FontAwesomeIcon
                                        icon={
                                            isDropdownOpen
                                                ? faChevronUp
                                                : faChevronDown
                                        }
                                        className="mr-3 fa-lg"
                                    />
                                </button>
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            className="absolute mt-1 w-full rounded bg-white shadow-lg"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                        >
                                            {lavoratrici.map(
                                                (lavoratrice, index) => (
                                                    <motion.button
                                                        key={
                                                            lavoratrice.lavoratriciID
                                                        }
                                                        className={`block px-4 py-2 w-full text-left ${
                                                            lavoratrice.lavoratriciID ===
                                                            lavoratriceSelezionata
                                                                ? "bg-gray-300"
                                                                : "hover:bg-gray-100"
                                                        }`}
                                                        onClick={() =>
                                                            handleSelect(
                                                                lavoratrice.lavoratriciID
                                                            )
                                                        }
                                                        variants={
                                                            buttonVariants
                                                        }
                                                        custom={index}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="hidden"
                                                    >
                                                        {lavoratrice.lavoratriciID ===
                                                            lavoratriceSelezionata && (
                                                            <FontAwesomeIcon
                                                                icon={faCheck}
                                                                className="mr-2 text-verde fa-lg"
                                                            />
                                                        )}
                                                        {lavoratrice.nomeLav}
                                                    </motion.button>
                                                )
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="mt-5">
                                <p className="text-center ">
                                    Seleziona data e orario disponibili
                                </p>
                            </div>
                            <div className="flex flex-col 2xl:flex-row items-center 2xl:items-start gap-2 mt-5">
                                <Calendario onChange={scegliData} />
                                <OrariDisponibili
                                    orari={orariDisponibili}
                                    onOrarioClick={handleOrarioClick}
                                    orarioSelezionato={orarioSelezionato}
                                    lavoratriceSelezionata={
                                        lavoratriceSelezionata
                                    }
                                />
                            </div>
                        </div>

                        <div className="md:flex-1 flex flex-col items-start mx-auto lg:ms-10">
                            <div className="mb-4 w-full">
                                <h2 className="text-2xl text-center lg:text-start mb-4 font-semibold">
                                    Riepilogo appuntamento
                                </h2>

                                {riepilogoServizi}

                                <button
                                    className="mt-4 text-verde border border-verde hover:bg-verde hover:text-white font-semibold transition-colors px-4 py-2 rounded-lg shadow text-center"
                                    onClick={aggiungiServizio}
                                >
                                    Aggiungi un altro servizio
                                </button>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">
                                    Totale ordine: €{costoTotale}
                                </span>
                            </div>

                            <button
                                className={`transition-colors font-semibold rounded-full px-4 py-2 rounded shadow-lg mt-3 ${
                                    isFormValid()
                                        ? "bg-verde animation-pulse text-oro"
                                        : "bg-gray-400 text-white"
                                }`}
                                onClick={confermaAppuntamento}
                                disabled={!isFormValid()}
                            >
                                Conferma appuntamento
                            </button>
                            {!isFormValid() && (
                                <div
                                    className="rounded relative mt-5"
                                    role="alert"
                                >
                                    <span>
                                        Devi selezionare una data e
                                        l&apos;orario per poter procedere.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </HelmetProvider>
    );
};

export default Appuntamenti;
