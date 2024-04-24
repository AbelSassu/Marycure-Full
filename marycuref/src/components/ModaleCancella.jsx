import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const SuccessAnimation = () => {
    const circleVariants = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
        exit: {
            scale: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const checkmarkVariants = {
        initial: {
            pathLength: 0,
            scale: 0, // Inizia da una scala ridotta
        },
        animate: {
            pathLength: 1,
            scale: 1.4,
            strokeWidth: 6, //grossezza spunta
            transition: {
                delay: 0.2,
                duration: 1,
                when: "beforeChildren", // Assicura che l'animazione della spunta inizi prima
            },
        },
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center"
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.svg
                className="w-24 h-24 bg-green-500 rounded-full p-5"
                viewBox="0 0 50 50"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={circleVariants}
            >
                <motion.path
                    d="M14,27 L 22,35 L 35,16"
                    fill="transparent"
                    strokeWidth="2"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={checkmarkVariants}
                />
            </motion.svg>
            <motion.p
                className="text-lg font-bold mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
                Appuntamento eliminato con successo!
            </motion.p>
        </motion.div>
    );
};

const ErrorAnimation = () => {
    const circleVariants = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
        exit: {
            scale: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const crossVariants = {
        initial: {
            pathLength: 0,
            scale: 0, // Inizia da una scala ridotta
        },
        animate: {
            pathLength: 1,
            scale: 1.4,
            strokeWidth: 6, //grossezza croce
            transition: {
                delay: 0.2,
                duration: 1,
                when: "beforeChildren", // Assicura che l'animazione della croce inizi prima
            },
        },
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center"
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.svg
                className="w-24 h-24 bg-red-500 rounded-full p-5"
                viewBox="0 0 50 50"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={circleVariants}
            >
                {/* Due linee per formare una croce */}
                <motion.line
                    x1="16"
                    y1="16"
                    x2="34"
                    y2="34"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    variants={crossVariants}
                />
                <motion.line
                    x1="34"
                    y1="16"
                    x2="16"
                    y2="34"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    variants={crossVariants}
                />
            </motion.svg>
            <motion.p
                className="text-lg font-bold mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
                Si è verificato un errore nella cancellazione!
            </motion.p>
        </motion.div>
    );
};

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

const ModaleCancella = ({
    isOpen,
    onClose,
    onConfirm,
    appuntamento,
    isDeleting,
    deleteSuccess,
    deleteError,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
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
                        {deleteSuccess && <SuccessAnimation />}
                        {!deleteSuccess && deleteError && <ErrorAnimation />}
                        {!deleteSuccess && !deleteError && (
                            <>
                                <h3 className="text-lg lg:text-xl font-bold mb-5 mt-2 text-center">
                                    Conferma Cancellazione
                                </h3>
                                <p>
                                    Sei sicura di voler cancellare questo
                                    appuntamento in data{" "}
                                    {new Date(
                                        appuntamento
                                    ).toLocaleDateString()}{" "}
                                    alle ore{" "}
                                    {new Date(
                                        appuntamento
                                    ).toLocaleTimeString()}
                                    ?
                                </p>
                                <div className="flex justify-around mt-4">
                                    <button
                                        onClick={() => onConfirm()}
                                        disabled={isDeleting}
                                        className="bg-red-500 text-white rounded-md py-2 mb-3 mt-1 px-4 hover:bg-red-700 transition-colors"
                                    >
                                        {isDeleting
                                            ? "Eliminazione in corso"
                                            : "Elimina"}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        disabled={isDeleting}
                                        className="bg-gray-300 text-black rounded-md py-2 mt-1 mb-3 px-4 font-bold hover:bg-gray-400 transition-colors"
                                    >
                                        Chiudi
                                    </button>
                                </div>
                            </>
                        )}
                    </ModalDiv>
                </>
            )}
        </AnimatePresence>
    );
};

ModaleCancella.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    appuntamento: PropTypes.string,
    isDeleting: PropTypes.bool.isRequired,
    deleteSuccess: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
};

export default ModaleCancella;
