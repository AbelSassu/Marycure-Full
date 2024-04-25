import PropTypes from "prop-types";
import gufo from "../../assets/img/gufoscritta2.png";
const OrariDisponibili = ({
    orari,
    onOrarioClick,
    orarioSelezionato,
    lavoratriceSelezionata,
}) => {
    if (orari.length === 0) {
        return (
            <div className="relative mb-5 lg:ms-5">
                <img
                    src={gufo}
                    alt="Gufo"
                    className="w-96 sm:w-full sm:h-80 md:h-full xl:h-80 2xl:h-full "
                />{" "}
                <p className="absolute ps-10 w-full bottom-5 xs:bottom-6 sm:bottom-20 md:bottom-7 md:ps-6 lg:bottom-16 lg:pt-4 xl:bottom-20 xl:pt-0 2xl:bottom-6 2xl:ps-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
                    Nessun orario disponibile per la data selezionata.
                </p>
            </div>
        );
    }

    return (
        <ul className="h-72 w-full overflow-y-auto border-2 border-oroscuro rounded-2xl shadow-lg text-center mb-10" style={{ width: '400px' }} >
            
            {orari.map((orario, index) => (
                <li key={index} onClick={() => onOrarioClick(orario)}>
                    <button
                        type="button"
                        className={`orario-button my-1 ${
                            orarioSelezionato &&
                            orarioSelezionato.ora === orario.ora
                                ? "selezionato"
                                : ""
                        }`}
                    >
                        {orarioSelezionato &&
                            orarioSelezionato.ora === orario.ora && (
                                <span className="dot"></span>
                            )}
                        {orario.ora}:{" "}
                        {orario.disponibile ? "Disponibile" : "Occupato"}
                        {lavoratriceSelezionata === "any" &&
                            orario.lavoratriceId && (
                                <span> - {orario.lavoratrice}</span>
                            )}
                    </button>
                    
                </li>
                
            ))}
        </ul>
    );
};

OrariDisponibili.propTypes = {
    orari: PropTypes.arrayOf(
        PropTypes.shape({
            ora: PropTypes.string.isRequired,
            lavoratrice: PropTypes.string,
            lavoratriceId: PropTypes.number,
            disponibile: PropTypes.bool.isRequired,
        })
    ).isRequired,
    lavoratriceSelezionata: PropTypes.string.isRequired,
    onOrarioClick: PropTypes.func.isRequired,
    orarioSelezionato: PropTypes.shape({
        ora: PropTypes.string.isRequired,
        lavoratriceId: PropTypes.number,
        disponibile: PropTypes.bool,
    }),
};

OrariDisponibili.defaultProps = {
    orarioSelezionato: null,
};

export default OrariDisponibili;

