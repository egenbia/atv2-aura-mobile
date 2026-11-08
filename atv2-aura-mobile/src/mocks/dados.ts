// Dados mockados do PI. Ficam em memória: mudanças (ex.: status de um artigo)
// valem enquanto o app estiver aberto. Os contadores por status NÃO ficam aqui,
// são calculados a partir dos artigos (ver services/mockRotas.ts).
import { Article } from "../types/article";
import { GlossaryTerm } from "../types/glossary";

export type ProjetoMock = {
  id: number;
  titulo: string;
  criadoEm: string; // ISO (AAAA-MM-DD)
  atualizadoEm: string; // ISO (AAAA-MM-DD)
};

export const projetos: ProjetoMock[] = [
  { id: 1, titulo: "Inteligência Artificial", criadoEm: "2026-10-12", atualizadoEm: "2026-10-16" },
  { id: 2, titulo: "Processamento de Linguagem Natural", criadoEm: "2026-10-14", atualizadoEm: "2026-10-18" },
  { id: 3, titulo: "Saúde Digital", criadoEm: "2026-10-20", atualizadoEm: "2026-10-22" },
  { id: 4, titulo: "Educação a Distância", criadoEm: "2026-10-25", atualizadoEm: "2026-10-25" },
];

export const artigos: Article[] = [
  // Projeto 1: 12 artigos (5 incluídos, 3 excluídos, 4 pendentes)
  { id: 1, projetoId: 1, titulo: "Aplicações de Aprendizado de Máquina no Apoio a Decisão Clínica", autores: "Neves, F.; Costa, M.", ano: 2020, status: "incluido" },
  { id: 2, projetoId: 1, titulo: "Redes Neurais Profundas para Diagnóstico por Imagem", autores: "Silva, A.; Rocha, P.", ano: 2021, status: "incluido" },
  { id: 3, projetoId: 1, titulo: "Uma Revisão sobre Explicabilidade em Modelos de IA", autores: "Almeida, J.", ano: 2022, status: "incluido" },
  { id: 4, projetoId: 1, titulo: "Aprendizado por Reforço em Sistemas Autônomos", autores: "Martins, L.; Souza, R.", ano: 2019, status: "incluido" },
  { id: 5, projetoId: 1, titulo: "Ética e Viés Algorítmico: um Mapeamento Sistemático", autores: "Ferreira, C.; Lima, D.", ano: 2023, status: "incluido" },
  { id: 6, projetoId: 1, titulo: "Chatbots no Atendimento ao Cliente: Estudo de Caso", autores: "Barros, T.", ano: 2018, status: "excluido" },
  { id: 7, projetoId: 1, titulo: "Visão Computacional Aplicada à Agricultura", autores: "Gomes, H.; Pires, N.", ano: 2017, status: "excluido" },
  { id: 8, projetoId: 1, titulo: "Algoritmos Genéticos para Otimização de Rotas", autores: "Duarte, V.", ano: 2016, status: "excluido" },
  { id: 9, projetoId: 1, titulo: "IA Generativa na Educação Superior", autores: "Ramos, S.; Teixeira, B.", ano: 2024, status: "pendente" },
  { id: 10, projetoId: 1, titulo: "Aprendizado Federado e Privacidade de Dados", autores: "Cardoso, E.", ano: 2023, status: "pendente" },
  { id: 11, projetoId: 1, titulo: "Transformers: uma Análise Comparativa de Arquiteturas", autores: "Nunes, G.; Alves, K.", ano: 2022, status: "pendente" },
  { id: 12, projetoId: 1, titulo: "Sistemas de Recomendação Baseados em Grafos", autores: "Moraes, I.", ano: 2021, status: "pendente" },

  // Projeto 2
  { id: 13, projetoId: 2, titulo: "Análise de Sentimentos em Redes Sociais em Português", autores: "Pereira, M.; Dias, O.", ano: 2021, status: "incluido" },
  { id: 14, projetoId: 2, titulo: "Modelos de Linguagem para Resumo Automático de Textos", autores: "Santos, R.", ano: 2022, status: "incluido" },
  { id: 15, projetoId: 2, titulo: "Reconhecimento de Entidades Nomeadas em Textos Jurídicos", autores: "Vieira, J.; Campos, L.", ano: 2020, status: "excluido" },
  { id: 16, projetoId: 2, titulo: "Tradução Automática Neural: Avanços Recentes", autores: "Lopes, A.", ano: 2023, status: "pendente" },
  { id: 17, projetoId: 2, titulo: "Embeddings de Palavras para Língua Portuguesa", autores: "Freitas, D.; Melo, T.", ano: 2019, status: "pendente" },
  { id: 18, projetoId: 2, titulo: "Detecção de Notícias Falsas com PLN", autores: "Azevedo, P.", ano: 2022, status: "pendente" },

  // Projeto 3
  { id: 19, projetoId: 3, titulo: "Telemedicina no Brasil: Panorama e Desafios", autores: "Cunha, F.; Rezende, C.", ano: 2021, status: "incluido" },
  { id: 20, projetoId: 3, titulo: "Aplicativos Móveis para Monitoramento de Doenças Crônicas", autores: "Batista, M.", ano: 2020, status: "excluido" },
  { id: 21, projetoId: 3, titulo: "Prontuário Eletrônico e Interoperabilidade", autores: "Siqueira, N.; Prado, E.", ano: 2019, status: "pendente" },
  { id: 22, projetoId: 3, titulo: "Wearables e Saúde Preventiva: Revisão de Literatura", autores: "Moura, G.", ano: 2023, status: "pendente" },

  // Projeto 4
  { id: 23, projetoId: 4, titulo: "Engajamento de Estudantes em Ambientes Virtuais de Aprendizagem", autores: "Carvalho, B.; Braga, S.", ano: 2022, status: "pendente" },
  { id: 24, projetoId: 4, titulo: "Evasão em Cursos EAD: Fatores e Estratégias", autores: "Fonseca, R.", ano: 2020, status: "pendente" },
  { id: 25, projetoId: 4, titulo: "Gamificação no Ensino Remoto", autores: "Leite, V.; Assis, M.", ano: 2021, status: "pendente" },
];

export const glossario: GlossaryTerm[] = [
  {
    id: 1,
    termo: "PICO",
    descricao:
      "Estratégia para montar a pergunta de pesquisa: População, Intervenção, Comparação e Outcome (desfecho).",
  },
  {
    id: 2,
    termo: "RSL",
    descricao:
      "Revisão Sistemática da Literatura: método que identifica, avalia e sintetiza de forma rigorosa e reprodutível os estudos existentes sobre uma questão de pesquisa.",
  },
  {
    id: 3,
    termo: "Critérios de inclusão",
    descricao:
      "Regras definidas antes da seleção que determinam quais estudos entram na revisão (por exemplo, período, idioma e tipo de publicação). Quem não atende é excluído.",
  },
  {
    id: 4,
    termo: "PLN",
    descricao:
      "Processamento de Linguagem Natural: área da inteligência artificial que permite aos computadores interpretar, analisar e gerar linguagem humana.",
  },
];
