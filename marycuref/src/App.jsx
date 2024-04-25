// App.jsx
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main"; 
import { UserProvider } from "./components/UserContext";
import { ServiziProvider } from "./components/Servizi/ServiziContext";

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <ServiziProvider>
                    <header>
                        <Navbar />
                    </header>
                    <Main />
                    <Footer />
                </ServiziProvider>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
