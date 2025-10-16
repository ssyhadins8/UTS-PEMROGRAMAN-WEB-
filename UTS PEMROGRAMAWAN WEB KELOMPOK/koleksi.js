// koleksi.js — popup sederhana + animasi halus untuk kartu parfum
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".perfume-card");
  if (!cards.length) return;

  // buat elemen modal sekali
  const modal = document.createElement("div");
  modal.className = "popup";
  modal.innerHTML = `
    <div class="popup-content">
      <span class="popup-close" aria-label="Tutup">&times;</span>
      <img id="popup-img" alt="" />
      <h3 id="popup-title"></h3>
      <p id="popup-desc"></p>
    </div>
  `;
  document.body.appendChild(modal);

  // ambil elemen dalam modal
  const popupImg   = modal.querySelector("#popup-img");
  const popupTitle = modal.querySelector("#popup-title");
  const popupDesc  = modal.querySelector("#popup-desc");
  const closeBtn   = modal.querySelector(".popup-close");

  // buka popup saat kartu di-klik
  cards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const img   = card.querySelector("img")?.src || "";
      const title = card.querySelector("h3")?.textContent || "";
      const desc  = card.querySelector("p")?.textContent || "";

      popupImg.src = img;
      popupTitle.textContent = title;
      popupDesc.textContent = desc;

      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  // fungsi tutup
  function closePopup() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  // tutup melalui X, klik backdrop, atau Esc
  closeBtn.addEventListener("click", closePopup);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePopup();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closePopup();
    }
  });
});
