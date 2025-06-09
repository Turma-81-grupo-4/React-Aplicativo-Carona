import type Carona from "./Carona";
import type usuario from "./Usuario";

export default interface Passagem {

  data: string | number | Date;
  id: number;
  passageiro: usuario | null;
  carona: Carona | null;
}
