
import img1 from "../../assets/img/maria.jpg";
import img2 from "../../assets/img/ele.jpg";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCrown,
    faHandHoldingHeart,
    faHandHoldingUsd,
    faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

const ChiSiamo = () => {
    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>Marycure - Chi siamo</title>
                    <meta
                        name="description"
                        content="Scopri chi siamo, la nostra storia, i valori e le persone che rendono questo salone così speciale. Vieni a conoscere il nostro team e le nostre qualità."
                    />
                </Helmet>
                <div className="pt-10 px-4 sm:px-8 md:px-16 lg:px-64 ">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                        Chi siamo
                    </h2>
                    <div className="rigallery"></div>
                    <h4 className="text-2xl font-bold mb-6">
                        I nostri valori, la nostra forza al vostro servizio
                    </h4>
                </div>
                <section className="text-center m-auto py-6 px-6 sm:px-10 md:px-12 lg:p-0 ">
                    <div className="container mx-auto lg:p-12">
                        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl ">
                            <div className="flex">
                                <img
                                    src={img1}
                                    alt="Maria"
                                    className="h-100 w-100 object-cover rounded-lg lg:rounded-r-none "
                                />
                            </div>
                            <div className="p-5 sm:p-10">
                                <h4 className="block text-xl lg:text-2xl font-semibold mb-3 lg:mt-5">
                                    Maria Pane
                                </h4>
                                <p className="mt-2 lg:text-lg">
                                    Classe 1996, è la padrona di casa. Così
                                    appassionata da aver iniziato la sua
                                    carriera a soli 18 anni ed arrivata fin qui
                                    dopo una lunga gavetta e tanto duro lavoro.
                                </p>
                                <p className="lg:text-lg">
                                    La sua formazione spazia dalle diverse
                                    tecniche di manicure,(SPA,Russa, Giapponese)
                                    pedicure, (Kart, a secco e a bagno, sia
                                    estetica che curativa)
                                </p>
                                <p className="lg:text-lg">
                                    e per le più fantasiose diverse tecniche di
                                    Nailart.
                                </p>
                                <p className="lg:text-lg">
                                    Data la passione nel donare benessere e
                                    relax alle persone, dopo aver conseguito il
                                    diploma come massaggiatrice specializzata,
                                    ha aperto il suo nail salon nel 2018
                                </p>
                                <p className="lg:text-lg">
                                    evolvendosi dunque da una piccola stanzetta
                                    ad un salone vero e proprio.
                                </p>
                                <p className="lg:text-lg">
                                    Gentile ed amorevole, la persona più
                                    indicata a cui affidare la cura delle vostre
                                    mani e piedi.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto mt-12 lg:mt-0 lg:p-12">
                        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl ">
                            <div className="lg:order-last flex">
                                <img
                                    src={img2}
                                    alt="Eleonora"
                                    className="h-100 w-100 object-cover rounded-lg lg:rounded-l-none "
                                />
                            </div>
                            <div className="my-auto p-5 sm:p-10">
                                <h4 className="block text-xl lg:text-2xl font-semibold mb-3 lg:mt-5">
                                    Eleonora Saba
                                </h4>
                                <p className="mt-2 lg:text-lg">
                                    Formata come onicotecnica e make-up artist
                                    dal 2018, dopo una lunga conoscenza entra a
                                    far parte del team nel 2022, diventando il
                                    braccio destro di Maria e fondamentale per
                                    le attività e l&apos;umore del salone.
                                </p>
                                <p className="lg:text-lg">
                                    Il suo tocco artistico non si limita a
                                    smalti e pennelli, ma si estende
                                    all&apos;esperienza calda e accogliente che
                                    regala a ciascuna cliente.
                                </p>
                                <p className="lg:text-lg">
                                    Paziente, creativa e con un gran cuore, doti
                                    che gli consentono di entrare in contatto
                                    con le clienti che ripongono nella sua
                                    professionalità la cura delle loro mani e
                                    piedi.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="text-center mt-10 mb-24 py-6 px-8 sm:px-10 md:px-12 lg:px-24 xl:px-48">
                    <h3 className="text-2xl font-bold mb-6">
                        Le nostre qualità a 4-P{" "}
                    </h3>
                    <div>
                        <FontAwesomeIcon icon={faCrown} className="text-3xl" />
                        <h4 className="text-xl font-semibold mb-2">
                            Prodotti{" "}
                        </h4>
                        <p>
                            Utilizziamo i migliori prodotti sul mercato e di
                            essi ne testiamo le nuove tecnologie per periodi di
                            tempo prolungati prima di impiegarli
                        </p>
                        <p>
                            ufficialmente nel nostro salone, in modo da poterne
                            capire appieno le caratteristiche, l&apos;efficacia
                            e, in caso di tecnologie particolarmente{" "}
                        </p>
                        <p className="mb-8">
                            complesse, effettuare corsi formativi specializzati
                            per poterli sfruttare al meglio delle loro
                            potenzialità
                        </p>
                    </div>

                    <div>
                        <FontAwesomeIcon
                            icon={faUserGraduate}
                            className="text-3xl"
                        />
                        <h4 className="text-xl font-semibold mb-2">
                            Professionalità{" "}
                        </h4>
                        <p>
                            Tutto il team segue periodicamente dei corsi
                            d&apos;aggiornamento in questo giovane settore
                            sempre in evoluzione in modo da potervi offrire
                        </p>
                        <p>
                            nuovi servizi, tecniche sempre all&apos;avanguardia
                            ma soprattutto migliorare l&apos;efficacia di quelle
                            già esistenti. Seguiamo le più ferree regole
                        </p>
                        <p>
                            che riguardano la sanificazione e igienizzazione
                            degli strumenti, rimuoveremo infatti il sigillo
                            dell&apos;avvenuta sterilizzazione davanti ai vostri
                            occhi,
                        </p>
                        <p className="mb-8">
                            particolare che ci ha fatto guadagnare una certa
                            fama tra le nostre clienti del settore ospedaliero.
                        </p>
                    </div>

                    <div>
                        <FontAwesomeIcon
                            icon={faHandHoldingUsd}
                            className="text-3xl mb-1"
                        />
                        <h4 className="text-xl font-semibold mb-2">Prezzi </h4>
                        <p>
                            La ricerca costante di ottimi prodotti e tecniche
                            all&apos;avanguarda ci permette di risparmiare tempo
                            per poter effettuare più servizi in una giornata
                            lavorativa,
                        </p>
                        <p className="mb-8">
                            diminuendo il carico sui costi del cliente, dandoci
                            dunque la possibilità di avere prezzi molto
                            competivi nonostante l&apos;alta qualità della
                            materia prima
                        </p>
                    </div>

                    <div>
                        <FontAwesomeIcon
                            icon={faHandHoldingHeart}
                            className="text-3xl mb-1"
                        />
                        <h4 className="text-xl font-semibold mb-2">Persone </h4>
                        <p>
                            Il nostro ideale è ci siano in primis delle persone
                            dietro le clienti stesse e che quindi il nostro
                            lavoro si basi principalmente sul contatto.
                        </p>

                        <p>Parlateci e vi ascolteremo.</p>
                        <p>Chiedeteci e vi sarà dato.</p>
                        <p>
                            Saremo sempre qua per voi in qualsiasi momento, ne è
                            la dimostrazione il bellissimo rapporto che abbiamo
                            instaurato con ogni persona entrata nel nostro
                            salone.{" "}
                        </p>
                    </div>
                </section>
            </>
        </HelmetProvider>
    );
};

export default ChiSiamo;
