export type Status = "incluido" | "excluido" | "pendente";

/** Contadores por status (resposta de GET /status). */
export type ContadoresStatus = Record<Status, number> & { total: number };
