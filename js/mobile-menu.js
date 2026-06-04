// ── Menu hamburger mobile ──
(function () {
  const inner = document.querySelector('.header-inner');
  if (!inner) return;

  // Bouton hamburger
  const btn = document.createElement('button');
  btn.id = 'hamburger';
  btn.setAttribute('aria-label', 'Menu');
  btn.innerHTML = `<span></span><span></span><span></span>`;
  inner.appendChild(btn);

  // Overlay sombre (clic pour fermer)
  const overlay = document.createElement('div');
  overlay.id = 'mobile-overlay';
  document.body.appendChild(overlay);

  // Drawer latéral
  const drawer = document.createElement('div');
  drawer.id = 'mobile-menu';

  const email  = localStorage.getItem('user_email');
  const prenom = localStorage.getItem('user_prenom');
  const authLink = email
    ? `<a href="dashboard.html">👤 ${prenom || 'Mon Dashboard'}</a>`
    : `<a href="login.html">Se Connecter</a>`;

  drawer.innerHTML = `
    <nav>
      <a href="index.html">🏠 Accueil</a>
      <a href="historique.html">📊 Historique</a>
      <a href="affiliation.html">🤝 Partenaires</a>
      <a href="dashboard.html">⚡ Mon Dashboard</a>
      ${authLink}
    </nav>
  `;
  document.body.appendChild(drawer);

  function openMenu() {
    btn.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('open');
  }

  function closeMenu() {
    btn.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }

  btn.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Fermer en cliquant l'overlay
  overlay.addEventListener('click', closeMenu);

  // Fermer en cliquant un lien
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
})();
