import videoMary from "../assets/video/videomary.mp4";
import videoSampleDesktop from "../assets/video/videomary2.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Hero() {
    return (
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {" "}
            {/* Assicurati che il genitore abbia una posizione relativa o assoluta */}
            <section>
                <div className="relative h-screen bg-bluscuro z-12 h-[600px] md:h-[720px] lg:h-[770px] xl:h-[850px]">
                    <video
                        autoPlay
                        muted
                        loop
                        className="lg:hidden absolute top-0 left-0 w-full h-full object-cover"
                    >
                        <source src={videoMary} type="video/mp4" />
                    </video>
                    {/* Video per desktop, visibile solo su schermi 'lg' e più grandi */}
                    <video
                        autoPlay
                        muted
                        loop
                        className="hidden lg:block absolute top-0 left-0 w-full h-full object-fill"
                    >
                        <source src={videoSampleDesktop} type="video/mp4" />
                    </video>
                    {/* Div per scurire, ora copre perfettamente l'area dei video */}
                    <div className="absolute top-0 left-0 w-full h-full bg-bluscuro bg-opacity-45"></div>
                    <div className="absolute top-28 xs:top-32 sm:top-36 md:top-40 xl:top-60 left-1/2 transform -translate-x-1/2 z-10 w-3/4 md:w-2/3">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-oro mb-4">
                            Prenditi un momento di pausa.
                        </h1>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-oro mb-4">
                            Prenditi cura di te stessa.
                        </h2>
                        <p className="text-xl md:text-3xl lg:text-3xl text-oro font-bold mb-8 lg:pe-32">
                            Prenota subito tra la vasta gamma di servizi e
                            scegli quello che più si adatta alle tue esigenze
                        </p>
                        <p className="text-xl md:text-3xl lg:text-3xl text-oro font-bold mb-8">
                            Il tuo relax inizia ora.
                        </p>
                        <a
                            href="/Servizi"
                            className="text-white bg-verde hover:text-oro font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out"
                        >
                            Dai un&apos;occhiata
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="ml-2"
                            />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero;
