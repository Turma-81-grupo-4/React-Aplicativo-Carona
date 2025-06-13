import type Usuario from "./Usuario";

export default interface PassagemInfo {
  id: number;
  passageiro: Usuario | null;
}
