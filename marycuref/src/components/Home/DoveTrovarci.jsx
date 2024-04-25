
import Entratasu from "../../assets/img/Entratasu.png";
import Entratagiu from "../../assets/img/Entratagiu.png";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const DoveTrovarci = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const photos = [
        { src: Entratasu, alt: "Entrata Principale" },
        { src: Entratagiu, alt: "Entrata Secondaria" },
    ];

    const handleImageClick = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Marycure - Dove trovarci</title>
                <meta
                    name="description"
                    content="Scopri come arrivare al salone Marycure, i nostri orari e le giornate di apertura e di chiusura"
                />
            </Helmet>
            <div className="pt-10 px-4 sm:px-8 md:px-16 lg:px-64 ">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                    Dove trovarci
                </h2>
                <div className="rigallery"></div>
                <h4 className="text-2xl font-bold mb-6">
                    Vieni a trovarci in Via Umberto I, 62, 07014 Ozieri!
                </h4>
            </div>
            <div className="container mx-auto lg:px-10">
                <div className="flex flex-wrap mx-4">
                    <div className="w-full lg:w-1/2 px-4">
                        <div>
                            <h3 className="text-lg font-bold mb-2">
                                Orari del Salone
                            </h3>
                            <p className="font-semibold">
                                Mar-Ven: 09:00 - 13:00 | 14:15 - 19:00
                            </p>
                            <p className="my-3 font-semibold">
                                Sabato: 09:00 - 13:00
                            </p>
                            <p className="font-semibold">
                                Domenica e Lunedì: Chiuso
                            </p>
                            <p className="mt-3 mb-5">
                                Per qualsiasi informazione contattaci tramite i
                                recapiti a fondo pagina
                            </p>
                        </div>

                        {/* Foto delle entrate con descrizioni */}
                        <div className="mb-4">
                            <img
                                src={Entratasu}
                                alt="Entrata Principale"
                                className="mb-5 rounded-lg shadow-lg cursor-pointer photo-wrapper"
                                onClick={() => handleImageClick(0)}
                            />
                            <p className="text-sm">
                                Entrata principale, seguire la salita in pietra
                                fino a quel cancello grigio.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 lg:w-1/2">
                        <img
                            src={Entratagiu}
                            alt="Entrata Secondaria"
                            className="w-full h-100 mb-2 rounded-lg shadow-lg cursor-pointer photo-wrapper"
                            onClick={() => handleImageClick(1)}
                        />
                        <p className="text-sm pt-2">
                            Entrata secondaria, suonare il campanello
                            &quot;Marycure di Maria Pane&quot;
                        </p>
                        <p className="text-sm mt-2">
                            È disponibile l&apos;ascensore.
                        </p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3029.9802583359115!2d8.996661790178814!3d40.58619117160833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12dc3d381ccb4c83%3A0xf8788333ae1961c9!2sVia%20Umberto%20I%2C%2062%2C%2007014%20Ozieri%20SS!5e0!3m2!1sit!2sit!4v1712157697431!5m2!1sit!2sit"
                            width="100%"
                            height="300px"
                            className="mt-5 mb-20 rounded-lg shadow-lg border-2 border-oro"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Lightbox
                    slides={photos.map((photo) => ({ src: photo.src }))}
                    open={isOpen}
                    index={photoIndex}
                    close={() => setIsOpen(false)}
                    loop
                />
            )}
        </HelmetProvider>
    );
};

export default DoveTrovarci;
