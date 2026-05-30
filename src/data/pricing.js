// Approximate Microsoft Entra pricing per component (USD, list price).
// Source: microsoft.com/security/business/microsoft-entra-pricing (Oct 2025).
// Values are PUBLIC LIST PRICES — actual customer pricing may differ
// (EA discounts, sovereign clouds, MSP rates).
//
// `unit` is the metering unit for that component.
// `note` is shown as a tooltip / inline qualifier.

export const PRICING = {
  // ── Entra ID SKUs ─────────────────────────────────────────────────────────
  'users':                  { usd: 0,    unit: 'free',           note: 'Entra ID Free tier' },
  'groups':                 { usd: 0,    unit: 'free',           note: 'Incluido en Entra ID Free' },
  'admin-units':            { usd: 6,    unit: 'user/month',     note: 'Requiere Entra ID P1 ($6 PUPM)' },
  'custom-attributes':      { usd: 6,    unit: 'user/month',     note: 'Requiere Entra ID P1' },

  // Access & Auth — la mayoría incluidos en P1; CAE/Token/Auth Strengths/Passkeys son free
  'conditional-access':     { usd: 6,    unit: 'user/month',     note: 'Entra ID P1 (incluye CA básico)' },
  'mfa':                    { usd: 6,    unit: 'user/month',     note: 'Entra ID P1 (legacy per-user MFA en M365 también incluye)' },
  'auth-methods':           { usd: 0,    unit: 'incluido',       note: 'Policy gratis, métodos según SKU' },
  'passkeys':               { usd: 0,    unit: 'incluido',       note: 'FIDO2/Passkey/WHfB sin costo' },
  'auth-strengths':         { usd: 0,    unit: 'incluido',       note: 'Incluido en cualquier SKU con CA' },
  'cae':                    { usd: 0,    unit: 'incluido',       note: 'CAE automático en M365/Graph' },
  'token-protection':       { usd: 9,    unit: 'user/month',     note: 'Token Protection requiere Entra ID P2' },
  'named-locations':        { usd: 0,    unit: 'incluido',       note: 'Free con CA' },

  // Governance — mix de P2 y suite governance
  'pim':                    { usd: 9,    unit: 'user/month',     note: 'Entra ID P2 ($9 PUPM)' },
  'entitlement-mgmt':       { usd: 7,    unit: 'user/month',     note: 'Entra ID Governance addon ($7 PUPM)' },
  'access-reviews':         { usd: 9,    unit: 'user/month',     note: 'Entra ID P2 o Governance' },
  'lifecycle-workflows':    { usd: 7,    unit: 'user/month',     note: 'Entra ID Governance addon' },
  'cross-tenant-sync':      { usd: 6,    unit: 'user/month',     note: 'Entra ID P1' },

  // Protection
  'identity-protection':    { usd: 9,    unit: 'user/month',     note: 'Entra ID P2' },
  'sign-in-logs':           { usd: 0,    unit: 'free 7d / paid', note: '7 días gratis; Log Analytics ~$2.50/GB' },
  'risk-policies':          { usd: 9,    unit: 'user/month',     note: 'Risk-based CA requiere P2' },

  // Workload Identities
  'app-registrations':      { usd: 0,    unit: 'free',           note: 'App Registration no se cobra' },
  'service-principals':     { usd: 0,    unit: 'free',           note: 'SPs gratis; tokens cuentan vs Graph API throttling' },
  'managed-identities':     { usd: 0,    unit: 'free',           note: 'MI gratis, sin Workload ID Premium aplicado' },
  'workload-id-premium':    { usd: 3,    unit: 'SP/month',       note: 'Workload Identities Premium ($3 per SP/month)' },

  // External
  'b2b':                    { usd: 0,    unit: 'first 50k MAU',  note: 'External ID free hasta 50k MAU; ~$0.0325/MAU después' },
  'external-id':            { usd: 0,    unit: 'first 50k MAU',  note: 'CIAM: 50k MAU free, después $0.0325/MAU' },
  'verified-id':            { usd: 0,    unit: 'preview/free',   note: 'GA gratis para emisor + verifier (Sept 2025)' },
  'cross-tenant-access':    { usd: 0,    unit: 'incluido',       note: 'Configuration free; trust de MFA/Device requiere P1 en ambos' },
  'entra-connect':          { usd: 0,    unit: 'free agent',     note: 'Connect/Cloud Sync agent gratis' },

  // Network · Global Secure Access (Entra Suite)
  'global-secure-access':   { usd: 9,    unit: 'user/month',     note: 'GSA Internet+Private en Entra Suite ($12 PUPM bundle)' },
  'internet-access':        { usd: 4,    unit: 'user/month',     note: 'Internet Access standalone ~$4 PUPM' },
  'private-access':         { usd: 5,    unit: 'user/month',     note: 'Private Access standalone ~$5 PUPM' },

  // Ecosystem
  'intune':                 { usd: 8,    unit: 'user/month',     note: 'Intune Plan 1 ($8 PUPM); EMS E5 incluye' },
  'defender-identity':      { usd: 5.20, unit: 'user/month',     note: 'Defender for Identity ($5.20 PUPM); EMS E5 incluye' },
  'purview':                { usd: 12,   unit: 'user/month',     note: 'Purview compliance suite ~$12 PUPM (E5 Compliance addon)' },
  'sentinel':               { usd: 2.46, unit: 'GB ingested',    note: 'Sentinel ~$2.46/GB Pay-As-You-Go; commitment tiers más barato' },

  // Security Copilot platform + agents
  'security-copilot':       { usd: 4,    unit: 'SCU/hour',       note: '$4/hour por Security Compute Unit (SCU); ~$3k/mes baseline' },
  'agent-ca-optim':         { usd: 0,    unit: 'incluido',       note: 'Incluido en Security Copilot allocation' },
  'agent-risky-user':       { usd: 0,    unit: 'incluido',       note: 'Incluido en Security Copilot allocation' },
  'agent-access-review':    { usd: 0,    unit: 'incluido',       note: 'Incluido en Security Copilot allocation' },
  'agent-app-lifecycle':    { usd: 0,    unit: 'incluido',       note: 'Incluido en Security Copilot allocation' }
}

// Helper: formatted price string for badges
export function formatPrice(id) {
  const p = PRICING[id]
  if (!p) return null
  if (p.usd === 0) {
    return { label: 'FREE', detail: p.unit, full: p.note, color: '#067647' }
  }
  const decimals = p.usd < 5 ? 2 : 0
  return {
    label: `$${p.usd.toFixed(decimals)}`,
    detail: p.unit,
    full: p.note,
    color: p.usd >= 9 ? '#B42318' : p.usd >= 5 ? '#B54708' : '#067647'
  }
}
