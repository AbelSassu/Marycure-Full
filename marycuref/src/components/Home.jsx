import Hero from "./Hero";
import smalti from "../assets/img/smalti3.jpg";
//import gufociao from "../assets/img/gufociao.png";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>Marycure - Home</title>
                    <meta
                        name="description"
                        content="Marycure di Maria Pane, Via Umberto I, 62, 07014 Ozieri SS. Salone di bellezza con trattamenti onicotecnici (manicure, pedicure, etc.). Visita la nostra pagina e scopri i nostri servizi dedicati."
                    />
                </Helmet>
                <main>
                    <Hero />

                    <section className="relative mt-18 md:mt-32 xl:mt-40 lg:mt-20 h-[300px] md:h-[600px] lg:h-[600px]">
                        {/* Background image */}
                        <img
                            src={smalti}
                            alt="Smalti"
                            className="absolute w-full h-full object-cover "
                        />
                        {/* Text overlay */}
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

                            <div className="absolute top-5  md:top-40 xl:top-32 left-1/2 transform -translate-x-1/2 z-10 w-3/4 md:w-2/3">
                                <h1 className="text-3xl text-oro sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    Lasciati ispirare
                                </h1>
                                <h2 className="text-2xl text-oro sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    Guarda la nostra galleria di lavori
                                </h2>
                                <p className="text-xl md:text-3xl lg:text-3xl font-bold mb-8 lg:pe-32 text-oro">
                                    E prendi spunto per il tuo prossimo
                                    appuntamento
                                </p>

                                <a
                                    href="/Galleria"
                                    className="text-white bg-verde hover:text-oro font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out"
                                >
                                    Vai alla galleria
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="ml-2"
                                    />
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        </HelmetProvider>
    );
};

export default Home;
