// ── Conformité légale France ──

// ── 1. POPUP VÉRIFICATION D'ÂGE (page d'accueil uniquement) ──
(function ageGate() {
  const page = window.location.pathname;
  if (!page.endsWith('index.html') && page !== '/' && page !== '') return;
  if (localStorage.getItem('age_verified')) return;

  const overlay = document.createElement('div');
  overlay.id = 'age-gate';
  overlay.style.cssText = `
    position:fixed; top:0; left:0; right:0; bottom:0;
    background:rgba(0,0,0,.85); z-index:9999;
    display:flex; align-items:center; justify-content:center;
    padding:1rem;
  `;
  overlay.innerHTML = `
    <div style="background:#0D1B3E; border:2px solid rgba(255,255,255,.15); border-radius:16px; padding:2.5rem 2rem; max-width:420px; text-align:center;">
      <div style="font-size:3rem; margin-bottom:1rem;">⚔️</div>
      <h2 style="color:#fff; font-size:1.4rem; font-weight:900; margin-bottom:.8rem;">Accès réservé aux majeurs</h2>
      <p style="color:#94A3B8; font-size:.9rem; line-height:1.6; margin-bottom:1.5rem;">
        SPARTIATE est un service de pronostics sportifs réservé aux personnes âgées de <strong style="color:#fff;">18 ans et plus</strong>.<br><br>
        Les jeux d'argent comportent des risques. Jouez de façon responsable.
      </p>
      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
        <button id="age-yes" style="background:#CC1414; color:#fff; border:none; border-radius:8px; padding:.8rem 2rem; font-weight:800; font-size:.95rem; cursor:pointer;">
          J'ai 18 ans ou plus
        </button>
        <button id="age-no" style="background:transparent; color:#94A3B8; border:2px solid rgba(255,255,255,.2); border-radius:8px; padding:.8rem 1.5rem; font-weight:700; font-size:.88rem; cursor:pointer;">
          J'ai moins de 18 ans
        </button>
      </div>
      <p style="color:#475569; font-size:.72rem; margin-top:1rem;">
        Aide : <a href="https://www.joueurs-info-service.fr" target="_blank" rel="noopener" style="color:#64748B;">joueurs-info-service.fr</a> — 09 74 75 13 13
      </p>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById('age-yes').addEventListener('click', () => {
    localStorage.setItem('age_verified', '1');
    overlay.remove();
  });

  document.getElementById('age-no').addEventListener('click', () => {
    window.location.href = 'https://www.google.fr';
  });
})();

// ── 2. BANNIÈRE COOKIES RGPD (CNIL) ──
(function cookieBanner() {
  if (localStorage.getItem('cookie_consent')) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.style.cssText = `
    position:fixed; bottom:0; left:0; right:0;
    background:#1E293B; border-top:2px solid rgba(255,255,255,.1);
    padding:1rem 1.5rem; z-index:9998;
    display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:1rem;
  `;
  banner.innerHTML = `
    <p style="color:#CBD5E1; font-size:.82rem; line-height:1.6; max-width:700px; margin:0;">
      🍪 Nous utilisons des cookies strictement nécessaires au fonctionnement du site (session, préférences).
      Aucun cookie publicitaire n'est utilisé.
      <a href="confidentialite.html" style="color:#93C5FD; text-decoration:underline;">En savoir plus</a>
    </p>
    <div style="display:flex; gap:.7rem; flex-shrink:0;">
      <button id="cookie-accept" style="background:#CC1414; color:#fff; border:none; border-radius:6px; padding:.55rem 1.2rem; font-weight:700; font-size:.82rem; cursor:pointer;">Accepter</button>
      <button id="cookie-refuse" style="background:transparent; color:#94A3B8; border:1px solid rgba(255,255,255,.2); border-radius:6px; padding:.55rem 1rem; font-weight:700; font-size:.82rem; cursor:pointer;">Refuser</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    banner.remove();
  });
  document.getElementById('cookie-refuse').addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'refused');
    banner.remove();
  });
})();
