import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import PropTypes from "prop-types";

const Calendario = ({ onChange }) => {
    const [value, setValue] = useState(new Date());

    const handleChange = (nextValue) => {
        setValue(nextValue);
        onChange(nextValue); // Passa il valore al componente genitore
    };

    return (
        <div>
            <Calendar
                onChange={handleChange}
                value={value}
                // altre props che potrebbero servirti
            />
        </div>
    );
};
Calendario.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default Calendario;
