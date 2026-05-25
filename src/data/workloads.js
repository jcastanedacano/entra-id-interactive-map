// Microsoft Entra ID — "workloads" axis represents the RESOURCES that Entra
// protects, not M365 productivity workloads. Phases calibrated for LATAM
// enterprise identity rollouts. Validate against current Microsoft Learn.

export const WORKLOADS = {
  m365:       { id:'m365',       label:'Microsoft 365',  short:'M365', color:'#0078D4' },
  azure:      { id:'azure',      label:'Azure Resources',short:'AZ',   color:'#03787C' },
  saas:       { id:'saas',       label:'Federated SaaS', short:'SAAS', color:'#0364B8' },
  onprem:     { id:'onprem',     label:'On-Prem AD/Apps',short:'AD',   color:'#6264A7' },
  devices:    { id:'devices',    label:'Devices',        short:'DEV',  color:'#107C10' },
  workloadid: { id:'workloadid', label:'Workload IDs',   short:'SP',   color:'#742774' },
  external:   { id:'external',   label:'External Users', short:'EXT',  color:'#A4373A' }
}

export const WORKLOAD_ORDER = ['m365','azure','saas','onprem','devices','workloadid','external']

export const PHASES = {
  1: { id: 1, label: 'Phase 1 · Foundations', color: '#06B6D4', bg: '#CFFAFE', pillBg: '#E0F2FE', pillFg: '#0284C7' },
  2: { id: 2, label: 'Phase 2 · Scale',       color: '#8B5CF6', bg: '#EDE9FE', pillBg: '#EDE9FE', pillFg: '#7C3AED' },
  3: { id: 3, label: 'Phase 3 · Advanced',    color: '#F97316', bg: '#FFEDD5', pillBg: '#FEF3C7', pillFg: '#D97706' }
}

// Per-component coverage. 0=none · 1=light · 2=full.
const _COMPONENT_META = {
  // Core
  'users':              { workloads: { m365:2, azure:2, saas:2, onprem:2, devices:2, workloadid:0, external:2 } },
  'groups':             { workloads: { m365:2, azure:2, saas:2, onprem:2, devices:1, workloadid:1, external:2 } },
  'admin-units':        { workloads: { m365:2, azure:1, saas:1, onprem:1, devices:1, workloadid:1, external:1 } },
  'custom-attributes':  { workloads: { m365:1, azure:2, saas:1, onprem:0, devices:0, workloadid:2, external:1 } },

  // Access
  'conditional-access': { workloads: { m365:2, azure:2, saas:2, onprem:1, devices:2, workloadid:2, external:2 } },
  'mfa':                { workloads: { m365:2, azure:2, saas:2, onprem:1, devices:2, workloadid:0, external:2 } },
  'auth-methods':       { workloads: { m365:2, azure:2, saas:2, onprem:1, devices:2, workloadid:0, external:2 } },
  'passkeys':           { workloads: { m365:2, azure:2, saas:2, onprem:1, devices:2, workloadid:0, external:1 } },
  'auth-strengths':     { workloads: { m365:2, azure:2, saas:2, onprem:1, devices:2, workloadid:0, external:2 } },
  'cae':                { workloads: { m365:2, azure:2, saas:1, onprem:0, devices:1, workloadid:1, external:1 } },
  'token-protection':   { workloads: { m365:2, azure:1, saas:1, onprem:0, devices:2, workloadid:0, external:0 } },
  'named-locations':    { workloads: { m365:2, azure:2, saas:2, onprem:0, devices:1, workloadid:1, external:2 } },

  // Governance
  'pim':                { workloads: { m365:2, azure:2, saas:1, onprem:0, devices:0, workloadid:1, external:1 } },
  'entitlement-mgmt':   { workloads: { m365:2, azure:1, saas:2, onprem:0, devices:0, workloadid:0, external:2 } },
  'access-reviews':     { workloads: { m365:2, azure:2, saas:2, onprem:0, devices:0, workloadid:1, external:2 } },
  'lifecycle-workflows':{ workloads: { m365:2, azure:1, saas:1, onprem:1, devices:0, workloadid:0, external:1 } },
  'cross-tenant-sync':  { workloads: { m365:1, azure:0, saas:0, onprem:0, devices:0, workloadid:0, external:2 } },

  // Protection
  'identity-protection':{ workloads: { m365:2, azure:2, saas:2, onprem:1, devices:1, workloadid:1, external:2 } },
  'sign-in-logs':       { workloads: { m365:2, azure:2, saas:2, onprem:1, devices:1, workloadid:2, external:2 } },
  'risk-policies':      { workloads: { m365:2, azure:2, saas:2, onprem:0, devices:1, workloadid:1, external:2 } },

  // Workload
  'app-registrations':  { workloads: { m365:0, azure:1, saas:1, onprem:0, devices:0, workloadid:2, external:0 } },
  'service-principals': { workloads: { m365:1, azure:2, saas:2, onprem:0, devices:0, workloadid:2, external:0 } },
  'managed-identities': { workloads: { m365:0, azure:2, saas:0, onprem:0, devices:0, workloadid:2, external:0 } },
  'workload-id-premium':{ workloads: { m365:0, azure:2, saas:1, onprem:0, devices:0, workloadid:2, external:0 } },

  // External
  'b2b':                { workloads: { m365:2, azure:1, saas:2, onprem:0, devices:0, workloadid:0, external:2 } },
  'external-id':        { workloads: { m365:0, azure:0, saas:1, onprem:0, devices:0, workloadid:0, external:2 } },
  'verified-id':        { workloads: { m365:1, azure:1, saas:1, onprem:0, devices:0, workloadid:0, external:2 } },
  'cross-tenant-access':{ workloads: { m365:2, azure:1, saas:1, onprem:0, devices:1, workloadid:0, external:2 } },
  'entra-connect':      { workloads: { m365:1, azure:0, saas:0, onprem:2, devices:0, workloadid:0, external:0 } },

  // Network
  'global-secure-access':{ workloads: { m365:2, azure:2, saas:2, onprem:2, devices:2, workloadid:0, external:1 } },
  'internet-access':    { workloads: { m365:2, azure:1, saas:2, onprem:0, devices:2, workloadid:0, external:0 } },
  'private-access':     { workloads: { m365:0, azure:2, saas:1, onprem:2, devices:2, workloadid:0, external:0 } },

  // Ecosystem
  'intune':             { workloads: { m365:2, azure:1, saas:1, onprem:0, devices:2, workloadid:0, external:1 } },
  'defender-identity':  { workloads: { m365:1, azure:1, saas:0, onprem:2, devices:1, workloadid:0, external:0 } },
  'purview':            { workloads: { m365:2, azure:1, saas:1, onprem:0, devices:1, workloadid:0, external:0 } },
  'sentinel':           { workloads: { m365:2, azure:2, saas:2, onprem:1, devices:1, workloadid:1, external:1 } },

  // Security Copilot platform + 4 Entra agents
  'security-copilot':     { workloads: { m365:1, azure:1, saas:1, onprem:0, devices:0, workloadid:1, external:0 } },
  'agent-ca-optim':       { workloads: { m365:2, azure:2, saas:2, onprem:0, devices:1, workloadid:1, external:1 } },
  'agent-risky-user':     { workloads: { m365:2, azure:1, saas:1, onprem:0, devices:0, workloadid:0, external:1 } },
  'agent-access-review':  { workloads: { m365:2, azure:1, saas:1, onprem:0, devices:0, workloadid:1, external:1 } },
  'agent-app-lifecycle':  { workloads: { m365:1, azure:1, saas:1, onprem:0, devices:0, workloadid:2, external:0 } }
}

import { COMPONENTS, computePhase, resolveId } from './components.js'
COMPONENTS.forEach(c => {
  const meta = _COMPONENT_META[c.id]
  if (meta) meta.phase = computePhase(c.id)
})

export const COMPONENT_META = new Proxy(_COMPONENT_META, {
  get(target, prop) {
    if (typeof prop !== 'string') return target[prop]
    if (prop in target) return target[prop]
    const aliased = resolveId(prop)
    return aliased ? target[aliased] : undefined
  },
  has(target, prop) {
    if (typeof prop !== 'string') return prop in target
    if (prop in target) return true
    const aliased = resolveId(prop)
    return !!(aliased && aliased in target)
  }
})

export function coverageScore(componentId) {
  const id = resolveId(componentId)
  const m = _COMPONENT_META[id]
  if (!m) return 0
  return Object.values(m.workloads).reduce((a, b) => a + b, 0) / (WORKLOAD_ORDER.length * 2)
}

const HEAT_STOPS = [
  [0.0, [0xF1, 0xEF, 0xE8]],
  [0.2, [0xB5, 0xD4, 0xF4]],
  [0.4, [0xEF, 0x9F, 0x27]],
  [0.6, [0xD8, 0x5A, 0x30]],
  [0.8, [0xA3, 0x2D, 0x2D]],
  [1.0, [0xA3, 0x2D, 0x2D]]
]

export function heatColor(score) {
  const s = Math.max(0, Math.min(1, score))
  for (let i = 0; i < HEAT_STOPS.length - 1; i++) {
    const [s1, c1] = HEAT_STOPS[i]
    const [s2, c2] = HEAT_STOPS[i + 1]
    if (s >= s1 && s <= s2) {
      const t = s2 === s1 ? 0 : (s - s1) / (s2 - s1)
      const c = c1.map((v, j) => Math.round(v + (c2[j] - v) * t))
      return `rgb(${c[0]},${c[1]},${c[2]})`
    }
  }
  return '#F1EFE8'
}
