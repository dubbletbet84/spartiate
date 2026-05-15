const express = require('express');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app  = express();
const supa = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ── Webhook Stripe (raw body obligatoire pour la vérification de signature) ──
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('❌ Signature Stripe invalide :', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const refId   = session.client_reference_id; // format : "email|plan"

    if (refId && refId.includes('|')) {
      const [email, plan] = refId.split('|');

      const { error } = await supa
        .from('clients')
        .update({ paiement: true, abonnement: plan })
        .eq('email', email);

      if (error) {
        console.error('❌ Erreur Supabase :', error.message);
      } else {
        console.log(`✅ Compte activé : ${email} → ${plan}`);
      }
    } else {
      console.warn('⚠️ client_reference_id manquant ou mal formaté :', refId);
    }
  }

  res.json({ received: true });
});

// ── Fichiers statiques ──
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ── Fallback (toutes les routes HTML) ──
app.get('*', (req, res) => {
  const file = req.path.endsWith('.html') ? req.path.slice(1) : 'index.html';
  const full = path.join(__dirname, file);
  res.sendFile(full, err => {
    if (err) res.sendFile(path.join(__dirname, 'index.html'));
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 SPARTIATE server running on port ${PORT}`));
