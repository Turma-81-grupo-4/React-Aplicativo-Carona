import type Carona from "./Carona";
import type Passagem from "./Passagem";

export default interface usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: string; // 'passageiro' | 'motorista'
  foto: string;
  caronaOferecida?: Carona | null;
  passagens?: Passagem | null; // ID da carona oferecida, se for motorista
}
