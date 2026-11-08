// "Rotas" do backend simulado. Função pura (sem Axios) que recebe método/URL/parâmetros
// e devolve { status, data }, como uma API real devolveria.
import { artigos, glossario, projetos, ProjetoMock } from "../mocks/dados";
import { Project } from "../types/project";
import { ContadoresStatus, Status } from "../types/status";

const STATUS: Status[] = ["incluido", "excluido", "pendente"];

export type Resposta = { status: number; data: unknown };

// "2026-10-12" -> "12/10/2026"
function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function contarPorStatus(lista: { status: Status }[]): ContadoresStatus {
  const c: ContadoresStatus = { incluido: 0, excluido: 0, pendente: 0, total: lista.length };
  for (const a of lista) c[a.status] += 1;
  return c;
}

// Monta o Project com os contadores por status calculados a partir dos artigos.
function montarProjeto(p: ProjetoMock): Project {
  const c = contarPorStatus(artigos.filter((a) => a.projetoId === p.id));
  return {
    id: p.id,
    titulo: p.titulo,
    criadoEm: formatarData(p.criadoEm),
    atualizadoEm: formatarData(p.atualizadoEm),
    totalArtigos: c.total,
    incluidos: c.incluido,
    excluidos: c.excluido,
    pendentes: c.pendente,
  };
}

export function responderMock(
  metodo: string,
  urlCompleta: string,
  params?: Record<string, unknown>,
  corpo?: { status?: unknown }
): Resposta {
  const caminho = urlCompleta.split("?")[0].replace(/\/+$/, "") || "/";

  if (metodo === "GET") {
    if (caminho === "/projetos") return { status: 200, data: projetos.map(montarProjeto) };

    if (caminho === "/artigos") {
      const projetoId = params?.projetoId === undefined ? undefined : Number(params.projetoId);
      const status = params?.status as string | undefined;
      if (projetoId !== undefined && Number.isNaN(projetoId))
        return { status: 400, data: { erro: "projetoId inválido" } };
      if (status !== undefined && !STATUS.includes(status as Status))
        return { status: 400, data: { erro: "status inválido" } };
      return {
        status: 200,
        data: artigos.filter(
          (a) =>
            (projetoId === undefined || a.projetoId === projetoId) &&
            (status === undefined || a.status === status)
        ),
      };
    }

    if (caminho === "/glossario") {
      const q = typeof params?.q === "string" ? params.q.toLowerCase() : "";
      return {
        status: 200,
        data: glossario.filter(
          (t) => t.termo.toLowerCase().includes(q) || t.descricao.toLowerCase().includes(q)
        ),
      };
    }

    if (caminho === "/status") return { status: 200, data: contarPorStatus(artigos) };
  }

  if (metodo === "PATCH") {
    const m = caminho.match(/^\/artigos\/(\d+)$/);
    if (m) {
      const novo = corpo?.status as Status;
      if (!STATUS.includes(novo)) return { status: 400, data: { erro: "status inválido" } };
      const artigo = artigos.find((a) => a.id === Number(m[1]));
      if (!artigo) return { status: 404, data: { erro: "Artigo não encontrado" } };
      artigo.status = novo;
      const projeto = projetos.find((p) => p.id === artigo.projetoId);
      if (projeto) projeto.atualizadoEm = new Date().toISOString().slice(0, 10);
      return { status: 200, data: artigo };
    }
  }

  return { status: 404, data: { erro: "Rota não encontrada" } };
}
