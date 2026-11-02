import type { Locale } from "./locales";

interface ApproachStepCopy {
  title: string;
  body: string;
  evidence: string;
}

interface ApproachCopy {
  eyebrow: string;
  title: string;
  lead: string;
  steps: readonly [
    ApproachStepCopy,
    ApproachStepCopy,
    ApproachStepCopy,
    ApproachStepCopy,
    ApproachStepCopy,
  ];
}

const approachCopy = {
  es: {
    eyebrow: "Ingeniería",
    title: "Ingeniería en acción",
    lead: "No abro por el stack. Abro por el problema, decido qué sistema hace falta y lo dejo en un estado que se puede explicar.",
    steps: [
      {
        title: "Problema",
        body: "El encargo real es que la información existe y la persona no puede usarla. Antes de elegir un modelo, nombro para quién es y qué se rompe si nadie lo resuelve.",
        evidence:
          "En TramitIA, los trámites del municipio de Santa Cruz y sus subalcaldías no estaban reunidos en una orientación consultable. En AcademIA, saber si un estudio existe, quién lo ofrece, el precio y las fechas exigía comparar fuentes sueltas.",
      },
      {
        title: "Límite",
        body: "La decisión de ingeniería es qué hace el sistema y qué se niega a hacer. Ese límite vale más que el framework.",
        evidence:
          "TramitIA responde con fichas publicadas. Si el trámite no está en el catálogo, lo dice y busca en internet. No se presenta como la Alcaldía. AcademIA corre en la máquina local y no se anuncia como un servicio público ya lanzado.",
      },
      {
        title: "Sistema",
        body: "El caso y la aplicación son dos piezas. El caso explica el problema y la decisión aunque la demo no esté en el aire. El botón de demo solo aparece cuando hay una URL.",
        evidence:
          "TramitIA está desplegado. AcademIA, por ahora, se ejecuta en local. Ninguno de los dos finge un enlace que no existe.",
      },
      {
        title: "Validación",
        body: "No publico un resultado que no medí. Un número, un porcentaje o un tiempo solo entra si tiene fuente. Si no la tiene, se queda afuera.",
        evidence:
          "Los dos casos cuentan el problema y la decisión. No muestran métricas inventadas.",
      },
      {
        title: "Evidencia",
        body: "Las herramientas cierran el relato. Muestran cómo se construyó. No reemplazan el problema.",
        evidence:
          "TramitIA documenta Next.js, FastAPI, LangGraph y PostgreSQL con pgvector. AcademIA documenta Next.js, Supabase Auth y Docker.",
      },
    ],
  },
  en: {
    eyebrow: "Engineering",
    title: "Engineering in action",
    lead: "I do not open with the stack. I open with the problem, decide which system is needed, and leave it in a state that can be explained.",
    steps: [
      {
        title: "Problem",
        body: "The real brief is that the information exists and the person cannot use it. Before choosing a model, I name who it is for and what breaks if nobody solves it.",
        evidence:
          "In TramitIA, the procedures of the Santa Cruz municipality and its sub-mayoral offices were not gathered into guidance a person could look up. In AcademIA, knowing whether a program exists, who offers it, the price, and the dates meant comparing scattered sources.",
      },
      {
        title: "Boundary",
        body: "The engineering decision is what the system does and what it refuses to do. That boundary matters more than the framework.",
        evidence:
          "TramitIA answers from published procedure cards. If the procedure is not in the catalog, it says so and searches the web. It does not present itself as city hall. AcademIA runs on the local machine and is not announced as a launched public service.",
      },
      {
        title: "System",
        body: "The case and the application are two pieces. The case explains the problem and the decision even when the demo is down. The demo button appears only when a URL exists.",
        evidence:
          "TramitIA is deployed. AcademIA, for now, runs locally. Neither one pretends a link exists.",
      },
      {
        title: "Validation",
        body: "I do not publish a result I did not measure. A number, a percentage, or a duration is included only with a source. Without a source, it stays out.",
        evidence:
          "Both cases tell the problem and the decision. They do not show invented metrics.",
      },
      {
        title: "Evidence",
        body: "The tools close the story. They show how it was built. They do not replace the problem.",
        evidence:
          "TramitIA documents Next.js, FastAPI, LangGraph, and PostgreSQL with pgvector. AcademIA documents Next.js, Supabase Auth, and Docker.",
      },
    ],
  },
  pt: {
    eyebrow: "Engenharia",
    title: "Engenharia em ação",
    lead: "Não começo pelo stack. Começo pelo problema, decido qual sistema faz falta e deixo isso num estado que dá para explicar.",
    steps: [
      {
        title: "Problema",
        body: "O pedido real é que a informação existe e a pessoa não consegue usá-la. Antes de escolher um modelo, nomeio para quem é e o que se rompe se ninguém resolver.",
        evidence:
          "No TramitIA, os trâmites do município de Santa Cruz e das subprefeituras não estavam reunidos numa orientação consultável. No AcademIA, saber se um estudo existe, quem oferece, o preço e as datas exigia comparar fontes soltas.",
      },
      {
        title: "Limite",
        body: "A decisão de engenharia é o que o sistema faz e o que se recusa a fazer. Esse limite vale mais que o framework.",
        evidence:
          "O TramitIA responde com fichas publicadas. Se o trâmite não está no catálogo, ele diz isso e busca na internet. Não se apresenta como a prefeitura. O AcademIA roda na máquina local e não é anunciado como um serviço público já lançado.",
      },
      {
        title: "Sistema",
        body: "O caso e a aplicação são duas peças. O caso explica o problema e a decisão mesmo quando a demo está fora do ar. O botão de demo só aparece quando existe uma URL.",
        evidence:
          "O TramitIA está implantado. O AcademIA, por enquanto, roda localmente. Nenhum dos dois finge um link que não existe.",
      },
      {
        title: "Validação",
        body: "Não publico um resultado que não medi. Um número, uma porcentagem ou um tempo só entra se tiver fonte. Sem fonte, fica de fora.",
        evidence:
          "Os dois casos contam o problema e a decisão. Não mostram métricas inventadas.",
      },
      {
        title: "Evidência",
        body: "As ferramentas fecham o relato. Mostram como foi construído. Não substituem o problema.",
        evidence:
          "O TramitIA documenta Next.js, FastAPI, LangGraph e PostgreSQL com pgvector. O AcademIA documenta Next.js, Supabase Auth e Docker.",
      },
    ],
  },
} as const satisfies Record<Locale, ApproachCopy>;

export { approachCopy };
