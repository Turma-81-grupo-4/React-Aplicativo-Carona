import type { ReactNode } from "react";
import type Passagem from "./Passagem";
import type usuario from "./Usuario";

export default interface Carona {
  velocidade: ReactNode;
  id: number;
  dataViagem: string; 
  origem: string; 
  destino: string; 
  distancia: number; 
  vagas: number; 
  tempoViagem: number; 
  motorista: usuario | null; 
  passagemVendidaNessaCarona: Passagem[];
}
