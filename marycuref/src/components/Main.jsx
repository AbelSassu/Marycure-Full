import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Marito from "./Marito";
import Servizi from "./Servizi/Servizi";
import Galleria from "./Home/Galleria";
import Prenotazioni from "./Prenotazioni/Prenotazioni";
import Appuntamenti from "./Appuntamenti/Appuntamenti";
import DoveTrovarci from "./Home/DoveTrovarci";
import ChiSiamo from "./Home/ChiSiamo";

const Main = () => {
    const location = useLocation();
    const mainClass = location.pathname === "/Home" ? "" : "mt-20";

    return (
        <main className={mainClass}>
            <Routes>
                <Route path="/" element={<Navigate replace to="/Home" />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Marito" element={<Marito />} />
                <Route path="/Servizi" element={<Servizi />} />
                <Route path="/Galleria" element={<Galleria />} />
                <Route path="/Prenotazioni" element={<Prenotazioni />} />
                <Route path="/Appuntamenti" element={<Appuntamenti />} />
                <Route path="/DoveTrovarci" element={<DoveTrovarci />} />
                <Route path="/ChiSiamo" element={<ChiSiamo />} />
            </Routes>
        </main>
    );
};

export default Main;
