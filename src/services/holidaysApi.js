const feriados = [
  {
    data: "01-01-2026",
    nome: "Ano Novo",
    descricao: "Celebração do novo ano civil",
  },
  {
    data: "17-02-2026",
    nome: "Carnaval",
    descricao: "Festa popular com desfiles, músicas e fantasias"
  },
  {
    data: "04-03-2026",
    nome: "Quarta-feira de Cinzas",
    descricao: "Início da Quaresma, 40 dias antes da Páscoa"
  },
  {
    data: "03-04-2026",
    nome: "Sexta-feira Santa",
    descricao: "Comemoração da crucificação de Jesus Cristo"
  },
  {
    data: "21-04-2026",
    nome: "Tiradentes",
    descricao: "Independência do Brasil"
  },
  {
    data: "01-05-2026",
    nome: "Dia do Trabalho",
    descricao: "Celebração dos trabalhadores"
  },
  {
    data: "14-05-2026",
    nome: "Corpus Christi",
    descricao: "Celebração da Eucaristia no calendário católico"
  },
  {
    data: "07-09-2026",
    nome: "Independência do Brasil",
    descricao: "Proclamação da Independência do Brasil"
  },
  {
    data: "12-10-2026",
    nome: "Nossa Senhora Aparecida",
    descricao: "Padroeira do Brasil"
  },
  {
    data: "02-11-2026",
    nome: "Finados",
    descricao: "Dia de homenagem aos falecidos"
  },
  {
    data: "15-11-2026",
    nome: "Proclamação da República",
    descricao: "Proclamação da República Federativa Brasileira"
  },
  {
    data: "20-11-2026",
    nome: "Consciência Negra",
    descricao: "Celebração da cultura afro-brasileira"
  },
  {
    data: "25-12-2026",
    nome: "Natal",
    descricao: "Celebração do nascimento de Jesus Cristo"
  }
];

export function obterTodosFeriados() { 
  return feriados;
}

// API: Obter feriados de um mês específico
export function obterFeriadosPorMês(mês) { 
  const mêsStr = String(mês).padStart(2, "0");
  return feriados.filter(f => f.data.includes(`-${mêsStr}-`));
}

// API: Obter feriados de um ano
export function obterFeriadosPorAno(ano) {
  return feriados.filter(f => f.data.startsWith(`${ano}-`));
}

// API: Procurar feriado por nome
export function buscarFeriado(nome) {
  const nomeMiúscula = nome.toLowerCase();
  return feriados.filter(f => 
    f.nome.toLowerCase().includes(nomeMiúscula) ||
    f.descricao.toLowerCase().includes(nomeMiúscula)
  );
}

// API: Verificar se uma data é feriado
export function éFeriado(dataString) {
  return feriados.some(f => f.data === dataString);
}

// API: Obter próximo feriado a partir de uma data
export function obterProximoFeriado(dataDe = new Date().toISOString().split('T')[0]) {
  return feriados.find(f => f.data >= dataDe);
}

// API: Obter feriados em intervalo de datas
export function obterFeriadosEntre(dataInício, dataFim) {
  return feriados.filter(f => f.data >= dataInício && f.data <= dataFim);
}
