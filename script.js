const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

for (const btn of tabs) {
  btn.addEventListener("click", () => {
    // Limpiar clases
    for (const b of tabs) b.classList.remove("active");
    for (const c of contents) c.classList.remove("active");

    // Activar seleccionados
    btn.classList.add("active");
    const target = document.querySelector(
      `.tab-content[data-tab="${btn.dataset.tab}"]`,
    );
    if (target) target.classList.add("active");
  });
}
