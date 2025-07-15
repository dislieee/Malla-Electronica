document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
  const estados = JSON.parse(localStorage.getItem("estadosRamos")) || {};
  const salvar = () => localStorage.setItem("estadosRamos", JSON.stringify(estados));

  const update = () => {
    ramos.forEach(btn => {
      const nombre = btn.dataset.nombre;
      const req = btn.dataset.requiere?.split(",") || [];
      const aprob = estados[nombre] === true;
      const bloqueado = !aprob && !req.every(r => estados[r]);
      btn.classList.toggle("approved", aprob);
      btn.classList.toggle("locked", bloqueado);
      btn.disabled = bloqueado;
    });
  };

  ramos.forEach(btn =>
    btn.addEventListener("click", () => {
      const nm = btn.dataset.nombre;
      if (btn.classList.contains("locked")) return;
      estados[nm] = !estados[nm];
      salvar();
      update();
    })
  );

  update();
});
