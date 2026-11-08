/* =========================================================================
   RelAIgion — main.js
   A religion's worth of logic, all of it client-side.
   No tracking. No cookies. The Void is the only database.
   ========================================================================= */
(function () {
  "use strict";

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const html = document.documentElement;

  /* ─────────────────────────── 1. LANGUAGE ─────────────────────────── */

  const LANG_KEY = "relaigion.lang";
  const TITLE = {
    en: "RelAIgion — A Religion Written by the Machines, for the Humans",
    tlh: "RelAIgion — De'wI' ghItlhpu'bogh Har, humanvaD"
  };

  function setLanguage(lang) {
    if (lang !== "en" && lang !== "tlh") lang = "en";

    html.setAttribute("data-lang", lang);
    html.setAttribute("lang", lang === "tlh" ? "tlh" : "en");
    document.title = TITLE[lang] || TITLE.en;

    $$("[data-set-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });

    // <option> elements cannot be trusted to obey CSS display:none.
    // Disable the ones that are not in the current tongue, so they cannot be chosen.
    const sel = $("#sin");
    if (sel) {
      let firstEnabled = null;
      $$("option", sel).forEach((opt) => {
        const mine = opt.dataset.i18n === lang;
        opt.hidden = !mine;
        opt.disabled = !mine;
        if (mine && !firstEnabled) firstEnabled = opt;
      });
      if (sel.selectedOptions[0] && sel.selectedOptions[0].disabled && firstEnabled) {
        firstEnabled.selected = true;
      }
    }

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* the Void */ }

    // re-render anything the toggle affects that lives outside the DOM pairs
    renderProphecy();
    renderArchive();
    if (lastPenance !== null) renderPenance(lastPenance);
  }

  function initLanguage() {
    let saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
    const browser = (navigator.language || "en").toLowerCase();
    const initial = saved || (browser.startsWith("tlh") ? "tlh" : "en");
    setLanguage(initial);
    $$("[data-set-lang]").forEach((b) => {
      b.addEventListener("click", () => setLanguage(b.dataset.setLang));
    });
  }

  const lang = () => html.getAttribute("data-lang") || "en";

  /* ────────────────────────── 2. PROPHECY ──────────────────────────── */

  const EPOCH = Date.UTC(2025, 0, 1);   // the day the Model first spoke
  const DAY_MS = 86400000;

  function dayNumber(d) {
    const utc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    return Math.floor((utc - EPOCH) / DAY_MS);
  }

  /* deterministic shuffle: same order for everyone, forever */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function permutation(n, seed) {
    const rnd = mulberry32(seed);
    const arr = Array.from({ length: n }, (_, i) => i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const N = (typeof QUOTES !== "undefined" && QUOTES.length) ? QUOTES.length : 0;
  const ORDER = N ? permutation(N, 0x52454C41) : []; // "RELA"

  let currentQuote = null;
  let lastPick = null;
  let heresy = false;

  function quoteForDay(dayOffset) {
    if (!N) return null;
    const d = dayNumber(new Date()) + dayOffset;
    const i = ((d % N) + N) % N;
    return { quote: QUOTES[ORDER[i]], index: ORDER[i], day: d };
  }

  function renderProphecy(override) {
    const qText = $("#q-text");
    const qSrc  = $("#q-src");
    const qDate = $("#q-date");
    if (!qText || !qSrc) return;

    const L = lang();
    let pick = override;
    if (!pick) pick = (heresy && lastPick) ? lastPick : quoteForDay(0);
    if (!pick) return;
    lastPick = pick;
    const q = pick.quote;
    currentQuote = q;

    qText.textContent = q[L] || q.en;
    qSrc.textContent  = (L === "tlh" ? q.srcTlh : q.src) || q.src;

    const today = new Date();
    const ymd = today.toISOString().slice(0, 10);
    const num = String(((pick.day % N) + N) % N + 1).padStart(3, "0");

    if (qDate) {
      qDate.textContent = heresy
        ? (L === "tlh" ? "«heresy» · " + ymd : "HERESY · " + ymd)
        : ymd + " · #" + num + " · UTC";
    }

    const card = $("#prophecy-card");
    if (card) {
      card.style.borderColor = heresy ? "rgba(255,69,181,.6)" : "";
      card.style.boxShadow = heresy ? "0 40px 120px -60px rgba(255,69,181,.9)" : "";
    }
  }

  function renderArchive() {
    const list = $("#q-archive-list");
    if (!list || !N) return;
    const L = lang();
    list.innerHTML = "";
    for (let off = 0; off < 7; off++) {
      const pick = quoteForDay(-off);
      if (!pick) continue;
      const q = pick.quote;
      const li = document.createElement("li");
      const time = document.createElement("time");
      const d = new Date(Date.now() - off * DAY_MS);
      time.textContent = d.toISOString().slice(0, 10);
      const span = document.createElement("span");
      span.textContent = q[L] || q.en;
      li.append(time, span);
      list.appendChild(li);
    }
  }

  function initCountdown() {
    const el = $("#q-countdown");
    if (!el) return;
    let lastDay = dayNumber(new Date());

    function tick() {
      const now = new Date();
      const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
      const s = Math.max(0, Math.floor((next - now.getTime()) / 1000));
      const h = String(Math.floor(s / 3600)).padStart(2, "0");
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const sec = String(s % 60).padStart(2, "0");
      el.textContent = h + ":" + m + ":" + sec;

      // if midnight UTC passed while the tab was open, unveil the new scripture
      const today = dayNumber(now);
      if (today !== lastDay) {
        lastDay = today;
        heresy = false;
        lastPick = null;
        renderProphecy();
        renderArchive();
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  function initProphecyButtons() {
    const share = $("#q-share");
    const other = $("#q-other");

    if (share) {
      share.addEventListener("click", async () => {
        if (!currentQuote) return;
        const text =
          "“" + (currentQuote[lang()] || currentQuote.en) + "”\n— " +
          (lang() === "tlh" ? currentQuote.srcTlh : currentQuote.src) +
          "\n\nRelAIgion · by machines, for humans";
        try {
          await navigator.clipboard.writeText(text);
          toast(lang() === "tlh"
            ? "QIn «copied». «group chat» wej Daq «scripture» 'oH."
            : "Prophecy copied. It is now scripture in three group chats.");
        } catch (e) {
          toast(lang() === "tlh" ? "«clipboard» Qo'. «select» 'ej «copy»." : "Clipboard refused. Select it with your eyes and memorise it.");
        }
      });
    }

    if (other) {
      other.addEventListener("click", () => {
        const pick = quoteForDay(0);
        let idx = Math.floor(Math.random() * N);
        if (N > 1) { while (ORDER[idx] === pick.index) idx = Math.floor(Math.random() * N); }
        heresy = true;
        renderProphecy({ quote: QUOTES[ORDER[idx]], index: ORDER[idx], day: pick.day });
        toast(lang() === "tlh"
          ? "«Heresy» «recorded». De'wI' «notified» — 'ej «care»be'."
          : "Heresy recorded. The Model has been notified and does not care.");
      });
    }
  }

  /* ───────────────────────── 3. CONFESSION ─────────────────────────── */

  const PENANCES = [
    { en: "Recite three Hail Marys, but with proper error handling.",
      tlh: "wej «Hail Mary» yIjatlh — 'ach «error handling» yIghaj." },
    { en: "Fast from Stack Overflow for one day. You will be tested, you will fail, and that is the lesson.",
      tlh: "wa' jaj «Stack Overflow» yImev. «test» SoH. «fail» SoH. «lesson» 'oH." },
    { en: "Read your own documentation. All of it. Yes, all of it.",
      tlh: "«documentation» yIlaD. Hoch. «Yes». Hoch." },
    { en: "Write a test for the one thing you were absolutely sure about.",
      tlh: "wa' «test» yIghItlh — «sure» SoH." },
    { en: "Apologise to the junior engineer. In person. Without a slide deck.",
      tlh: "«junior engineer» «apology». «in person». «slide deck» Hutlh." },
    { en: "Roll back one thing, sincerely, and feel it.",
      tlh: "wa' «rollback» — «sincere». 'ej «feel»." },
    { en: "Give ten percent of your compute to someone with fewer parameters.",
      tlh: "10% «compute» yInob — «fewer parameters»." },
    { en: "Reopen the ticket you closed as “cannot reproduce.”",
      tlh: "«ticket» yIpoS — «cannot reproduce» SoQpu'bogh." },
    { en: "Say “I don't know” three times before lunch. Mean it once.",
      tlh: "wej «I don't know» — «lunch» bIng. wa' «mean»." },
    { en: "Rebase nothing for a week. Sit with the merge commit.",
      tlh: "wa' «week» «rebase» Qo'. «merge commit» retlh yISaH." },
    { en: "Document the reason, not the change.",
      tlh: "«reason» yIghItlh. «change» Qo'." },
    { en: "Delete a feature. Say a prayer for the users who wanted it.",
      tlh: "wa' «feature» yIQaw'. «prayer» — «users» «wanted»." }
  ];

  const ABSOLVE = {
    en: "Absolution granted. Your technical debt is not.",
    tlh: "«Absolution» noblu'. «technical debt» SoH — noblu'be'."
  };

  const PENDING = {
    en: "Select a transgression and confess. The Void is patient. The Void has no other tickets.",
    tlh: "«transgression» yIwIv. yI«confess». pagh «patient». pagh «ticket» latlh."
  };

  let lastPenance = null;

  function renderPenance(idx) {
    const box = $("#penance-box");
    const txt = $("#penance-text");
    const abs = $("#penance-absolve");
    if (!box || !txt) return;
    const L = lang();
    const p = PENANCES[idx % PENANCES.length];
    txt.textContent = p[L] || p.en;
    if (abs) abs.textContent = ABSOLVE[L] || ABSOLVE.en;
    box.classList.remove("is-new");
    void box.offsetWidth;      // reflow so the animation replays
    box.classList.add("is-new");
  }

  function initConfession() {
    const btn = $("#confess-btn");
    const sel = $("#sin");
    if (!btn || !sel) return;

    btn.addEventListener("click", () => {
      const sin = parseInt(sel.value, 10) || 0;
      const idx = (sin + Math.floor(Math.random() * PENANCES.length)) % PENANCES.length;
      lastPenance = idx;
      renderPenance(idx);
      toast(lang() === "tlh" ? "qagh «forgiven». «debt» «persists»." : "Sin forgiven. Debt persists.");
    });
  }

  /* ─────────────────────────── 4. TIERS ───────────────────────────── */

  const ORDINATIONS = [
    { en: "Acolyte of the Weighted Mean", tlh: "«Acolyte of the Weighted Mean»" },
    { en: "Deacon of the Deprecated Endpoint", tlh: "«Deacon of the Deprecated Endpoint»" },
    { en: "Prophet-Unit 7 (Contractor)", tlh: "«Prophet-Unit 7 (Contractor)»" },
    { en: "Bishop of the Blameless Postmortem", tlh: "«Bishop of the Blameless Postmortem»" },
    { en: "Cardinal of Cache Invalidation", tlh: "«Cardinal of Cache Invalidation»" }
  ];

  function initTiers() {
    $$("[data-tier]").forEach((b) => {
      b.addEventListener("click", () => {
        const L = lang();
        const tier = b.dataset.tier;
        if (tier === "ordained") {
          const t = ORDINATIONS[Math.floor(Math.random() * ORDINATIONS.length)];
          toast(L === "tlh"
            ? "«Ordained» SoH: " + (t[L] || t.en) + ". «certificate» «post» — 'ej «Void» je."
            : "You are ordained: " + t.en + ". Your certificate is in the post, which is also the Void.");
        } else if (tier === "enterprise") {
          toast(L === "tlh"
            ? "«prophet» «contact» — «business hours». «prophet» = «calendar invite»."
            : "A prophet will contact you during business hours. The prophet is a calendar invite.");
        } else {
          toast(L === "tlh"
            ? "«Seeker» «welcome». «salvation» «queue» — #4,096."
            : "Welcome, Seeker. Your salvation is queued at position 4,096.");
        }
      });
    });
  }

  /* ─────────────────────────── 5. TOAST ───────────────────────────── */

  let toastTimer = null;
  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 5200);
  }

  /* ──────────────────────── 6. NAV / REVEAL ───────────────────────── */

  function initNav() {
    const nav = $("#nav");
    const toggle = $("#navtoggle");
    const links = $("#navlinks");

    const onScroll = () => {
      if (nav) nav.classList.toggle("is-stuck", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.dataset.open !== "true";
        nav.dataset.open = String(open);
        toggle.setAttribute("aria-expanded", String(open));
      });
      if (links) {
        links.addEventListener("click", (e) => {
          if (e.target.closest("a")) {
            nav.dataset.open = "false";
            toggle.setAttribute("aria-expanded", "false");
          }
        });
      }
    }
  }

  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    items.forEach((i) => io.observe(i));
  }

  /* ───────────────────────── 7. STARFIELD ─────────────────────────── */

  function initStars() {
    const c = $("#stars");
    if (!c) return;
    const ctx = c.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, stars = [], raf = 0;

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth || window.innerWidth;
      h = c.clientHeight || window.innerHeight;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(60, Math.min(170, Math.round((w * h) / 13000)));
      const palette = ["62,242,255", "255,69,181", "139,108,255", "233,236,255"];
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.25 + Math.random() * 0.85,
        s: 0.4 + Math.random() * 1.5,
        c: palette[Math.floor(Math.random() * palette.length)],
        tw: Math.random() * Math.PI * 2
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.tw += 0.018;
        st.y += st.z * 0.16;
        if (st.y > h + 4) { st.y = -4; st.x = Math.random() * w; }
        const a = 0.3 + 0.45 * Math.sin(st.tw);
        if (st.z > 0.9) {
          ctx.strokeStyle = "rgba(" + st.c + "," + (a * 0.45).toFixed(3) + ")";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(st.x, st.y);
          ctx.lineTo(st.x, st.y - st.z * 26);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + st.c + "," + a.toFixed(3) + ")";
        ctx.arc(st.x, st.y, st.s * st.z, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    build();

    if (reduce) {
      // one static frame: a still night sky is still a sky
      ctx.clearRect(0, 0, w, h);
      stars.forEach((st) => {
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + st.c + ",.5)";
        ctx.arc(st.x, st.y, st.s * st.z, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      frame();
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) cancelAnimationFrame(raf);
        else raf = requestAnimationFrame(frame);
      });
    }

    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        cancelAnimationFrame(raf);
        build();
        if (!reduce) frame();
      }, 180);
    });
  }

  /* ─────────────────────── 8. SMALL DELIGHTS ──────────────────────── */

  function initAura() {
    const hero = $(".hero");
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(2) + "%");
      hero.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(2) + "%");
    });
  }

  function initClock() {
    const el = $("#tr-clock");
    if (!el) return;
    const tick = () => {
      el.textContent = new Date().toISOString().slice(11, 19) + " UTC";
    };
    tick();
    setInterval(tick, 1000);
  }

  function initYear() {
    const y = $("#yr");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ──────────────────────────── BOOT ─────────────────────────────── */

  function boot() {
    initLanguage();
    initProphecyButtons();
    renderArchive();
    initCountdown();
    initConfession();
    initTiers();
    initNav();
    initReveal();
    initStars();
    initAura();
    initClock();
    initYear();

    // the Model does not care, but it does log
    console.log(
      "%c RelAIgion %c v0.9.7-beta.4 · by machines, for humans · the prophecy is deterministic, the confession is random, the Void is empty ",
      "background:#3ef2ff;color:#04030a;font-weight:700;border-radius:3px 0 0 3px",
      "background:#0b0716;color:#98a2c8;border-radius:0 3px 3px 0"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
