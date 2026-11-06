# Fidalgo · portfólio

Site estático (HTML + CSS + JS puro, sem build).

## Rodar no VS Code
1. Abra a pasta `fidalgo-site` no VS Code.
2. Instale a extensão recomendada **Live Server** (o VS Code sugere sozinho).
3. Clique com o botão direito em `index.html` → **Open with Live Server**.
   Cada vez que você salvar um arquivo, a página recarrega.

## Onde mexer
| Quer mudar… | Arquivo |
|---|---|
| Nome, textos, preços, e-mail, redes, artes da galeria | `js/config.js` |
| Ligar/desligar animações, aviso +18, tema claro/escuro | `js/config.js` |
| Cores, fontes, tamanhos, cantos, velocidade das animações | topo de `css/style.css` (bloco `:root`) |
| Estrutura das seções | `index.html` |

## Adicionar uma arte nova
1. Exporte duas versões em JPG: `nome-800.jpg` (800 px de largura) e `nome-1600.jpg` (1600 px).
2. Coloque em `assets/img/`.
3. Acrescente uma linha em `obras` no `js/config.js`.

A galeria está desenhada para 4 artes (3 verticais + 1 horizontal). Com mais artes, ajuste a grade em `.gallery` no CSS.

## Dica
O aviso de idade e o tema escolhido ficam salvos no navegador. Para ver o aviso de novo:
DevTools (F12) → Application → Local Storage → apague `idade`.
