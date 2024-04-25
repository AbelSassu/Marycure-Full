import PropTypes from "prop-types";

const SessionCard = ({ sessione, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow elevated-hover">
            <div className="px-8 pt-8">
                <h4 className="text-xl font-bold mb-2">Data e ora</h4>
                <p className="text-lg text-bluscuro">
                    {new Date(sessione.dataAppuntamento).toLocaleString()}
                </p>
                <div className="my-3">
                    <p className="font-bold mb-1 text-lg">Operatrice:</p>
                    <p className="text-lg">{sessione.nomeLavoratrice}</p>
                </div>
                <div>
                    <p className="font-bold mb-1 text-lg">Servizi:</p>
                    <p className="text-lg">{sessione.servizi.join(", ")}</p>
                </div>
            </div>
            <div className="px-5 pb-7 pt-2">
                <button
                    onClick={() => onDelete(sessione.dataAppuntamento)}
                    className="w-full mt-4 bg-verde hover:bg-red-500 text-white active:bg-red-600 font-bold text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 tracking-widest"
                >
                    Elimina
                </button>
            </div>
        </div>
    );
};

SessionCard.propTypes = {
    sessione: PropTypes.shape({
        dataAppuntamento: PropTypes.string.isRequired,
        nomeLavoratrice: PropTypes.string.isRequired,
        servizi: PropTypes.arrayOf(PropTypes.string).isRequired,
        // Aggiungi qui eventuali altre proprietà di `sessione` che ti aspetti
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default SessionCard;
