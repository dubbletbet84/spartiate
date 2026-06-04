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

  // Overlay sombre
  const overlay = document.createElement('div');
  overlay.id = 'mobile-overlay';
  document.body.appendChild(overlay);

  // Données utilisateur
  const email  = localStorage.getItem('user_email');
  const prenom = localStorage.getItem('user_prenom');
  const abo    = localStorage.getItem('user_abonnement') || '';

  // Drawer latéral
  const drawer = document.createElement('div');
  drawer.id = 'mobile-menu';

  const userBlock = email ? `
    <div style="padding:1.2rem 1.5rem 1rem; border-bottom:1px solid rgba(255,255,255,.1); margin-bottom:.5rem;">
      <p style="color:#94A3B8; font-size:.72rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:.3rem;">Connecté en tant que</p>
      <p style="color:#fff; font-weight:800; font-size:1rem;">${prenom || email}</p>
      ${abo && abo !== 'aucun' ? `<p style="color:var(--red); font-size:.78rem; font-weight:700; margin-top:.2rem;">Abonnement ${abo}</p>` : ''}
    </div>` : '';

  const authLinks = email ? `
      <a href="dashboard.html">⚡ Mon Dashboard</a>
      <a href="#" id="mobile-logout" style="color:#FCA5A5 !important; margin-top:.5rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Déconnexion
      </a>` : `
      <a href="login.html" style="background:var(--red); text-align:center;">Se Connecter</a>`;

  drawer.innerHTML = `
    ${userBlock}
    <nav>
      <a href="index.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:8px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Accueil
      </a>
      <a href="historique.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:8px;"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>
        Historique
      </a>
      <a href="affiliation.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:8px;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        Partenaires
      </a>
      ${authLinks}
    </nav>
  `;
  document.body.appendChild(drawer);

  // Déconnexion
  const logoutBtn = drawer.querySelector('#mobile-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = 'index.html';
    });
  }

  function openMenu()  { btn.classList.add('open');    drawer.classList.add('open');    overlay.classList.add('open'); }
  function closeMenu() { btn.classList.remove('open'); drawer.classList.remove('open'); overlay.classList.remove('open'); }

  btn.addEventListener('click', () => drawer.classList.contains('open') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);
  drawer.querySelectorAll('a:not(#mobile-logout)').forEach(a => a.addEventListener('click', closeMenu));
})();
