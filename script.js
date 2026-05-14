const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const doneEl = document.getElementById("done");
const leftEl = document.getElementById("left");
const streakEl = document.getElementById("streak");
const leftGrid = document.getElementById("leftGrid");
const rightGrid = document.getElementById("rightGrid");

// Load saved progress from localStorage
let savedProgress = JSON.parse(localStorage.getItem("khatmaProgress")) || {};

// ─── Motivational Phrases (shown after each hizb) ────────────────────────────
const hizbPhrases = [
  "أحسنت! حزب أكمله لسانك، ونور يكتبه ربك ",
  "ما شاء الله، خطوة نحو الله وخطوات نحو الجنة ",
  "بارك الله في همتك، واصل فإن الله مع الصابرين ",
  "قلبك يتلو، والملائكة تستمع وتدعو لك ",
  "كل حزب تُكمله هو بذرة نور في قلبك ",
  "ما أجمل أن يكون يومك مع كلام الله ",
  "الله يراك وأنت تجاهد نفسك، فلا تتوقف ",
  "واصل، فإن لكل آية نورًا يسكن القلب ",
  "همتك عالية، ودعاؤك مستجاب إن شاء الله ",
  "رزقك الله الإتمام والقبول والبركة ",
  "كل صفحة من القرآن تُنير شيئًا في قلبك لا يراه أحد.",
  "ابدأ ولو بآية… فالقليل الدائم أحب إلى الله.",
  "القرآن ليس واجبًا يوميًا فقط، بل راحةٌ للروح.",
  "حين تضيق بك الدنيا، افتح المصحف وستجد السكينة.",
  "لا تؤجل وردك… فربما كانت آية اليوم سبب طمأنينتك.",
  "مع كل حرف تقرؤه، تُكتب لك حسنات لا تضيع.",
  "القرآن يُرتب الفوضى التي بداخلك دون أن تشعر.",
  "اجعل للقرآن وقتًا ثابتًا، وسترى كيف تتغير أيامك.",
  "ليس المهم أن تنهي بسرعة، المهم أن يعيش القرآن في قلبك.",
  "كل يوم مع القرآن… خطوة أقرب إلى الله.",
  "القرآن صديق لا يتركك في أوقات التعب.",
  "اقرأ القرآن وكأن الله يُطمئن قلبك بكل آية.",
  "دقائق مع القرآن قد تغيّر يومًا كاملًا.",
  "القرآن شفاء للقلوب قبل أن يكون تلاوة بالألسن.",
  "حتى إن تعبت، لا تترك مصحفك وحيدًا.",
  "وردك اليومي هو استثمارك الحقيقي للآخرة.",
  "من أحب القرآن، أحبّه الله وشرح صدره.",
  "كل ختمة تبدأ بصفحة… فلا تستصغر البداية.",
  "اقرأ لتطمئن، اقرأ لتُجبر، اقرأ لتقترب.",
  "القرآن نور… ومن سار مع النور لا يضيع.",
  "وردك اليوم = راحة قلبك ",
  "لا تنسَ نصيب روحك من القرآن ",
  "آية اليوم… قد تكون نجاتك.",
  "اختم الدنيا بالقرآن قبل أن تختمك الدنيا.",
  "دائمًا هناك طمأنينة تنتظرك بين صفحات المصحف.",
  "اقرأ… فالقلب يصدأ والقرآن جلاؤه.",
  "حتى الصفحة الواحدة تصنع فرقًا.",
  "مع القرآن… الحياة أخف.",
  "لا تترك يومك يمر بلا قرآن.",
  "القرآن حياة لمن أراد الحياة.",
];

// ─── Khatma Congratulations Phrases ─────────────────────────────────────────
const khatmaPhrases = [
  "مبروك! أتممت ختمة القرآن الكريم 🎉",
  "اللهم تقبّل منا واجعله نورًا لنا في الدنيا والآخرة 🤲",
  "من ختم القرآن فقد أدرك خيرًا عظيمًا — هنيئًا لكِ هذا الفوز 💙",
  "اللهم اجعل القرآن ربيع قلبها وجلاء حزنها 🌿",
];

// ─── Show Toast (motivational message) ───────────────────────────────────────
function showToast(message) {
  // Close modal first, then show toast above everything
  closeModal();
  setTimeout(() => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4500);
  }, 350);
}

// ─── Show Khatma Popup ────────────────────────────────────────────────────────
function showKhatmaPopup() {
  const overlay = document.getElementById("khatmaModal");
  const textEl = document.getElementById("khatmaText");
  // Pick 2 random phrases to combine
  const line1 = khatmaPhrases[0];
  const line2 = khatmaPhrases[Math.floor(Math.random() * (khatmaPhrases.length - 1)) + 1];
  textEl.innerHTML = `<p>${line1}</p><p>${line2}</p>`;
  overlay.style.display = "flex";
}

function closeKhatmaModal() {
  document.getElementById("khatmaModal").style.display = "none";
}

// ─── Check if all 60 hizbs are done ──────────────────────────────────────────
function checkKhatmaComplete() {
  const total = 60;
  const completed = Object.keys(savedProgress).filter(k => {
    const p = savedProgress[k];
    if (typeof p === "boolean") return p;
    return p && p.athman && p.athman.every(v => v);
  }).length;
  if (completed === total) {
    setTimeout(() => showKhatmaPopup(), 600);
  }
}

// ─── Hizb boundaries data ───────────────────────────────────────────────────
const hizbData = {
  1:  { start: "الفاتحة 1",     end: "البقرة 74" },
  2:  { start: "البقرة 75",     end: "البقرة 140" },
  3:  { start: "البقرة 141",    end: "البقرة 200" },
  4:  { start: "البقرة 201",    end: "البقرة 250" },
  5:  { start: "البقرة 251",    end: "آل عمران 14" },
  6:  { start: "آل عمران 15",  end: "آل عمران 90" },
  7:  { start: "آل عمران 93",  end: "آل عمران 170" },
  8:  { start: "آل عمران 171", end: "النساء 23" },
  9:  { start: "النساء 24",     end: "النساء 85" },
  10: { start: "النساء 86",     end: "النساء 146" },
  11: { start: "النساء 147",    end: "المائدة 24" },
  12: { start: "المائدة 25",    end: "المائدة 83" },
  13: { start: "المائدة 82",    end: "الأنعام 36" },
  14: { start: "الأنعام 37",    end: "الأنعام 111" },
  15: { start: "الأنعام 111",   end: "الأعراف 3" },
  16: { start: "الأعراف 4",     end: "الأعراف 86" },
  17: { start: "الأعراف 87",    end: "الأعراف 170" },
  18: { start: "الأعراف 171",   end: "الأنفال 40" },
  19: { start: "الأنفال 41",    end: "التوبة 33" },
  20: { start: "التوبة 34",     end: "التوبة 93" },
  21: { start: "التوبة 94",     end: "يونس 25" },
  22: { start: "يونس 26",       end: "هود 5" },
  23: { start: "هود 6",         end: "هود 82" },
  24: { start: "هود 83",        end: "يوسف 52" },
  25: { start: "يوسف 53",       end: "الرعد 20" },
  26: { start: "الرعد 21",      end: "إبراهيم 52" },
  27: { start: "الحجر 1",       end: "النحل 50" },
  28: { start: "النحل 51",      end: "النحل 128" },
  29: { start: "الإسراء 1",     end: "الإسراء 98" },
  30: { start: "الإسراء 99",    end: "الكهف 73" },
  31: { start: "الكهف 74",      end: "مريم 99" },
  32: { start: "طه 1",          end: "طه 134" },
  33: { start: "الأنبياء 1",    end: "الأنبياء 111" },
  34: { start: "الحج 1",        end: "الحج 76" },
  35: { start: "المؤمنون 1",    end: "النور 20" },
  36: { start: "النور 21",      end: "الفرقان 20" },
  37: { start: "الفرقان 21",    end: "الشعراء 110" },
  38: { start: "الشعراء 111",   end: "النمل 57" },
  39: { start: "النمل 58",      end: "القصص 50" },
  40: { start: "القصص 51",      end: "العنكبوت 45" },
  41: { start: "العنكبوت 46",   end: "لقمان 20" },
  42: { start: "لقمان 21",      end: "الأحزاب 30" },
  43: { start: "الأحزاب 31",    end: "سبأ 23" },
  44: { start: "سبأ 24",        end: "ياسين 27" },
  45: { start: "ياسين 28",      end: "الصافات 144" },
  46: { start: "الصافات 145",   end: "الزمر 30" },
  47: { start: "الزمر 31",      end: "غافر 40" },
  48: { start: "غافر 41",       end: "فصلت 45" },
  49: { start: "فصلت 46",       end: "الزخرف 22" },
  50: { start: "الزخرف 23",     end: "الجاثية 36" },
  51: { start: "الأحقاف 1",     end: "الفتح 17" },
  52: { start: "الفتح 18",      end: "الذاريات 30" },
  53: { start: "الذاريات 31",   end: "القمر 55" },
  54: { start: "الرحمن 1",      end: "الحديد 28" },
  55: { start: "المجادلة 1",    end: "الصف 14" },
  56: { start: "الجمعة 1",      end: "التحريم 12" },
  57: { start: "الملك 1",       end: "نوح 30" },
  58: { start: "الجن 1",        end: "المرسلات 50" },
  59: { start: "النبأ 1",       end: "الطارق 17" },
  60: { start: "الأعلى 1",      end: "الناس 6" },
};

// ─── Progress bar ─────────────────────────────────────────────────────────────
function updateProgress() {
  const total = 60;
  const completed = Object.keys(savedProgress).filter(k => {
    const p = savedProgress[k];
    if (typeof p === "boolean") return p;
    return p && p.athman && p.athman.every(v => v);
  }).length;

  const percent = Math.round((completed / total) * 100);
  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "% مكتمل";
  doneEl.textContent = completed;
  leftEl.textContent = total - completed;
}

// ─── Streak ──────────────────────────────────────────────────────────────────
function updateStreak() {
  let streak = parseInt(localStorage.getItem("streak")) || 0;
  let lastDate = localStorage.getItem("lastDate");
  const today = new Date().toDateString();

  if (lastDate !== today) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastDate", today);
  }

  streakEl.textContent = streak;
}

// ─── Create hizb boxes ───────────────────────────────────────────────────────
function createBoxes(grid, start, end) {
  for (let i = start; i <= end; i++) {
    const box = document.createElement("div");
    box.classList.add("box");

    box.innerHTML = `
  <span class="box-num">${i}</span>
  <div class="box-info">
    <span class="box-title">الحزب ${i}</span>
    <span class="box-range">${hizbData[i].start} — ${hizbData[i].end}</span>
  </div>
`;

    const prog = savedProgress[i];
    const isCompleted =
      (typeof prog === "boolean" && prog) ||
      (prog && prog.athman && prog.athman.every(v => v));

    if (isCompleted) box.classList.add("completed");

    box.addEventListener("click", () => {
      openModal(i, box);
    });

    grid.appendChild(box);
  }
}

createBoxes(rightGrid, 1, 30);
createBoxes(leftGrid, 31, 60);

// ─── Modal ───────────────────────────────────────────────────────────────────
let activeBox = null;

function openModal(hizbNum, boxEl) {
  activeBox = boxEl;
  const data = hizbData[hizbNum];

  document.getElementById("modalTitle").textContent = `الحزب ${hizbNum}`;
  document.getElementById("modalRange").textContent = `${data.start} ← ${data.end}`;

  if (!savedProgress[hizbNum] || typeof savedProgress[hizbNum] === "boolean") {
    const wasCompleted = savedProgress[hizbNum] === true;
    savedProgress[hizbNum] = { athman: Array(8).fill(wasCompleted) };
  }

  const list = document.getElementById("athmanList");
  list.innerHTML = "";

  // Master checkbox
  const masterItem = document.createElement("label");
  masterItem.classList.add("thumn-item", "thumn-master");
  const allDoneAlready = savedProgress[hizbNum].athman.every(v => v);
  if (allDoneAlready) masterItem.classList.add("thumn-done");
  masterItem.innerHTML = `
    <input type="checkbox" ${allDoneAlready ? "checked" : ""} />
    <strong>إتمام الحزب كاملاً</strong>
  `;
  masterItem.querySelector("input").addEventListener("change", (e) => {
    const val = e.target.checked;
    savedProgress[hizbNum].athman = Array(8).fill(val);
    localStorage.setItem("khatmaProgress", JSON.stringify(savedProgress));
    activeBox.classList.toggle("completed", val);
    updateProgress();
    if (val) {
      updateStreak();
      // Show motivational toast
      const phrase = hizbPhrases[Math.floor(Math.random() * hizbPhrases.length)];
      showToast(phrase);
      // Check if all done
      checkKhatmaComplete();
    }
    openModal(hizbNum, activeBox);
  });
  list.appendChild(masterItem);

  const divider = document.createElement("hr");
  divider.style.cssText = "border:none; border-top:1px solid #ddd; margin:4px 0";
  list.appendChild(divider);

  // Individual athman
  for (let t = 0; t < 8; t++) {
    const checked = savedProgress[hizbNum].athman[t];
    const item = document.createElement("label");
    item.classList.add("thumn-item");
    if (checked) item.classList.add("thumn-done");

    item.innerHTML = `
      <input type="checkbox" ${checked ? "checked" : ""} />
      الثمن ${t + 1}
    `;

    item.querySelector("input").addEventListener("change", (e) => {
      savedProgress[hizbNum].athman[t] = e.target.checked;
      item.classList.toggle("thumn-done", e.target.checked);
      localStorage.setItem("khatmaProgress", JSON.stringify(savedProgress));

      const allDone = savedProgress[hizbNum].athman.every(v => v);
      activeBox.classList.toggle("completed", allDone);
      updateProgress();

      if (allDone) {
        updateStreak();
        // Show motivational toast
        const phrase = hizbPhrases[Math.floor(Math.random() * hizbPhrases.length)];
        showToast(phrase);
        // Check if all 60 done
        checkKhatmaComplete();
      }

      const masterCheckbox = list.querySelector(".thumn-master input");
      if (masterCheckbox) masterCheckbox.checked = allDone;
      const masterLabel = list.querySelector(".thumn-master");
      if (masterLabel) masterLabel.classList.toggle("thumn-done", allDone);
    });

    list.appendChild(item);
  }

  document.getElementById("athmanModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("athmanModal").style.display = "none";
  activeBox = null;
}

document.getElementById("athmanModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("athmanModal")) closeModal();
});

// ─── Tabs ────────────────────────────────────────────────────────────────────
function setTab(el, name) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
}

// ─── Reset ───────────────────────────────────────────────────────────────────
resetBtn.addEventListener("click", () => {
  if (confirm("هل أنت متأكد أنك تريد إعادة تعيين كافة التقدم؟")) {
    localStorage.removeItem("khatmaProgress");
    localStorage.removeItem("streak");
    localStorage.removeItem("lastDate");
    streakEl.textContent = 0;
    savedProgress = {};
    document.querySelectorAll(".box").forEach(box => box.classList.remove("completed"));
    updateProgress();
  }
});

// ─── Init ────────────────────────────────────────────────────────────────────
updateProgress();
updateStreak();
