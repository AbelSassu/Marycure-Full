import { useEffect, useState } from "react";
import { useServizi } from "./useServizi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DettagliModale from "./DettagliModale";
import mani1 from "../../assets/servizi/uno.jpg";
import mani3 from "../../assets/servizi/tre.jpg";
import piedi1 from "../../assets/servizi/unop.jpg";
import piedi3 from "../../assets/servizi/trep.jpg";

const formatDurata = (timeSpan) => {
    const parts = timeSpan.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    let durataString = "";
    if (hours > 0) {
        durataString += `${hours} or${hours > 1 ? "e" : "a"} `;
    }
    if (minutes > 0) {
        durataString += `${minutes} minut${minutes > 1 ? "i" : "0"}`;
    }
    return durataString.trim();
};



const Servizi = () => {
    const [isExiting, setIsExiting] = useState(false);
    const { serviziSelezionati, setServiziSelezionati } = useServizi();
    const [servizi, setServizi] = useState([]);
    const [modaleVisibile, setModaleVisibile] = useState(false);
    const [servizioSelezionato, setServizioSelezionato] = useState(null);
    const [costoTotale, setCostoTotale] = useState(0);
    const [filtro, setFiltro] = useState("Mani");
    const navigate = useNavigate();

  const immaginiMani = [
       piedi1, piedi3
  ];
  const immaginiPiedi = [mani1, mani3];

    const handleClose = () => {
        setIsExiting(true); // Inizia l'uscita
        setTimeout(() => {
            setModaleVisibile(false);
            setIsExiting(false); // Resetta lo stato di uscita
        }, 100); // Assicurati che questo corrisponda alla durata dell'animazione di uscita
    };

    useEffect(() => {
        axios
            .get("https://localhost:7225/api/Servizi")
            .then((response) => {
                setServizi(response.data);
                // Aggiorna il costo totale in base ai servizi selezionati
                const costoIniziale = serviziSelezionati.reduce(
                    (acc, curr) => acc + curr.prezzo,
                    0
                );
                setCostoTotale(costoIniziale);
            })
            .catch((error) =>
                console.error("Errore nel recupero dei servizi: ", error)
            );
    }, [serviziSelezionati]);

    const selezionaServizio = (servizio) => {
        const isSelected = serviziSelezionati.some(
            (s) => s.serviziID === servizio.serviziID
        );
        if (isSelected) {
            // Deselezionare il servizio
            const filtrati = serviziSelezionati.filter(
                (s) => s.serviziID !== servizio.serviziID
            );
            setServiziSelezionati(filtrati);
            setCostoTotale(costoTotale - servizio.prezzo);
        } else {
            // Selezionare il servizio
            setServiziSelezionati([...serviziSelezionati, servizio]);
            setCostoTotale(costoTotale + servizio.prezzo);
        }
    };

    const filtraServizi = () => {
        if (filtro === "Mani") {
            return servizi.filter((servizio) =>
                new RegExp("\\b(mani|manicure)\\b").test(servizio.dettagli)
            );
        } else if (filtro === "Piedi") {
            return servizi.filter((servizio) =>
                new RegExp("\\b(piedi|pedicure)\\b").test(servizio.dettagli)
            );
        }
        return servizi; // Nessun filtro applicato, mostra tutti i servizi
    };

    const serviziFiltrati = filtraServizi();

    const apriModale = (servizio) => {
        setServizioSelezionato(servizio);
        setModaleVisibile(true);
    };

    // Logica per navigare alla pagina delle lavoratrici
    const vaiAdAppuntamenti = () => {
        navigate("/appuntamenti", { state: { serviziSelezionati } });
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Marycure - Servizi</title>
                <meta
                    name="description"
                    content="Seleziona il servizio di cui hai bisogno scegliendo tra la vasta gamma a disposizione. I nostri servizi variano da una semplice manicure ad quelli più delicati per la cura, come unghie incarnite o spezzate alla radice."
                />
            </Helmet>

            {modaleVisibile && (
                <DettagliModale
                    servizio={servizioSelezionato}
                    onClose={handleClose}
                    isToggled={!isExiting}
                />
            )}

            <div className="pt-10 px-4 sm:px-8 md:px-16 lg:px-64">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                    I nostri servizi
                </h2>
                <div className="rigallery"></div>
                <h4 className="text-2xl font-bold  mb-6">
                    Ne abbiamo di ogni genere! Scegli quello che più si adatta
                    alle tue esigenze
                </h4>
            </div>
            <div className="container mx-auto p-4 mb-16">
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setFiltro("Mani")}
                        className={`px-5 md:px-7 font-semibold bg-verde text-white py-4 lg:text-xl border-y border-start border-oro rounded-l-3xl transition duration-300 hover:text-oroscuro ${
                            filtro === "Mani" ? "active-button" : ""
                        }`}
                    >
                        Trattamenti Mani
                    </button>
                    <button
                        onClick={() => setFiltro("Piedi")}
                        className={`px-4 md:px-7 font-semibold bg-verde text-white py-4 lg:text-xl border border-oroscuro rounded-r-3xl transition duration-300 hover:text-oroscuro ${
                            filtro === "Piedi" ? "active-button" : ""
                        }`}
                    >
                        Trattamento Piedi
                    </button>
                </div>

                <div className={`lg:grid lg:grid-cols-2 gap-2 mt-5`}>
                    <div
                        className={`${
                            filtro === "Mani" ? "lg:block" : "hidden"
                        } lg:block`}
                    >
                        {filtro === "Mani" &&
                            serviziFiltrati.map((servizio) => (
                                <div
                                    key={servizio.serviziID}
                                    className="border p-4 rounded-md elevated-hover mb-2"
                                >
                                    <h2 className="text-xl font-semibold">
                                        {servizio.nomeSer}
                                    </h2>
                                    <p className="text-gray-700">
                                        Durata: {formatDurata(servizio.durata)}
                                    </p>
                                    <p className="text-gray-900 font-bold">
                                        Prezzo: {servizio.prezzo}€
                                    </p>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => apriModale(servizio)}
                                            className="text-verde hover:text-oro font-bold transition-colors"
                                        >
                                            Dettagli trattamento
                                        </button>
                                        <button
                                            onClick={() =>
                                                selezionaServizio(servizio)
                                            }
                                            className={`px-4 py-2 rounded-md transition-colors ${
                                                serviziSelezionati.some(
                                                    (s) =>
                                                        s.serviziID ===
                                                        servizio.serviziID
                                                )
                                                    ? "bg-oro text-white hover:bg-oroscuro transition-colors"
                                                    : "bg-verde text-white hover:text-oro transition-colors"
                                            }`}
                                        >
                                            {serviziSelezionati.some(
                                                (s) =>
                                                    s.serviziID ===
                                                    servizio.serviziID
                                            )
                                                ? "Rimuovi"
                                                : "Seleziona"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        <div
                            className={`${
                                filtro === "Piedi" ? "lg:block" : "hidden"
                            }`}
                        >
                            {immaginiMani.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Mani"
                                    className="w-full h-auto mb-32 rounded-lg"
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div
                            className={`${
                                filtro === "Piedi" ? "block" : "hidden"
                            } lg:block`}
                        >
                            {filtro === "Piedi" &&
                                serviziFiltrati.map((servizio) => (
                                    <div
                                        key={servizio.serviziID}
                                        className="border p-4 rounded-md elevated-hover"
                                    >
                                        <h2 className="text-xl font-semibold">
                                            {servizio.nomeSer}
                                        </h2>
                                        <p className="text-gray-700">
                                            Durata:{" "}
                                            {formatDurata(servizio.durata)}
                                        </p>
                                        <p className="text-gray-900 font-bold">
                                            Prezzo: {servizio.prezzo}€
                                        </p>
                                        <div className="flex justify-between">
                                            <button
                                                onClick={() =>
                                                    apriModale(servizio)
                                                }
                                                className="text-verde hover:text-oro font-bold transition-colors"
                                            >
                                                Dettagli trattamento
                                            </button>
                                            <button
                                                onClick={() =>
                                                    selezionaServizio(servizio)
                                                }
                                                className={`px-4 py-2 rounded-md transition-colors ${
                                                    serviziSelezionati.some(
                                                        (s) =>
                                                            s.serviziID ===
                                                            servizio.serviziID
                                                    )
                                                        ? "bg-oro text-white hover:bg-oroscuro transition-colors"
                                                        : "bg-verde text-white hover:text-oro transition-colors"
                                                }`}
                                            >
                                                {serviziSelezionati.some(
                                                    (s) =>
                                                        s.serviziID ===
                                                        servizio.serviziID
                                                )
                                                    ? "Rimuovi"
                                                    : "Seleziona"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div
                            className={`${
                                filtro === "Mani" ? "lg:block" : "hidden"
                            }`}
                        >
                            <div className="hidden lg:block">
                                {immaginiPiedi.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt="Mani"
                                        className="w-full h-auto mb-32 mt-10 rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {serviziSelezionati.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-lime-100 py-4 flex justify-around items-center shadow-lg-top">
                        <div>
                            <p className="text-bluscuro lg:text-xl text-lg font-bold">
                                {serviziSelezionati.length} serviz
                                {serviziSelezionati.length > 1 ? "i" : "io"} €
                                {costoTotale.toFixed(2)}
                            </p>
                        </div>
                        <button
                            className="bg-verde text-white px-4 py-2 rounded-md hover:text-oro"
                            onClick={vaiAdAppuntamenti}
                        >
                            Scegli Orario
                        </button>
                    </div>
                )}
            </div>
        </HelmetProvider>
    );
};

export default Servizi;
