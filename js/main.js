/* Lógica do site. As configurações ficam em js/config.js */
(() => {
  const S = window.SITE || {};
  const html = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------- tema e animações ---------- */
  const savedTheme = store.get("tema");
  html.dataset.theme = savedTheme || S.tema || "claro";
  const A = S.animacoes || {};
  html.dataset.animHero = A.entradaHero === false ? "off" : "on";
  html.dataset.animScroll = A.revelarAoRolar === false ? "off" : "on";
  html.dataset.animMarquee = A.faixaRolante === false ? "off" : "on";
  html.dataset.zoom = A.zoomNoHover === false ? "off" : "on";

  $("[data-theme-toggle]").addEventListener("click", () => {
    const next = html.dataset.theme === "escuro" ? "claro" : "escuro";
    html.dataset.theme = next;
    store.set("tema", next);
  });

  /* ---------- textos do config ---------- */
  $$("[data-cfg]").forEach((el) => {
    const v = S[el.dataset.cfg];
    if (v != null) el.textContent = v;
  });
  if (S.titulo) document.title = `${S.nome} · ${S.titulo}`;

  /* rabisco de marcador sob uma palavra do título */
  const h1 = $("h1");
  const word = S.palavraDestaque;
  if (word && h1.textContent.includes(word)) {
    const [antes, ...resto] = h1.textContent.split(word);
    h1.textContent = "";
    h1.append(antes);
    const span = document.createElement("span");
    span.className = "rabisco";
    span.textContent = word;
    span.insertAdjacentHTML("beforeend",
      `<svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path d="M4 16c40-9 90-12 140-9s100 4 152-4"/><path d="M14 21c60-6 130-7 200-5"/></svg>`);
    h1.append(span, resto.join(word));
  }
  const status = $("[data-status]");
  if (S.comissoesAbertas === false) {
    status.classList.add("pill--closed");
    $("[data-cfg='fato']", status).textContent = "Comissões fechadas no momento";
  }
  $$("[data-cfg-email]").forEach((a) => { a.href = `mailto:${S.email}`; a.textContent = S.email; });
  $("[data-year]").textContent = new Date().getFullYear();

  /* ---------- redes sociais e canais de contato ---------- */
  const ICONES = {
    // logo oficial do X
    x: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" aria-hidden="true" class="ic-traco"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>`,
    bluesky: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 10.8c-1.1-2.1-4-6-6.7-7.9C2.7 1.1 1.7 1.4 1.1 1.7.3 2 .2 3.2.2 3.9c0 .7.4 5.6.6 6.4.9 2.7 3.7 3.6 6.3 3.3-3.8.6-7.2 2-2.7 6.9 4.9 5.1 6.7-1.1 7.6-4.2.9 3.1 2 9 7.6 4.2 4.2-4.2 1.2-6.3-2.7-6.9 2.6.3 5.4-.6 6.3-3.3.2-.8.6-5.7.6-6.4 0-.7-.1-1.9-.9-2.2-.6-.3-1.6-.6-4.2 1.2C16 4.8 13.1 8.7 12 10.8Z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" aria-hidden="true" class="ic-traco"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>`,
  };
  const ic = (nome) => ICONES[nome] || ICONES.email;
  const redes = S.redes || [];
  const ext = `target="_blank" rel="noopener"`;

  // ícones no topo e no rodapé
  redes.forEach((r) => {
    $("[data-socials-nav]").insertAdjacentHTML("beforeend",
      `<a class="theme-btn social-btn" href="${r.url}" ${ext} aria-label="${r.nome} de ${S.nome} (${r.usuario})">${ic(r.icone)}</a>`);
    $("[data-socials-footer]").insertAdjacentHTML("beforeend",
      `<li><a class="social-btn social-btn--footer" href="${r.url}" ${ext} aria-label="${r.nome} (${r.usuario})">${ic(r.icone)}</a></li>`);
    $("[data-sheet]").insertAdjacentHTML("beforeend",
      `<a href="${r.url}" ${ext} class="sheet__social">${ic(r.icone)} ${r.usuario}</a>`);
  });

  // cartões de contato: redes + e-mail
  const cards = $("[data-contact-cards]");
  const card = (href, icone, chamada, detalhe, externo) => cards.insertAdjacentHTML("beforeend", `
    <li><a class="contact-card" href="${href}" ${externo ? ext : ""}>
      <span class="contact-card__icon">${ic(icone)}</span>
      <span class="contact-card__text"><strong>${chamada}</strong><span>${detalhe}</span></span>
      <svg class="m-arrow" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a></li>`);
  redes.forEach((r) => card(r.url, r.icone, r.chamada || r.nome, r.usuario || r.url, true));
  if (S.email) card(`mailto:${S.email}`, "email", "Mande um e-mail", S.email, false);

  /* ---------- preços ---------- */
  const prices = $("[data-prices]");
  const select = $("[data-format-select]");
  (S.precos || []).forEach((p) => {
    const plus = String(p.valor).trim().startsWith("+");
    const valor = String(p.valor).replace(/^\+\s*/, "");
    const isPct = valor.endsWith("%");
    const price = isPct ? `+${valor}` : `${plus ? "+ " : ""}<small>${S.moeda}</small>${valor}`;
    prices.insertAdjacentHTML("beforeend",
      `<li><strong>${p.item}</strong><span class="price">${price}</span><p>${p.detalhe}</p></li>`);
    if (!plus) select.insertAdjacentHTML("beforeend", `<option>${p.item}</option>`);
  });
  select.insertAdjacentHTML("beforeend", `<option>Ainda não sei</option>`);

  /* ---------- obras ---------- */
  const obras = S.obras || [];
  const src = (o, w) => `assets/img/${o.arquivo}-${w}.jpg`;

  const gallery = $("[data-gallery]");
  obras.forEach((o, i) => {
    gallery.insertAdjacentHTML("beforeend", `
      <figure class="work reveal ${o.nsfw ? "is-nsfw" : ""}" style="--ratio:${o.largura}/${o.altura}">
        <button class="work__open" type="button" data-open="${i}" aria-label="Abrir ${o.titulo}">
          <img src="${src(o, 800)}" srcset="${src(o, 800)} 800w, ${src(o, 1600)} 1600w"
               sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 34vw"
               width="${o.largura}" height="${o.altura}" style="object-position:${o.foco || "50% 50%"}"
               alt="${o.titulo}, ilustração digital" loading="lazy" decoding="async">
        </button>
        ${o.nsfw ? `<div class="nsfw-badge"><span>+18 · clique para ver</span></div>` : ""}
        <span class="work__tag">${o.titulo} · ${o.data}</span>
      </figure>`);
  });
  // a última arte (paisagem) ocupa a linha inteira: imagem maior
  const wide = $(".work:nth-child(4) img", gallery);
  if (wide) wide.sizes = "(max-width: 639px) 100vw, 100vw";

  /* colagem do topo: uma arte livre em destaque + duas outras */
  const heroArt = $("[data-hero-art]");
  const sfw = obras.map((o, i) => ({ o, i })).filter((x) => !x.o.nsfw);
  const rest = obras.map((o, i) => ({ o, i })).filter((x) => x.o.nsfw);
  const pick = [sfw[0] || rest.shift(), ...(sfw.slice(1).concat(rest))].filter(Boolean).slice(0, 3);
  pick.forEach(({ o, i }, n) => {
    heroArt.insertAdjacentHTML("beforeend", `
      <button class="ha ha--${n + 1} ${o.nsfw ? "is-nsfw" : ""}" type="button" data-open="${i}" aria-label="Abrir ${o.titulo}">
        <span class="ha__img">
          <img src="${src(o, n === 0 ? 1600 : 800)}" alt="${o.titulo}, ilustração digital"
               width="${o.largura}" height="${o.altura}"
               style="object-position:${o.foco || "50% 50%"}" ${n === 0 ? 'fetchpriority="high"' : ""}>
        </span>
      </button>`);
  });

  /* ---------- conteúdo +18 ---------- */
  const toggle = $("[data-nsfw-toggle]");
  const switchEl = $("[data-nsfw-switch]");
  let adultOk = !S.avisoDeIdade || store.get("idade") === "sim";
  const setNsfw = (on) => {
    html.classList.toggle("nsfw-on", on);
    toggle.checked = on;
  };
  const lockIfMinor = () => switchEl.classList.toggle("is-locked", !adultOk);
  setNsfw(S.borrarNSFW === false && adultOk);
  lockIfMinor();

  toggle.addEventListener("change", () => {
    if (!adultOk) { toggle.checked = false; openGate(); return; }
    setNsfw(toggle.checked);
  });

  /* aviso de idade */
  const gate = $("[data-gate]");
  const openGate = () => { gate.hidden = false; $("[data-gate-yes]").focus(); };
  if (S.avisoDeIdade && !store.get("idade")) openGate();
  $("[data-gate-yes]").addEventListener("click", () => {
    adultOk = true; store.set("idade", "sim"); gate.hidden = true; lockIfMinor();
  });
  $("[data-gate-no]").addEventListener("click", () => {
    adultOk = false; store.set("idade", "nao"); gate.hidden = true; setNsfw(false); lockIfMinor();
  });

  /* ---------- lightbox ---------- */
  const lb = $("[data-lightbox]");
  const lbImg = $("[data-lb-img]");
  const lbFrame = $("[data-lb-frame]");
  let current = 0, lastFocus = null;

  const show = (i) => {
    current = (i + obras.length) % obras.length;
    const o = obras[current];
    lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
    lbImg.src = src(o, 1600);
    lbImg.alt = `${o.titulo}, ilustração digital`;
    $("[data-lb-title]").textContent = o.titulo;
    $("[data-lb-date]").textContent = o.data;
    lbFrame.classList.toggle("is-blurred", o.nsfw && !html.classList.contains("nsfw-on"));
  };
  const openLb = (i) => {
    lastFocus = document.activeElement;
    show(i); lb.hidden = false; document.body.style.overflow = "hidden";
    $("[data-lb-close]").focus();
  };
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (t) openLb(+t.dataset.open);
  });
  $("[data-lb-close]").addEventListener("click", closeLb);
  $("[data-lb-prev]").addEventListener("click", () => show(current - 1));
  $("[data-lb-next]").addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  $("[data-lb-reveal]").addEventListener("click", () => {
    if (!adultOk) { closeLb(); openGate(); return; }
    setNsfw(true); lbFrame.classList.remove("is-blurred");
  });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Tab") { // foco preso dentro da visualização
      const f = $$("button", lb).filter((b) => b.offsetParent !== null);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  /* ---------- menu do celular ---------- */
  const menuBtn = $("[data-menu]");
  const sheet = $("[data-sheet]");
  const setMenu = (open) => {
    sheet.hidden = !open; menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  menuBtn.addEventListener("click", () => setMenu(sheet.hidden));
  sheet.addEventListener("click", () => setMenu(false));

  /* ---------- revelar ao rolar ---------- */
  if (html.dataset.animScroll === "on" && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- formulário (abre o e-mail com o pedido preenchido) ---------- */
  const form = $("[data-form]");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const bad = {
      nome: !d.nome.trim(),
      email: !/\S+@\S+\.\S+/.test(d.email),
      ideia: !d.ideia.trim(),
    };
    Object.entries(bad).forEach(([k, v]) => form.elements[k].setAttribute("aria-invalid", v));
    const ok = !Object.values(bad).some(Boolean);
    $("[data-form-error]").hidden = ok;
    if (!ok) return;
    const body = `Nome: ${d.nome}\nE-mail: ${d.email}\nFormato: ${d.formato}\n\n${d.ideia}`;
    location.href = `mailto:${S.email}?subject=${encodeURIComponent("Pedido de comissão – " + d.formato)}&body=${encodeURIComponent(body)}`;
  });
})();
