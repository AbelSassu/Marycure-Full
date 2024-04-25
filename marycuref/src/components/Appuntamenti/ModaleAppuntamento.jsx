import { motion } from "framer-motion";
import styled from "styled-components";

const BackDrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center; 
    position: relative;
    z-index: 1050;
    max-width: 500px;
    width: 90%;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;


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

const SuccessAnimation = () => (
    <BackDrop>
        <ModalWrapper initial="initial" animate="animate" exit="exit">
            <motion.svg
                className="w-24 h-24 bg-green-500 rounded-full p-5"
                viewBox="0 0 50 50"
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
                Appuntamento creato con successo!
            </motion.p>
        </ModalWrapper>
    </BackDrop>
);

const ErrorAnimation = () => (
    <BackDrop>
        <ModalWrapper initial="initial" animate="animate" exit="exit">
            <motion.svg
                className="w-24 h-24 bg-red-500 rounded-full p-5"
                viewBox="0 0 50 50"
                variants={circleVariants}
            >
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
                Si è verificato un errore durante la creazione
                dell&apos; appuntamento.
            </motion.p>
        </ModalWrapper>
    </BackDrop>
);

export { SuccessAnimation, ErrorAnimation };
