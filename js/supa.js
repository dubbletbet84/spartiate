// ══════════════════════════════════════════════
//  SPARTIATE — Client Supabase partagé
//  Ce fichier est inclus UNE SEULE FOIS sur toutes les pages
// ══════════════════════════════════════════════

(function () {
  const URL = 'https://rfkishlsopgiizwwbwzp.supabase.co';
  const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJma2lzaGxzb3BnaWl6d3did3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5ODMyMDQsImV4cCI6MjA5MzU1OTIwNH0.IDf_iInryygig5LvMi5TSGSm3_EBTlhyS45DxBtqMe0';
  window.supa = supabase.createClient(URL, KEY);
})();

// ── Sanitisation HTML (protection XSS) ──
window.esc = function (str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// ── Constantes partagées ──
window.SPORT_ICON = {
  Football: '⚽', Basketball: '🏀', Tennis: '🎾',
  Rugby: '🏉', Hockey: '🏒', 'Boxe/MMA': '🥊'
};

window.CAT_BADGE = {
  Safe:    '<span class="badge badge-safe">✅ Safe</span>',
  Risqué:  '<span class="badge badge-risky">⚠️ Risqué</span>',
  Jackpot: '<span class="badge badge-jackpot">💎 Jackpot</span>',
};

window.CAT_BADGE_SM = {
  Safe:    '<span class="badge badge-safe"    style="font-size:.68rem;padding:.2rem .6rem;">Safe</span>',
  Risqué:  '<span class="badge badge-risky"   style="font-size:.68rem;padding:.2rem .6rem;">Risqué</span>',
  Jackpot: '<span class="badge badge-jackpot" style="font-size:.68rem;padding:.2rem .6rem;">Jackpot</span>',
};
