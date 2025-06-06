import type Carona from "./Carona";
import type usuario from "./usuario";

export default interface Passagem {
  id: number;
  passageiro: usuario | null;
  carona: Carona | null;
}
