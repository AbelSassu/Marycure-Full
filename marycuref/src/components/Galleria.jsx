import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import img1 from "../assets/galleria/1.jpg";
import img2 from "../assets/galleria/2.jpg";
import img3 from "../assets/galleria/3.jpg";
import img4 from "../assets/galleria/4.jpg";
import img5 from "../assets/galleria/5.jpg";
import img6 from "../assets/galleria/6.jpg";
import img7 from "../assets/galleria/7.jpg";
import img8 from "../assets/galleria/8.jpg";
import img9 from "../assets/galleria/9.jpg";
import img10 from "../assets/galleria/10.jpg";
import img11 from "../assets/galleria/11.jpg";
import img12 from "../assets/galleria/12.jpg";
import img13 from "../assets/galleria/13.jpg";
import img14 from "../assets/galleria/14.jpg";
import img15 from "../assets/galleria/15.jpg";
import img16 from "../assets/galleria/16.jpg";
import img17 from "../assets/galleria/17.jpg";
import img18 from "../assets/galleria/18.jpg";
import img19 from "../assets/galleria/19.jpg";
import img20 from "../assets/galleria/20.jpg";
import img21 from "../assets/galleria/21.jpg";
import img22 from "../assets/galleria/22.jpg";
import img23 from "../assets/galleria/23.jpg";
import img24 from "../assets/galleria/24.jpg";
import img25 from "../assets/galleria/25.jpg";
import img26 from "../assets/galleria/26.jpg";
import img27 from "../assets/galleria/27.jpg";
import img28 from "../assets/galleria/28.jpg";

const Galleria = () => {
    const [photos] = useState([
        { src: img1, width: 1, height: 1, alt: "Descrizione immagine 1" },
        { src: img2, width: 1, height: 1, alt: "Descrizione immagine 2" },
        { src: img3, width: 1, height: 1, alt: "Descrizione immagine 3" },
        { src: img4, width: 1, height: 1, alt: "Descrizione immagine 4" },
        { src: img5, width: 1, height: 1, alt: "Descrizione immagine 5" },
        { src: img6, width: 1, height: 1, alt: "Descrizione immagine 6" },
        { src: img7, width: 1, height: 1, alt: "Descrizione immagine 7" },
        { src: img8, width: 1, height: 1, alt: "Descrizione immagine 8" },
        { src: img9, width: 1, height: 1, alt: "Descrizione immagine 9" },
        { src: img10, width: 1, height: 1, alt: "Descrizione immagine 10" },
        { src: img11, width: 1, height: 1, alt: "Descrizione immagine 11" },
        { src: img12, width: 1, height: 1, alt: "Descrizione immagine 12" },
        { src: img13, width: 1, height: 1, alt: "Descrizione immagine 13" },
        { src: img14, width: 1, height: 1, alt: "Descrizione immagine 14" },
        { src: img15, width: 1, height: 1, alt: "Descrizione immagine 15" },
        { src: img16, width: 1, height: 1, alt: "Descrizione immagine 16" },
        { src: img17, width: 1, height: 1, alt: "Descrizione immagine 17" },
        { src: img18, width: 1, height: 1, alt: "Descrizione immagine 18" },
        { src: img19, width: 1, height: 1, alt: "Descrizione immagine 19" },
        { src: img20, width: 1, height: 1, alt: "Descrizione immagine 20" },
        { src: img21, width: 1, height: 1, alt: "Descrizione immagine 21" },
        { src: img22, width: 1, height: 1, alt: "Descrizione immagine 22" },
        { src: img23, width: 1, height: 1, alt: "Descrizione immagine 23" },
        { src: img24, width: 1, height: 1, alt: "Descrizione immagine 24" },
        { src: img25, width: 1, height: 1, alt: "Descrizione immagine 25" },
        { src: img26, width: 1, height: 1, alt: "Descrizione immagine 26" },
        { src: img27, width: 1, height: 1, alt: "Descrizione immagine 27" },
        { src: img28, width: 1, height: 1, alt: "Descrizione immagine 28" },
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

const classMap = {
    2: "photo-large",
    5: "photo-medium",
    6: "photo-large",
    9: "photo-large",
    12: "photo-medium",
    13: "photo-large",
    16: "photo-large",
    19: "photo-medium",
    20: "photo-large",
    23: "photo-medium",
    24: "photo-medium",
    25: "photo-medium",
    26: "photo-large",
    27: "photo-long",
};

// Funzione per ottenere il nome della classe in base all'indice dell'immagine
const getImageClassName = (index) => {
    return classMap[index] || "";
};
    const handleImageClick = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Marycure - Galleria</title>
                    <meta
                        name="description"
                        content="Esplora la collezione di immagini nella nostra galleria dei lavori e prendi ispirazione per il prossimo appuntamento."
                    />
                </Helmet>
                <div className="pt-10 px-4 sm:px-8 md:px-16 lg:px-64">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                        Lasciati ispirare!
                    </h2>
                    <div className="rigallery"></div>
                    <h4 className="text-2xl font-bold  mb-6">
                        Per il tuo prossimo appuntamento prendi spunto dai
                        nostri lavori!
                    </h4>
                </div>

                <div className="gallery-container">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            onClick={() => handleImageClick(index)}
                            className={`photo-wrapper ${getImageClassName(
                                index
                            )}`}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                }}
                            />
                        </div>
                    ))}
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
        </>
    );
};

export default Galleria;
