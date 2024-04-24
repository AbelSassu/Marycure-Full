import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ServiziContext = createContext(null);

export const ServiziProvider = ({ children }) => {
    const [serviziSelezionati, setServiziSelezionati] = useState([]);

    const resetServiziSelezionati = () => {
        setServiziSelezionati([]); // Resetta l'array dei servizi selezionati
    };

    return (
        <ServiziContext.Provider
            value={{
                serviziSelezionati,
                setServiziSelezionati,
                resetServiziSelezionati,
            }}
        >
            {children}
        </ServiziContext.Provider>
    );
};

ServiziProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
