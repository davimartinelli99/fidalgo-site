/* =====================================================================
   CONFIGURAÇÃO DO SITE
   Edite os valores abaixo e salve: o Live Server recarrega a página.
   Cores e fontes ficam no topo de css/style.css (bloco :root).
   ===================================================================== */

window.SITE = {
  // ---------- Identidade ----------
  nome: "Fidalgo",
  inicial: "F",                       // letra do logo
  titulo: "Ilustração de personagens sob encomenda",
  palavraDestaque: "personagens",     // palavra do título que ganha o rabisco de marcador
  subtitulo:
    "Personagens originais e fanarts com cor vibrante, luz dramática e muito carisma. Do esboço à arte final, feita do seu jeito.",
  fato: "Comissões abertas · entrega em 2 a 3 semanas",
  comissoesAbertas: true,             // false = mostra "Comissões fechadas"

  // ---------- Aparência ----------
  tema: "claro",                      // "claro" ou "escuro"

  // ---------- Animações (true / false) ----------
  animacoes: {
    entradaHero: true,                // artes do topo sobem ao carregar
    revelarAoRolar: true,             // seções aparecem ao rolar a página
    faixaRolante: true,               // faixa de texto que desliza
    zoomNoHover: true,                // zoom leve nas artes ao passar o mouse
  },

  // ---------- Conteúdo adulto ----------
  avisoDeIdade: true,                 // pergunta "tem 18+?" na primeira visita
  borrarNSFW: true,                   // artes +18 começam borradas

  // ---------- Galeria ----------
  // arquivo = nome base em assets/img (sem "-800.jpg" / "-1600.jpg")
  // largura/altura = proporção original da arte
  obras: [
    { arquivo: "desenho-21-10-2026", titulo: "Pausa",   data: "21/10/2026", nsfw: false, largura: 2400, altura: 3700, foco: "50% 40%" },
    { arquivo: "desenho-07-09-2026", titulo: "Neeko",   data: "07/09/2026", nsfw: true,  largura: 3000, altura: 3900, foco: "50% 20%" },
    { arquivo: "desenho-26-10-2026", titulo: "Palhaça", data: "26/10/2026", nsfw: true,  largura: 1100, altura: 2350, foco: "50% 15%" },
    { arquivo: "desenho-30-10-2026", titulo: "Noite",   data: "30/10/2026", nsfw: true,  largura: 2942, altura: 1700, foco: "50% 40%" },
  ],

  // ---------- Preços (valores de exemplo: ajuste!) ----------
  moeda: "R$",
  precos: [
    { item: "Busto",          detalhe: "Cabeça e ombros, fundo liso",              valor: "120" },
    { item: "Meio corpo",     detalhe: "Da cintura para cima, fundo liso",         valor: "180" },
    { item: "Corpo inteiro",  detalhe: "Personagem completo, fundo liso",          valor: "250" },
    { item: "Cenário",        detalhe: "Fundo ilustrado com luz e ambiente",       valor: "+ 80" },
    { item: "Personagem extra", detalhe: "Cada personagem a mais na mesma cena",   valor: "+ 70%" },
  ],

  // ---------- Contato ----------
  email: "contato@fidalgo.example",
  // icone: "x", "instagram", "bluesky" ou "email" (desenhos em js/main.js → ICONES)
  redes: [
    { nome: "X", usuario: "@Torradabrt", url: "https://x.com/Torradabrt", icone: "x", chamada: "Mande uma DM no X" },
    // { nome: "Instagram", usuario: "@seu-usuario", url: "https://instagram.com/seu-usuario", icone: "instagram", chamada: "Fale no Instagram" },
  ],
};
