import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const whatsappNumber = "393408666192";

    return (
        <footer className="mt-20 bg-gray-200 text-gray-600">
            <div className="max-w-6xl px-5 mx-auto pt-12 pb-7 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                {/* Colonna 1 */}
                <div className="text-center">
                    <h3 className="text-lg font-bold mb-2 ">Marycure</h3>
                    <p className="flex gap-2 items-center justify-center">
                        <FontAwesomeIcon icon={faLocationDot} />
                        Indirizzo: Via Umberto I, 62, Ozieri (SS)
                    </p>
                    <p className="flex gap-1 items-center justify-center mt-2">
                        <FontAwesomeIcon icon={faPhone} />
                        Tel: +39 340 8666 192
                    </p>
                    <p className="mt-2">P.IVA: 02755040900</p>
                </div>

                {/* Colonna 2 - Social Links */}
                <div className="flex gap-4 justify-center md:mt-10">
                    <a
                        href="https://www.facebook.com/maria.pane.7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 ease-linear transition-all duration-150"
                    >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a
                        href="https://www.instagram.com/maria_pane/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600 ease-linear transition-all duration-150"
                    >
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-green-600 ease-linear transition-all duration-150"
                    >
                        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                    </a>
                </div>

                {/* Colonna 3 - Orari del Salone */}
                <div className="text-center lg:text-left">
                    <h3 className="text-lg font-bold mb-2">Orari del Salone</h3>
                    <p>Mar-Ven: 09:00 - 13:00 | 14:15 - 19:00</p>
                    <p>Sabato: 09:00 - 13:00</p>
                    <p>Domenica e Lunedì: Chiuso</p>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="pb-4 text-center">
                &copy; {currentYear}{" "}
                <a
                    href="/Home"
                    className="hover:underline ease-linear transition-all duration-150"
                >
                    Marycure
                </a>
                . Tutti i diritti riservati. Powered by quel povero Cristo di
                suo{" "}
                <a
                    href="/Marito"
                    className="hover:underline ease-linear transition-all duration-150"
                >
                    MARITO
                </a>
                .
            </div>
        </footer>
    );
};

export default Footer;
