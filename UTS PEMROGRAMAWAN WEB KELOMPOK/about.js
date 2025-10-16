// ===== Modal Helpers
function openModal(sel){
  const m = document.querySelector(sel);
  if(!m) return;
  m.classList.add('show');
  m.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  const btn = m.querySelector('[data-close]');
  setTimeout(()=> btn && btn.focus(), 40);
}
function closeModal(sel){
  const m = document.querySelector(sel);
  if(!m) return;
  m.classList.remove('show');
  m.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

// Triggers
document.getElementById('openAboutModal')?.addEventListener('click',()=>openModal('#aboutModal'));
document.getElementById('openContactModal')?.addEventListener('click',()=>openModal('#contactModal'));

// Close buttons
document.querySelectorAll('[data-close]').forEach(btn=>{
  btn.addEventListener('click',()=>closeModal(btn.getAttribute('data-close')));
});

// Klik backdrop untuk tutup
document.querySelectorAll('.modal-backdrop').forEach(backdrop=>{
  backdrop.addEventListener('click',e=>{
    if(e.target===backdrop) closeModal('#'+backdrop.id);
  });
});

// ESC untuk tutup
window.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    document.querySelectorAll('.modal-backdrop.show').forEach(m=>closeModal('#'+m.id));
  }
});

// ===== Scroll animation untuk contact-card
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('in'); });
}, {threshold:.15});
document.querySelectorAll('.contact-card').forEach(el=>io.observe(el));
