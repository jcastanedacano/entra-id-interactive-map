// Story View · canonical positions + palette for Entra ID Map
// Canvas viewBox 920×480 (with -100 y offset). 5 vertical columns by role.

export const SV_PALETTE = {
  appBg:    '#F6F7F9',
  cardBg:   '#FFFFFF',
  border:   '#E4E7EC',
  divider:  '#EEF0F3',
  ink:      '#0E1729',
  ink2:     '#475467',
  ink3:     '#98A2B3',
  selection:'#2563EB',
  cats: {
    core:       { color:'#C5377A', bg:'#FBE6EF', ring:'#9A275E', label:'Core Identity' },
    access:     { color:'#3B5DD9', bg:'#E6EAFB', ring:'#2A47B0', label:'Access & Auth' },
    governance: { color:'#0891A6', bg:'#E0F4F7', ring:'#066C7E', label:'Governance' },
    protection: { color:'#E24B4A', bg:'#FBE6E6', ring:'#A52A2A', label:'Protection' },
    workload:   { color:'#8541C5', bg:'#F0E7FA', ring:'#65329B', label:'Workload ID' },
    external:   { color:'#0F9D6A', bg:'#E6F6EE', ring:'#0A7A52', label:'External' },
    network:    { color:'#C97A14', bg:'#FBF1DE', ring:'#9A5C0A', label:'GSA' },
    ecosystem:  { color:'#6D9224', bg:'#F0F5DC', ring:'#54711A', label:'Ecosystem' }
  },
  edges: {
    data:       { color:'#0EA5C7', dash:'5 3',     label:'Data',       blurb:'Información que fluye de un componente a otro' },
    signal:     { color:'#7A4ED1', dash:'2 3',     label:'Signal',     blurb:'Telemetría / score que alimenta decisiones' },
    policy:     { color:'#E07B16', dash:null,      label:'Policy',     blurb:'Política que un componente aplica sobre otro' },
    escalation: { color:'#1F2937', dash:'8 3 2 3', label:'Escalation', blurb:'Incidente que se promueve a la siguiente capa' }
  }
}

// 5 columns × ~6 rows on a 920×480 grid.
export const SV_COMPONENTS = {
  // Col A — Core (x=90)
  'users':              { cat:'core', name:'Users', x:90, y:80, desc:'Directorio de identidades.' },
  'groups':             { cat:'core', name:'Groups', x:90, y:155, desc:'Membership para CA, EM y AR.' },
  'admin-units':        { cat:'core', name:'Admin Units', x:90, y:230, desc:'Scoped admin + scoped policies.' },
  'custom-attributes':  { cat:'core', name:'Custom Sec. Attrs', x:90, y:305, desc:'ABAC en Entra + Azure.' },
  'entra-connect':      { cat:'external', name:'Entra Connect', x:90, y:380, desc:'Sync on-prem AD → Entra.' },
  'lifecycle-workflows':{ cat:'governance', name:'Lifecycle Workflows', x:90, y:450, desc:'Joiner/Mover/Leaver.' },

  // Col B — Access + Auth (x=260)
  'conditional-access': { cat:'access', name:'Conditional Access', x:260, y:80, desc:'Policy engine Zero Trust.' },
  'mfa':                { cat:'access', name:'MFA', x:260, y:155, desc:'Segundo factor.' },
  'auth-methods':       { cat:'access', name:'Auth Methods Policy', x:260, y:230, desc:'Unified policy de métodos.' },
  'passkeys':           { cat:'access', name:'FIDO2 / Passkeys', x:260, y:305, desc:'Phishing-resistant.' },
  'auth-strengths':     { cat:'access', name:'Auth Strengths', x:260, y:380, desc:'Sets de métodos por CA.' },
  'named-locations':    { cat:'access', name:'Named Locations', x:260, y:450, desc:'Condición geo/IP.' },

  // Col C — Risk + Session (x=430)
  'identity-protection':{ cat:'protection', name:'Identity Protection', x:430, y:80, desc:'Risk scoring ML.' },
  'risk-policies':      { cat:'protection', name:'Risk-Based Policies', x:430, y:155, desc:'CA dirigida por risk.' },
  'cae':                { cat:'access', name:'CAE', x:430, y:230, desc:'Revocación near-real-time.' },
  'token-protection':   { cat:'access', name:'Token Protection', x:430, y:305, desc:'Anti-AiTM session binding.' },
  'sign-in-logs':       { cat:'protection', name:'Sign-in & Audit Logs', x:430, y:380, desc:'Telemetría base.' },

  // Col D — Governance + Workload (x=600)
  'pim':                { cat:'governance', name:'PIM', x:600, y:80, desc:'JIT para roles privilegiados.' },
  'entitlement-mgmt':   { cat:'governance', name:'Entitlement Mgmt', x:600, y:155, desc:'Access packages.' },
  'access-reviews':     { cat:'governance', name:'Access Reviews', x:600, y:230, desc:'Recertificación recurrente.' },
  'cross-tenant-sync':  { cat:'governance', name:'Cross-Tenant Sync', x:600, y:305, desc:'Provisioning multi-tenant.' },
  'app-registrations':  { cat:'workload', name:'App Registrations', x:600, y:380, desc:'OAuth2/OIDC apps.' },
  'service-principals': { cat:'workload', name:'Enterprise Apps / SPs', x:600, y:450, desc:'SSO + assignment.' },

  // Col E — Workload / External / Network / Ecosystem (x=770)
  'managed-identities': { cat:'workload', name:'Managed Identities', x:770, y:80, desc:'Azure-managed creds.' },
  'workload-id-premium':{ cat:'workload', name:'Workload ID Premium', x:770, y:155, desc:'CA + Risk para SPs.' },
  'b2b':                { cat:'external', name:'B2B Collaboration', x:770, y:230, desc:'Guests federados.' },
  'cross-tenant-access':{ cat:'external', name:'Cross-Tenant Access', x:770, y:305, desc:'Trust MFA/Device.' },
  'external-id':        { cat:'external', name:'External ID (CIAM)', x:770, y:380, desc:'Customer IAM.' },
  'verified-id':        { cat:'external', name:'Verified ID', x:770, y:450, desc:'W3C VCs.' },

  // Col F — GSA + Ecosystem (x=870)
  'global-secure-access':{ cat:'network', name:'GSA', x:870, y:80, desc:'SSE platform.' },
  'internet-access':    { cat:'network', name:'GSA · Internet', x:870, y:155, desc:'SWG + Compliant Network.' },
  'private-access':     { cat:'network', name:'GSA · Private', x:870, y:230, desc:'ZTNA, replaces VPN.' },
  'intune':             { cat:'ecosystem', name:'Intune', x:870, y:305, desc:'Compliant device signal.' },
  'defender-identity':  { cat:'ecosystem', name:'Defender for Identity', x:870, y:380, desc:'ITDR signals.' },
  'sentinel':           { cat:'ecosystem', name:'Sentinel', x:870, y:450, desc:'SIEM + UEBA.' },
  'purview':            { cat:'ecosystem', name:'Purview', x:770, y:525, desc:'Adaptive Protection + container labels.' }
}

export function pickNodes(ids) {
  const r = {}
  for (const id of ids) {
    const c = SV_COMPONENTS[id]
    if (c) r[id] = c
  }
  return r
}
