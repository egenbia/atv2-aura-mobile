import { Status } from "./status";

export type Article = {
  id: number;
  projetoId: number;
  titulo: string;
  autores: string;
  ano: number;
  status: Status;
};
