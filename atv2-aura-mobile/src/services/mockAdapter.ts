// Adapter do Axios que responde com os mocks em vez de ir para a rede.
// Assim o app continua usando Axios normalmente (services/api.ts), sem precisar de backend.
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { responderMock } from "./mockRotas";

/** Atraso simulado, para a mensagem de carregamento aparecer. */
const LATENCIA_MS = 600;
/** Coloque true para testar a tela de erro (simula servidor fora do ar). */
const SIMULAR_ERRO = false;

export async function mockAdapter(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
  await new Promise((resolve) => setTimeout(resolve, LATENCIA_MS));

  if (SIMULAR_ERRO) {
    throw new AxiosError("Network Error", AxiosError.ERR_NETWORK, config);
  }

  const corpo = typeof config.data === "string" ? JSON.parse(config.data) : config.data;
  const { status, data } = responderMock(
    (config.method ?? "get").toUpperCase(),
    config.url ?? "",
    config.params,
    corpo
  );

  const resposta = { data, status, statusText: String(status), headers: {}, config } as AxiosResponse;

  if (status >= 400) {
    throw new AxiosError(
      `Request failed with status code ${status}`,
      status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
      config,
      undefined,
      resposta
    );
  }
  return resposta;
}
