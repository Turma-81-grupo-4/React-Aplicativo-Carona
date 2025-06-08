import type { JSX } from "react/jsx-runtime";
import type Carona from "./Carona";
import type usuario from "./Usuario";

export default interface Passagem {
  map(arg0: (passagem: any) => JSX.Element): import("react").ReactNode;
  length: ReactNode;
  id: number;
  passageiro: usuario | null;
  carona: Carona | null;
}
