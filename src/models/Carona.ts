import type PassagemInfo from "./PassagemInfo";
import type Usuario from "./Usuario";

export type StatusCarona =
  | "AGENDADA"
  | "EM_ANDAMENTO"
  | "FINALIZADA"
  | "CANCELADA";

export default interface Carona {
  id: number;
  origem: string;
  destino: string;
  dataHoraPartida: string;
  dataHoraChegada: string;
  distanciaKm: number;
  velocidade: number;
  vagas: number;
  tempoViagem: number;
  valorPorPassageiro: string | number; 
  statusCarona: StatusCarona;

  motorista: Usuario | null;
  passagensVendidas: PassagemInfo[];
}
