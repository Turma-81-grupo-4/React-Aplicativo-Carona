import type Carona from "./Carona";
import type usuario from "./Usuario";

export default interface Passagem {
  id: number;
  passageiro: usuario | null;
  carona: Carona | null;
}
