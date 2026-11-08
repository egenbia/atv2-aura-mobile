import axios from "axios";
import { Article } from "../types/article";
import { GlossaryTerm } from "../types/glossary";
import { Project } from "../types/project";
import { ContadoresStatus, Status } from "../types/status";
import { mockAdapter } from "./mockAdapter";

// Sem backend: o adapter responde com os dados de src/mocks/dados.ts.
// Para usar uma API real no futuro, troque `adapter: mockAdapter` por `baseURL: "http://SEU_IP:3000"`.
export const api = axios.create({
  adapter: mockAdapter,
  timeout: 8000,
});

export async function listarProjetos(): Promise<Project[]> {
  const { data } = await api.get<Project[]>("/projetos");
  return data;
}

/** Sem projetoId devolve os artigos de todos os projetos. */
export async function listarArtigos(projetoId?: number): Promise<Article[]> {
  const { data } = await api.get<Article[]>("/artigos", { params: { projetoId } });
  return data;
}

export async function atualizarStatusArtigo(id: number, status: Status): Promise<Article> {
  const { data } = await api.patch<Article>(`/artigos/${id}`, { status });
  return data;
}

export async function listarGlossario(): Promise<GlossaryTerm[]> {
  const { data } = await api.get<GlossaryTerm[]>("/glossario");
  return data;
}

export async function buscarContadores(): Promise<ContadoresStatus> {
  const { data } = await api.get<ContadoresStatus>("/status");
  return data;
}

/** Converte o erro do Axios em uma mensagem amigável para o usuário. */
export function mensagemDeErro(e: unknown, recurso: string): string {
  if (axios.isAxiosError(e)) {
    if (e.code === "ECONNABORTED") return `O servidor demorou para responder ao carregar ${recurso}.`;
    if (!e.response) return `Sem conexão com o servidor. Verifique sua conexão e tente novamente.`;
    if (e.response.status === 404) return `Não encontramos ${recurso}.`;
    if (e.response.status >= 500) return `Erro no servidor ao carregar ${recurso}. Tente novamente.`;
  }
  return `Não foi possível carregar ${recurso}.`;
}
