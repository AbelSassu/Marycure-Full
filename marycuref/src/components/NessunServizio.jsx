import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import gufetto from "../assets/img/gufoback.png";
const NessunServizio = () => {
    const navigate = useNavigate();

    return (
        <div className="flex max-w-screen-lg px-10 flex-col items-center justify-center py-8 shadow-lg">
            <img src={gufetto} alt="Gufetto di Marycure" />
            <h2 className="text-xl md:text-2xl font-bold mb-2">
                Non hai selezionato nessun servizio
            </h2>
            <h3 className="md:text-xl mb-4">
                Aggiungi almeno un servizio da Marycure e prenota il tuo
                appuntamento
            </h3>
            <button
                className="bg-verde text-white hover:text-oro transition-colors font-semibold rounded-full py-2 px-4  flex justify-center items-center gap-2"
                onClick={() => navigate("/servizi")}
            >
                <FontAwesomeIcon icon={faCirclePlus} className="text-xl" />
                Aggiungi un servizio
            </button>
        </div>
    );
};

export default NessunServizio;
