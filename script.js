const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const doneEl = document.getElementById("done");
const leftEl = document.getElementById("left");
const streakEl = document.getElementById("streak");
const leftGrid = document.getElementById("leftGrid");
const rightGrid = document.getElementById("rightGrid");

// Load saved progress from localStorage
let savedProgress = JSON.parse(localStorage.getItem("khatmaProgress")) || {};

function createBoxes(grid, start, end) {
  for (let i = start; i <= end; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = `الحزب ${i}`;

    function updateProgress() {
  const total = 60;
  const completed = Object.values(savedProgress).filter(v => v).length;

  const percent = Math.round((completed / total) * 100);

  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "% completed";

  doneEl.textContent = completed;
  leftEl.textContent = total - completed;
}

    // Restore saved state
    if (savedProgress[i]) {
      box.classList.add("completed");
    }

   box.addEventListener("click", () => {
  box.classList.toggle("completed");

  savedProgress[i] = box.classList.contains("completed");
  localStorage.setItem("khatmaProgress", JSON.stringify(savedProgress));

  updateProgress();   // 🔥 NEW
  updateStreak();     // 🔥 NEW
});

    grid.appendChild(box);
  }
}

createBoxes(rightGrid, 1, 30);
createBoxes(leftGrid, 31, 60);

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

// Reset all progress
resetBtn.addEventListener("click", () => {
  if (confirm("هل أنت متأكد أنك تريد إعادة تعيين كافة التقدم؟")) {
    localStorage.removeItem("khatmaProgress");
    document.querySelectorAll(".box").forEach(box => box.classList.remove("completed"));
  }
});
