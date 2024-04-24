import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import logo from "../assets/img/logo-trans.png";
import Login from "./Login";

const Navbar = () => {
    const { isSignedIn } = useUser();
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null); // Ref per il controllo del click al di fuori

    // Gestione dello scroll per la trasparenza della navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Gestione del click al di fuori del dropdown per chiuderlo
useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            !event.target.closest("a")
        ) {
            setIsDropdownOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


    return (
        <nav
            className={`fixed top-0 z-30 w-full flex items-center justify-around py-4 transition-colors duration-300 ease-in-out ${
                pathname === "/Home"
                    ? isScrolled
                        ? "bg-verde"
                        : "bg-transparent"
                    : "bg-verde bg-opacity-100"
            }`}
            style={{ transition: "background-color 0.3s ease-in-out" }}
        >
            <div className="flex items-center w-full justify-around px-3 lg:w-auto">
                <div className="flex">
                    <a href="/Home" className="flex items-center">
                        <img
                            src={logo}
                            style={{ height: "50px" }}
                            alt="Logo"
                            loading="lazy"
                        />
                    </a>
                </div>

                {/* Visualizzazione mobile: Login a sinistra del menu hamburger */}
                <div className="flex">
                    <div className="flex items-center lg:hidden">
                        <div className="mr-5">
                            <Login />
                        </div>
    
                        {/* Pulsante Hamburger */}
                        <button
                            className="block border-0 bg-transparent"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle navigation"
                        >
                            {/* Icona Hamburger */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#e5c061"
                                className="h-8 w-8"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Links e pulsante Login per la visualizzazione a schermo intero */}
            <div className="hidden lg:flex items-center">
                <ul className="flex flex-row list-none ml-auto">
                    <li className="nav-item">
                        <Link
                            to="/Home"
                            className="flex items-center px-3 mt-2"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/Servizi"
                            className="flex items-center px-3 mt-2"
                        >
                            Servizi
                        </Link>
                    </li>

                    {isSignedIn && ( // Mostra questo link solo se l'utente è loggato
                        <li className="nav-item">
                            <Link
                                to="/Prenotazioni"
                                className="flex items-center px-3 mt-2"
                            >
                                Prenotazioni
                            </Link>
                        </li>
                    )}

                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="flex items-center justify-between px-3 py-2 w-full text-left bg-transparent border-none text-oro"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Marycure
                            <svg
                                className="ml-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-verde">
                                <li className="border border-oro border-b-0 rounded-t">
                                    <Link
                                        to="/Galleria"
                                        className="block px-4 py-2 text-sm text-oro"
                                    >
                                        Galleria lavori
                                    </Link>
                                </li>
                                <li className="border border-oro">
                                    <Link
                                        to="/ChiSiamo"
                                        className="block px-4 py-2 text-sm text-oro"
                                    >
                                        Chi siamo
                                    </Link>
                                </li>
                                <li className="border border-oro border-t-0 rounded-b">
                                    <Link
                                        to="/DoveTrovarci"
                                        className="block px-4 py-2 text-sm text-oro"
                                    >
                                        Dove trovarci
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </ul>

                {/* Componente Login nella visualizzazione desktop, a destra dei link */}
                <div className="px-3 py-2">
                    <Login />
                </div>
            </div>

            {/* Menu a tendina mobile */}
            <div
                className={`${
                    isMenuOpen ? "flex" : "hidden"
                } absolute top-full left-0 z-50 flex-col w-full shadow-dark-mild bg-verde lg:hidden`}
                id="navbarSupportedContent1"
            >
                <ul className="flex flex-col">
                    <li className="nav-item">
                        <Link
                            to="/Home"
                            className="flex items-center px-5 pt-2 mt-2 text-lg text-oro"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/Servizi"
                            className="flex items-center px-5 py-2 mt-2 text-lg text-oro"
                        >
                            Servizi
                        </Link>
                    </li>

                    {isSignedIn && ( // Mostra questo link solo se l'utente è loggato
                        <li className="nav-item">
                            <Link
                                to="/Prenotazioni"
                                className="flex items-center px-5  mt-2 text-lg text-oro"
                            >
                                Prenotazioni
                            </Link>
                        </li>
                    )}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="flex items-center justify-between text-lg text-oro px-5 py-4 w-full text-left"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Marycure
                            <svg
                                className="ml-2 h-7 w-7"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 z-50 w-full origin-top-right rounded-md bg-verde shadow-lg">
                                <li className="border border-oro border-b-0 rounded-t">
                                    <Link
                                        to="/Galleria"
                                        className="block px-4 py-2  text-oro"
                                    >
                                        Galleria lavori
                                    </Link>
                                </li>
                                <li className="border border-oro">
                                    <Link
                                        to="/ChiSiamo"
                                        className="block px-4 py-2 text-oro"
                                    >
                                        Chi siamo
                                    </Link>
                                </li>
                                <li className="border border-oro border-t-0 rounded-b">
                                    <Link
                                        to="/DoveTrovarci"
                                        className="block px-4 py-2 text-oro"
                                    >
                                        Dove trovarci
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
