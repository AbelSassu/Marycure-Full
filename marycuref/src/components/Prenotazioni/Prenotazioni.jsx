import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../UserContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSession } from "@clerk/clerk-react";
import ModaleCancella from "./ModaleCancella";
import SessionCard from "./SessionCard";
import gufetto from "../../assets/img/gufoback.png";

const Prenotazioni = () => {
    const { userDetails } = useUserContext();
    const { session } = useSession();
    // eslint-disable-next-line no-unused-vars
    const [sessioni, setSessioni] = useState([]);
    const [nextSession, setNextSession] = useState(null);
    const [futureSessions, setFutureSessions] = useState([]);
    const [pastSessions, setPastSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        if (userDetails.userID) {
            const fetchSessioni = async () => {
                try {
                    const token = await session.getToken();
                    const response = await axios.get(
                        `https://localhost:7225/api/Appuntamenti/SessioniByUser/${userDetails.userID}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setSessioni(response.data);
                    const now = new Date();
                    const future = response.data.filter(
                        (session) => new Date(session.dataAppuntamento) > now
                    );
                    const past = response.data.filter(
                        (session) => new Date(session.dataAppuntamento) < now
                    );
                    setFutureSessions(future);
                    setPastSessions(past);
                    setNextSession(
                        future.length
                            ? future.reduce((prev, curr) =>
                                  new Date(prev.dataAppuntamento) <
                                  new Date(curr.dataAppuntamento)
                                      ? prev
                                      : curr
                              )
                            : null
                    );
                    setLoading(false);
                } catch (err) {
                    setError("Errore nel caricamento delle prenotazioni");
                    setLoading(false);
                    console.error("Errore fetch:", err);
                }
            };

            fetchSessioni();
        }
    }, [userDetails.userID]);

    const handleDeleteClick = (appuntamento) => {
        setCurrentAppointment(appuntamento);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const token = await session.getToken();
            const timezoneOffset =
                new Date(currentAppointment).getTimezoneOffset() * 60000;
            const dataUTC = new Date(
                new Date(currentAppointment).getTime() - timezoneOffset
            );
            const dataAppuntamentoISO = dataUTC.toISOString();

            await axios.delete(
                `https://localhost:7225/api/Appuntamenti/SessioniByUser/${userDetails.userID}/${dataAppuntamentoISO}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedFutureSessions = futureSessions.filter(
                (sessione) => sessione.dataAppuntamento !== currentAppointment
            );
            const updatedPastSessions = pastSessions.filter(
                (sessione) => sessione.dataAppuntamento !== currentAppointment
            );

            setSessioni(updatedFutureSessions.concat(updatedPastSessions));
            setFutureSessions(updatedFutureSessions);
            setPastSessions(updatedPastSessions);
            setNextSession(
                updatedFutureSessions.length ? updatedFutureSessions[0] : null
            );
            setDeleteSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setDeleteSuccess(false);
                setDeleteError("");
            }, 3000);
        } catch (err) {
            setDeleteError("Errore nella cancellazione dell'appuntamento");
            console.error(
                "Errore durante la cancellazione:",
                err.response ? err.response.data : err
            );
            setTimeout(() => {
                setIsModalOpen(false);
                setDeleteSuccess(false);
                setDeleteError("");
            }, 3000);
        }
        setIsDeleting(false);
    };

    const handleCloseModal = () => {
        if (!isDeleting && !deleteSuccess && !deleteError) {
            setIsModalOpen(false);
            setDeleteSuccess(false);
            setDeleteError("");
        }
    };

    if (loading) return <div>Caricamento delle prenotazioni...</div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <HelmetProvider>
            <Helmet>
                <title>Marycure - Prenotazioni</title>
                <meta
                    name="description"
                    content="In questa pagina puoi tenere sotto controllo i tuoi appuntamenti con Marycure vederne lo storico."
                />
            </Helmet>
            <div className="pt-10 px-4 sm:px-8 md:px-16 lg:px-64 mb-24">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                    I tuoi appuntamenti
                </h2>
                <div className="rigallery"></div>
                <h4 className="text-xl sm:text-2xl font-bold mb-8">
                    In caso di modifica degli appuntamenti contattaci attraverso
                    i recapiti a fondo pagina
                </h4>

                {!loading && !error && (
                    <>
                        {nextSession && (
                            <div className="mb-10 md:w-3/4 lg:w-2/3  xl:w-1/3">
                                <h3 className="text-xl sm:text-2xl mb-5 font-bold">
                                    Prossimo appuntamento
                                </h3>
                                <SessionCard
                                    sessione={nextSession}
                                    onDelete={handleDeleteClick}
                                />
                            </div>
                        )}
                        {futureSessions.length > (nextSession ? 1 : 0) ? (
                            <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <h3 className="text-xl sm:text-2xl font-bold col-span-full">
                                    Appuntamenti prenotati
                                </h3>
                                {futureSessions.map((sessione, index) =>
                                    nextSession && index === 0 ? null : (
                                        <SessionCard
                                            key={sessione.id}
                                            sessione={sessione}
                                            onDelete={handleDeleteClick}
                                        />
                                    )
                                )}
                            </div>
                        ) : !nextSession ? (
                            <div className="text-center my-10">
                                <img
                                    src={gufetto}
                                    alt="Gufetto"
                                    className="mx-auto"
                                />
                                <p className="text-lg">
                                    Non hai nessuna prenotazione, prenota subito
                                    il tuo prossimo appuntamento
                                </p>
                                <a
                                    href="/Servizi"
                                    className="text-bluscuro font-bold text-lg ease-linear transition-all duration-100 hover:underline"
                                >
                                    in questo link
                                </a>
                            </div>
                        ) : (
                            <div className="mb-5">
                                <p className="mt-5 text-lg mb-2 font-bold ">
                                    Non hai altri appuntamenti prenotati...
                                </p>
                                <p className="mb-2 text-lg font-bold inline-block">
                                    Togliti il pensiero e prenota i
                                    prossimi&nbsp;
                                </p>
                                <a
                                    href="/Servizi"
                                    className="text-verde inline font-bold text-lg ease-linear transition-all duration-100 hover:underline"
                                >
                                    in questo link!
                                </a>
                            </div>
                        )}

                        {pastSessions.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <h3 className="text-xl sm:text-2xl font-bold col-span-full">
                                    Storico appuntamenti
                                </h3>
                                {pastSessions.map((sessione) => (
                                    <SessionCard
                                        key={sessione.id}
                                        sessione={sessione}
                                        onDelete={handleDeleteClick}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            <ModaleCancella
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                appuntamento={currentAppointment}
                isDeleting={isDeleting}
                deleteSuccess={deleteSuccess}
                deleteError={deleteError}
            />
        </HelmetProvider>
    );
};

export default Prenotazioni;
