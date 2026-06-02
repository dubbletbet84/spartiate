// ── Auth Header : remplace "Se Connecter" si connecté ──
(function () {
  const btn = document.getElementById('header-auth-btn');
  if (!btn) return;
  const email = sessionStorage.getItem('user_email');
  if (!email) return;
  const prenom = sessionStorage.getItem('user_prenom') || '';
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  btn.innerHTML = icon + (prenom || 'Mon Dashboard');
  btn.href = 'dashboard.html';
  btn.style.background = 'var(--green)';
  btn.style.borderColor = 'var(--green)';
})();
