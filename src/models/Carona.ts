import type Passagem from "./passagem";
import type usuario from "./usuario";

export default interface Carona {
  id: number;
  dataViagem: string; // Data da viagem no formato ISO 8601
  origem: string; // Cidade de origem
  destino: string; // Cidade de destino
  distancia: number; // Distância em quilômetros
  vagas: number; // Número de vagas disponíveis
  tempoViagem: number; // Tempo estimado de viagem em minutos
  motoristaId: usuario | null; // ID do motorista que oferece a carona
  passagemVendidaNessaCarona: Passagem | null; // ID da passagem vendida nessa carona
}
