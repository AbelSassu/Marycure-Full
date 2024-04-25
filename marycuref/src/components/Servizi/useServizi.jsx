import { useContext } from "react";
import { ServiziContext } from "./ServiziContext";

export const useServizi = () => useContext(ServiziContext);
