(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile drawer
  const burger = $("#burger"), menu = $("#menu");
  burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
  $$("#menu a").forEach(a => a.onclick = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); });
  $$("[data-focus]").forEach(b => b.onclick = () => { const t = $(b.dataset.focus); t.scrollIntoView(); t.focus(); });

  // Terminal typing
  const term = $("#term"), lines = term.dataset.lines.split("|");
  if (reduce) term.textContent = lines.join("\n");
  else { let l = 0, c = 0, out = "";
    (function type() {
      if (l >= lines.length) return;
      if (c < lines[l].length) { out += lines[l][c++]; term.textContent = out; setTimeout(type, 55); }
      else { out += "\n"; l++; c = 0; setTimeout(type, 380); }
    })(); }

  // Scroll reveal + progress bars
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    $$("[data-w]", e.target).forEach(b => b.style.width = b.dataset.w + "%");
    io.unobserve(e.target);
  }), { threshold: .2 });
  $$(".reveal").forEach(el => io.observe(el));

  // Quiz (demo data)
  const Q = [
    { q: "What does HTML stand for?", o: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Management Language", "Home Tool Markup Language"], a: 0,
      e: "HTML is HyperText Markup Language: it describes the structure of a web page." },
    { q: "Which keyword defines a function in Python?", o: ["func", "def", "function", "lambda only"], a: 1,
      e: "Python uses def to define a function." }];
  let qi = 0, score = 0, pick = null, done = false;
  const qo = $("#qopts"), fb = $("#qfb"), sub = $("#qsubmit"), nxt = $("#qnext");
  function render() {
    const x = Q[qi]; pick = null; done = false; fb.textContent = ""; nxt.hidden = true; sub.hidden = false;
    $("#qtext").textContent = x.q; $("#qcount").textContent = `Question ${qi + 1} of ${Q.length}`;
    $("#qbar").style.width = ((qi + 1) / Q.length * 100) + "%";
    qo.innerHTML = "";
    x.o.forEach((t, i) => { const b = document.createElement("button");
      b.className = "opt"; b.setAttribute("role", "radio"); b.setAttribute("aria-checked", false);
      b.textContent = "ABCD"[i] + ". " + t;
      b.onclick = () => { if (done) return; pick = i; $$(".opt", qo).forEach((o, j) => o.setAttribute("aria-checked", j === i)); };
      qo.append(b); });
  }
  sub.onclick = () => {
    if (done) return;
    if (pick === null) { fb.textContent = "Select an answer first."; return; }
    done = true; const x = Q[qi], ok = pick === x.a; if (ok) score++;
    $$(".opt", qo).forEach((o, j) => o.classList.add(j === x.a ? "ok" : "no"));
    fb.textContent = (ok ? "Correct. " : "Not quite. ") + x.e; $("#qscore").textContent = "Score " + score;
    sub.hidden = true; nxt.hidden = false; nxt.textContent = qi < Q.length - 1 ? "Next question" : "Restart quiz";
  };
  nxt.onclick = () => { if (qi < Q.length - 1) qi++; else { qi = 0; score = 0; $("#qscore").textContent = "Score 0"; } render(); };
  render();

  // Code runner (simulated)
  $("#run").onclick = () => $("#out").textContent = "Odd";
  $("#reset").onclick = () => $("#out").textContent = "—";

  // Resource filter
  const q = $("#q"), lvl = $("#lvl"), cards = $$("#res .res");
  function filter() {
    const t = q.value.toLowerCase().trim(); let n = 0;
    cards.forEach(c => { const show = c.dataset.t.includes(t) && (!lvl.value || c.dataset.l === lvl.value); c.hidden = !show; n += show; });
    $("#empty").hidden = n > 0;
  }
  q.oninput = lvl.onchange = filter;

  // Assistant (canned demo replies — connect a real backend later)
  const chat = $("#chat"), fab = $("#fab"), log = $("#log");
  const toggle = open => { chat.hidden = !open; fab.setAttribute("aria-expanded", open); };
  fab.onclick = () => toggle(chat.hidden); $("#chat-x").onclick = () => toggle(false); $("#open-chat").onclick = () => toggle(true);
  document.addEventListener("keydown", e => e.key === "Escape" && toggle(false));
  const R = {
    "Explain this concept": "Start with the idea in one sentence, then see it in code. Tell me the topic and I'll break it down.",
    "Generate examples": "Example: for i in range(3): print(i) prints 0, 1, 2.",
    "Debug my code": "Paste your code and the error message. I'll point to the line and explain the cause.",
    "Create quiz": "Quiz: what does len([4, 5, 6]) return? (Answer: 3)",
    "Give hints": "Hint: try the smallest input first and trace each step by hand.",
    "Summarize lesson": "Open a lesson and I'll list its three key ideas and one exercise.",
    "Practice questions": "Write a function that returns the largest number in a list."
  };
  $$("#chips button").forEach(b => b.onclick = () => {
    const m = document.createElement("p"); m.className = "me"; m.textContent = b.textContent;
    const r = document.createElement("p"); r.className = "bot"; r.textContent = R[b.textContent] + " (demo reply)";
    log.append(m, r); log.scrollTop = log.scrollHeight;
  });
})();
