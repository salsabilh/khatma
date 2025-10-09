const leftGrid = document.getElementById("leftGrid");
const rightGrid = document.getElementById("rightGrid");

// Load saved progress from localStorage
let savedProgress = JSON.parse(localStorage.getItem("khatmaProgress")) || {};

function createBoxes(grid, start, end) {
  for (let i = start; i <= end; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = `الحزب ${i}`;

    // Restore saved state
    if (savedProgress[i]) {
      box.classList.add("completed");
    }

    box.addEventListener("click", () => {
      box.classList.toggle("completed");
      savedProgress[i] = box.classList.contains("completed");
      localStorage.setItem("khatmaProgress", JSON.stringify(savedProgress));
    });

    grid.appendChild(box);
  }
}

createBoxes(rightGrid, 1, 30);
createBoxes(leftGrid, 31, 60);


// Reset all progress
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all progress?")) {
    localStorage.removeItem("khatmaProgress");
    document.querySelectorAll(".box").forEach(box => box.classList.remove("completed"));
  }
});