import Hero from "./Hero";
import smalti from "../assets/img/smalti3.jpg";
import gufociao from "../assets/img/gufociao.png";
import duo from "../assets/img/duo.jpg";
import salone from "../assets/img/salone.jpg";
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
                <div className="bg-oroscuro">
                    <Hero />

                    <section className="relative mt-5 md:mt-36 lg:mt-24 xl:mt-44 h-[300px] md:h-[600px] lg:h-[600px]">
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
                                <h3 className="text-3xl text-oro sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    Lasciati ispirare
                                </h3>
                                <h4 className="text-2xl text-oro sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    Guarda la nostra galleria di lavori
                                </h4>
                                <p className="text-xl md:text-3xl font-bold mb-6 xs:mb-8 lg:pe-32 text-oro">
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
                    <section className="relative mt-5 h-[400px] md:h-[600px] lg:h-[600px]">
                        {/* Background image */}
                        <img
                            src={duo}
                            alt="Maria ed Eleonora"
                            className="absolute w-full h-full object-cover "
                        />
                        {/* Text overlay */}
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

                            <div className="absolute top-5 xs:top-10 sm:top-12 md:top-24 xl:top-32 left-1/2 transform -translate-x-1/2 z-10 w-3/4 md:w-2/3 ">
                                <h3 className="text-3xl text-oro sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    Giovani, preparate e professionali
                                </h3>
                                <h4 className="text-2xl text-oro sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    Conosci il team da vicino
                                </h4>
                                <p className="text-xl md:text-3xl font-bold mb-8 lg:pe-32 text-oro">
                                    Scopri le persone a cui ti affiderai, il
                                    loro percorso e i loro valori.
                                </p>

                                <a
                                    href="/ChiSiamo"
                                    className="text-white bg-verde hover:text-oro font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out"
                                >
                                    Conosci il team
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="ml-2"
                                    />
                                </a>
                            </div>
                        </div>
                    </section>
                    <section className="relative mt-5 h-[400px] md:h-[600px] lg:h-[600px]">
                        {/* Background image */}
                        <img
                            src={salone}
                            alt="Maria ed Eleonora"
                            className="absolute w-full h-full object-cover "
                        />
                        {/* Text overlay */}
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

                            <div className="absolute top-5 xs:top-10 sm:top-12 md:top-24 xl:top-32 left-1/2 transform -translate-x-1/2 z-10 w-3/4 md:w-2/3 ">
                                <h3 className="text-3xl text-oro sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    Vieni a trovarci
                                </h3>
                                <h4 className="text-2xl text-oro sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                                    Il salone Marycure sarà la tua nuova casa
                                </h4>
                                <p className="text-xl md:text-3xl font-bold mb-8 lg:pe-32 text-oro">
                                    Ti aspetteremo a braccia aperte per un caffé
                                    e una bella tisana rilassante
                                </p>

                                <a
                                    href="/DoveTrovarci"
                                    className="text-white bg-verde hover:text-oro font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out"
                                >
                                    Dove trovarci
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="ml-2"
                                    />
                                </a>
                            </div>
                        </div>
                    </section>
                    <div className="relative bg-slate-200 left-0 w-full h-full flex justify-center">
                        <img src={gufociao} alt="Gufophoto" className="" />
                    </div>
                </div>
            </>
        </HelmetProvider>
    );
};

export default Home;
