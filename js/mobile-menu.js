// ── Menu hamburger mobile ──
(function () {
  const inner = document.querySelector('.header-inner');
  if (!inner) return;

  // Créer le bouton hamburger
  const btn = document.createElement('button');
  btn.id = 'hamburger';
  btn.setAttribute('aria-label', 'Menu');
  btn.innerHTML = `<span></span><span></span><span></span>`;
  inner.appendChild(btn);

  // Créer l'overlay menu
  const overlay = document.createElement('div');
  overlay.id = 'mobile-menu';
  overlay.innerHTML = `
    <nav>
      <a href="index.html">🏠 Accueil</a>
      <a href="historique.html">📊 Historique</a>
      <a href="affiliation.html">🤝 Partenaires</a>
      <a href="dashboard.html">⚡ Mon Dashboard</a>
      <a href="login.html" id="mobile-auth-link">Se Connecter</a>
    </nav>
  `;
  document.body.appendChild(overlay);

  // Si connecté → adapter le lien
  const email = localStorage.getItem('user_email');
  const prenom = localStorage.getItem('user_prenom');
  if (email) {
    const authLink = overlay.querySelector('#mobile-auth-link');
    if (authLink) {
      authLink.textContent = prenom ? '👤 ' + prenom : 'Mon Dashboard';
      authLink.href = 'dashboard.html';
    }
  }

  // Toggle menu
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Fermer en cliquant un lien
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
})();
