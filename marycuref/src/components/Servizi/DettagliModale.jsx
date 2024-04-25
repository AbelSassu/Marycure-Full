import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const ModalDiv = styled(motion.div)`
    position: fixed;
    top: 30%;
    right: 5%;
    z-index: 1050;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);

    left: 5%;
    @media (min-width: 530px) {
        left: 10%;
    }
    @media (min-width: 768px) {
        left: 20%;
    }

    @media (min-width: 992px) {
        left: 30%;
    }

    @media (min-width: 1200px) {
        left: 37%;
    }
`;

const BackDrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
`;



// Component definition
const DettagliModale = ({ servizio, onClose, isToggled }) => {
    return (
        <AnimatePresence>
            {isToggled && (
                <>
                    <BackDrop
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <ModalDiv
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                    >
                        <h3 className="text-lg lg:text-xl font-bold mb-5 text-center pt-2">
                            {servizio.nomeSer}
                        </h3>
                        <p>{servizio.dettagli}</p>
                        <button
                            onClick={onClose}
                            className="bg-verde text-white rounded-md py-1 mt-7 hover:text-oro transition-colors "
                        >
                            Chiudi
                        </button>
                    </ModalDiv>
                </>
            )}
        </AnimatePresence>
    );
};

DettagliModale.propTypes = {
    servizio: PropTypes.shape({
        nomeSer: PropTypes.string.isRequired,
        dettagli: PropTypes.string,
        prezzo: PropTypes.number.isRequired,
        durata: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    isToggled: PropTypes.bool,
};
export default DettagliModale;