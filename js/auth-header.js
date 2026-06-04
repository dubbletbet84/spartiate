// ── Auth Header : remplace "Se Connecter" si connecté ──
(function () {
  const btn = document.getElementById('header-auth-btn');
  if (!btn) return;
  const email  = localStorage.getItem('user_email');
  if (!email) return;
  const prenom     = localStorage.getItem('user_prenom') || '';
  const prenomOnly = prenom.split(' ')[0] || email;
  const abo        = localStorage.getItem('user_abonnement') || '';

  const aboLabels = {
    safe_fun: 'VIP', groupe_gestion: 'Groupe Gestion',
    high_cotes: 'High Cotes', all_inclusive: 'All Inclusive',
    spartiate_starter: 'VIP', spartiate_vip: 'VIP',
    spartiate_pro: 'Groupe Gestion', spartiate_gestion: 'Groupe Gestion',
    aucun: 'Aucun abonnement'
  };
  const aboLabel = aboLabels[abo] || abo.replace(/_/g, ' ');

  const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

  // Transformer le lien en bouton avec dropdown
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:relative; display:inline-block;';

  const newBtn = document.createElement('button');
  newBtn.innerHTML = icon + prenomOnly;
  newBtn.style.cssText = btn.getAttribute('style') || '';
  newBtn.className = btn.className;
  newBtn.style.background = 'var(--green)';
  newBtn.style.borderColor = 'var(--green)';
  newBtn.style.cursor = 'pointer';
  newBtn.style.border = 'none';
  newBtn.style.color = '#fff';
  newBtn.style.fontWeight = '700';
  newBtn.style.fontSize = '.85rem';
  newBtn.style.padding = '.5rem 1.1rem';
  newBtn.style.borderRadius = '6px';

  const dropdown = document.createElement('div');
  dropdown.style.cssText = `
    display:none; position:absolute; top:calc(100% + 8px); right:0;
    background:#fff; border:1px solid #E2E8F0; border-radius:12px;
    box-shadow:0 8px 30px rgba(0,0,0,.12); min-width:240px; z-index:500; overflow:hidden;
  `;
  dropdown.innerHTML = `
    <div style="padding:1rem 1.2rem; border-bottom:1px solid #F1F5F9; background:#F8FAFC;">
      <p style="font-weight:800; color:#1E3A8A; font-size:.95rem;">${prenomOnly}</p>
      <p style="font-size:.78rem; color:#94A3B8; margin-top:.2rem;">${email}</p>
      ${aboLabel ? `<p style="font-size:.78rem; color:#CC1414; font-weight:700; margin-top:.2rem;">Abonnement ${aboLabel}</p>` : ''}
    </div>
    <div style="padding:.5rem;">
      <a href="dashboard.html" style="display:flex; align-items:center; gap:.6rem; padding:.7rem 1rem; border-radius:8px; color:#1E3A8A; font-weight:700; font-size:.85rem; text-decoration:none; transition:background .15s;">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Mon Dashboard
      </a>
      <button id="auth-delete-btn" style="display:flex; align-items:center; gap:.6rem; width:100%; background:none; border:none; padding:.7rem 1rem; border-radius:8px; color:#DC2626; font-weight:700; font-size:.85rem; cursor:pointer; transition:background .15s; text-align:left;">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        Supprimer mon compte
      </button>
      <button id="auth-logout-btn" style="display:flex; align-items:center; gap:.6rem; width:100%; background:none; border:none; padding:.7rem 1rem; border-radius:8px; color:#64748B; font-weight:700; font-size:.85rem; cursor:pointer; transition:background .15s; text-align:left;">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Déconnexion
      </button>
    </div>
  `;

  wrapper.appendChild(newBtn);
  wrapper.appendChild(dropdown);
  btn.replaceWith(wrapper);

  // Toggle dropdown
  newBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });
  document.addEventListener('click', () => { dropdown.style.display = 'none'; });

  // Déconnexion
  dropdown.querySelector('#auth-logout-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
  });

  // Suppression de compte
  dropdown.querySelector('#auth-delete-btn').addEventListener('click', async () => {
    dropdown.style.display = 'none';
    const confirmed = confirm('⚠️ Supprimer définitivement votre compte ?\n\nToutes vos données seront effacées. Cette action est irréversible.');
    if (!confirmed) return;
    const { error } = await supa.from('clients').delete().eq('email', email);
    if (error) { alert('Erreur : ' + error.message); return; }
    localStorage.clear();
    alert('Votre compte a bien été supprimé. À bientôt !');
    window.location.href = 'index.html';
  });
})();
