const firstHalf = document.getElementById("firstHalf");
const secondHalf = document.getElementById("secondHalf");
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

createBoxes(firstHalf, 1, 30);
createBoxes(secondHalf, 31, 60);

// Reset all progress
resetBtn.addEventListener("click", () => {
  if (confirm("هل أنت متأكد أنك تريد إعادة تعيين كافة التقدم؟")) {
    localStorage.removeItem("khatmaProgress");
    document.querySelectorAll(".box").forEach(box => box.classList.remove("completed"));
  }

});
