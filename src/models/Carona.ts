import type Passagem from "./Passagem";
import type Usuario from "./Usuario";

export default interface Carona {
  id: number;
  dataViagem: string;
  origem: string;
  destino: string;
  distancia: number;
  vagas: number;
  velocidade: number;
  tempoViagem: number;
  motorista: Usuario | null;
  passagemVendidaNessaCarona: Passagem[];
}
