// Microsoft Entra ID — edge catalog. Each edge: from, to, flow, label.

export const EDGE_TYPES = {
  Data:       { color: '#06B6D4', dash: '5 3',     strokeWidth: 1.5, label: 'Data' },
  Signal:     { color: '#8B5CF6', dash: '1 3',     strokeWidth: 1.5, label: 'Signal' },
  Policy:     { color: '#F97316', dash: null,      strokeWidth: 1.5, label: 'Policy' },
  Escalation: { color: '#374151', dash: '6 3 1 3', strokeWidth: 1.5, label: 'Escalation' }
}

const FLOW_TO_TYPE = { data:'Data', signal:'Signal', policy:'Policy', escalation:'Escalation' }

const _EDGES_RAW = [
  // ── Core
  { from:'users', to:'groups',             flow:'data',   label:'Membership' },
  { from:'users', to:'conditional-access', flow:'data',   label:'Targets / exclusions' },
  { from:'groups', to:'conditional-access',flow:'data',   label:'Assignment targets' },
  { from:'groups', to:'entitlement-mgmt',  flow:'data',   label:'Resources in packages' },
  { from:'groups', to:'access-reviews',    flow:'data',   label:'Membership review' },
  { from:'users', to:'lifecycle-workflows',flow:'data',   label:'JML source' },
  { from:'admin-units', to:'conditional-access', flow:'policy', label:'Scoped CA' },
  { from:'admin-units', to:'users',        flow:'policy', label:'Delegated admin scope' },
  { from:'custom-attributes', to:'conditional-access', flow:'data', label:'ABAC conditions' },
  { from:'custom-attributes', to:'service-principals', flow:'data', label:'Workload segmentation' },

  // ── Access & Authentication
  { from:'mfa', to:'auth-methods',           flow:'data',   label:'Method enablement' },
  { from:'auth-methods', to:'passkeys',      flow:'policy', label:'Passkey rollout' },
  { from:'passkeys', to:'auth-strengths',    flow:'data',   label:'Phishing-resistant set' },
  { from:'auth-strengths', to:'conditional-access', flow:'policy', label:'Strong-auth grant' },
  { from:'mfa', to:'conditional-access',     flow:'policy', label:'Grant control' },
  { from:'named-locations', to:'conditional-access', flow:'data', label:'Location condition' },
  { from:'conditional-access', to:'cae',     flow:'signal', label:'Critical events' },
  { from:'cae', to:'service-principals',     flow:'policy', label:'Near-real-time revoke' },
  { from:'token-protection', to:'conditional-access', flow:'policy', label:'Session binding grant' },
  { from:'token-protection', to:'cae',       flow:'signal', label:'Token compromise events' },

  // ── Identity Protection / Risk
  { from:'identity-protection', to:'risk-policies',     flow:'signal',     label:'Risk levels' },
  { from:'risk-policies', to:'conditional-access',      flow:'policy',     label:'Risk-based CA' },
  { from:'identity-protection', to:'sign-in-logs',      flow:'data',       label:'Risk detections' },
  { from:'sign-in-logs', to:'sentinel',                 flow:'data',       label:'Stream to SIEM' },
  { from:'sign-in-logs', to:'identity-protection',      flow:'signal',     label:'Telemetry baseline' },
  { from:'identity-protection', to:'users',             flow:'escalation', label:'Risky user marker' },
  { from:'risk-policies', to:'cae',                     flow:'signal',     label:'Force re-eval on risk' },

  // ── Governance
  { from:'pim', to:'conditional-access',     flow:'policy', label:'Activation requires CA' },
  { from:'pim', to:'auth-strengths',         flow:'policy', label:'Phishing-resistant on activate' },
  { from:'pim', to:'access-reviews',         flow:'data',   label:'Recurring role reviews' },
  { from:'entitlement-mgmt', to:'access-reviews', flow:'data',  label:'Package recertification' },
  { from:'entitlement-mgmt', to:'b2b',       flow:'policy', label:'Guest onboarding workflow' },
  { from:'lifecycle-workflows', to:'entitlement-mgmt', flow:'policy', label:'Auto-assign packages' },
  { from:'lifecycle-workflows', to:'groups', flow:'policy', label:'Add/remove membership' },
  { from:'lifecycle-workflows', to:'users',  flow:'policy', label:'Enable/disable account' },
  { from:'cross-tenant-sync', to:'b2b',      flow:'data',   label:'Provision guests' },
  { from:'cross-tenant-sync', to:'cross-tenant-access', flow:'policy', label:'Trust required' },
  { from:'access-reviews', to:'groups',      flow:'policy', label:'Remove on no-response' },

  // ── External
  { from:'b2b', to:'conditional-access',     flow:'policy', label:'Guest CA policy' },
  { from:'cross-tenant-access', to:'b2b',    flow:'policy', label:'Partner allow/block' },
  { from:'cross-tenant-access', to:'conditional-access', flow:'policy', label:'Trust MFA/Device' },
  { from:'external-id', to:'conditional-access', flow:'policy', label:'CIAM tenant CA' },
  { from:'external-id', to:'sign-in-logs',   flow:'data',   label:'Customer sign-ins' },
  { from:'verified-id', to:'users',          flow:'data',   label:'Onboard with VC' },
  { from:'verified-id', to:'entitlement-mgmt', flow:'policy', label:'Credential-gated access' },
  { from:'entra-connect', to:'users',        flow:'data',   label:'AD → cloud sync' },
  { from:'entra-connect', to:'groups',       flow:'data',   label:'Group sync' },

  // ── Workload Identities
  { from:'app-registrations', to:'service-principals', flow:'data',   label:'Instantiation' },
  { from:'service-principals', to:'conditional-access', flow:'data',  label:'CA-targetable' },
  { from:'managed-identities', to:'service-principals', flow:'data',  label:'SP-backed identity' },
  { from:'workload-id-premium', to:'service-principals', flow:'policy', label:'CA + Risk for SPs' },
  { from:'workload-id-premium', to:'identity-protection', flow:'signal', label:'Workload risk detections' },
  { from:'workload-id-premium', to:'access-reviews', flow:'data',  label:'Recurring SP review' },
  { from:'managed-identities', to:'custom-attributes', flow:'data', label:'ABAC on resources' },

  // ── Global Secure Access
  { from:'global-secure-access', to:'internet-access', flow:'data', label:'SSE profile' },
  { from:'global-secure-access', to:'private-access',  flow:'data', label:'ZTNA profile' },
  { from:'internet-access', to:'conditional-access',   flow:'policy', label:'Compliant Network' },
  { from:'private-access',  to:'conditional-access',   flow:'policy', label:'Per-app ZTNA grant' },
  { from:'internet-access', to:'sign-in-logs',         flow:'data',   label:'Network logs' },
  { from:'private-access',  to:'sign-in-logs',         flow:'data',   label:'App access logs' },

  // ── Ecosystem
  { from:'intune', to:'conditional-access',  flow:'signal',     label:'Compliant device' },
  { from:'intune', to:'users',               flow:'data',       label:'Device enrollment' },
  { from:'defender-identity', to:'identity-protection', flow:'signal', label:'ITDR signals' },
  { from:'defender-identity', to:'sentinel', flow:'data',       label:'Identity alerts' },
  { from:'defender-identity', to:'sign-in-logs', flow:'signal', label:'Lateral movement context' },
  { from:'purview', to:'conditional-access', flow:'policy',     label:'Container label CA' },
  { from:'purview', to:'identity-protection', flow:'signal',    label:'Adaptive Protection risk' },
  { from:'sentinel', to:'risk-policies',     flow:'signal',     label:'Hunt-driven response' },
  { from:'sentinel', to:'identity-protection', flow:'signal',   label:'Custom risk detections' },
  { from:'sentinel', to:'users',             flow:'escalation', label:'SOAR · disable user' },

  // ── Audit cross-cutting
  { from:'pim', to:'sign-in-logs',           flow:'data',       label:'Activation events' },
  { from:'conditional-access', to:'sign-in-logs', flow:'data',  label:'Policy decisions' },
  { from:'service-principals', to:'sign-in-logs', flow:'data',  label:'Workload sign-ins' },

  // ── Security Copilot platform + 4 Entra agents
  { from:'security-copilot', to:'sign-in-logs',        flow:'signal', label:'Telemetry context' },
  { from:'security-copilot', to:'identity-protection', flow:'signal', label:'Risk context' },
  { from:'security-copilot', to:'pim',                 flow:'signal', label:'Privilege context' },
  { from:'security-copilot', to:'agent-ca-optim',       flow:'data',   label:'Platform' },
  { from:'security-copilot', to:'agent-risky-user',     flow:'data',   label:'Platform' },
  { from:'security-copilot', to:'agent-access-review',  flow:'data',   label:'Platform' },
  { from:'security-copilot', to:'agent-app-lifecycle',  flow:'data',   label:'Platform' },
  // CA Optimization Agent
  { from:'conditional-access', to:'agent-ca-optim',     flow:'data',   label:'Policies analyzed' },
  { from:'sign-in-logs',       to:'agent-ca-optim',     flow:'data',   label:'Telemetry baseline' },
  { from:'agent-ca-optim',     to:'conditional-access', flow:'policy', label:'Apply recommendations' },
  // Risky User Remediation Agent
  { from:'identity-protection', to:'agent-risky-user',  flow:'signal', label:'Risky users feed' },
  { from:'agent-risky-user',    to:'risk-policies',     flow:'policy', label:'Trigger remediation' },
  { from:'agent-risky-user',    to:'users',             flow:'policy', label:'Auto-remediate' },
  // Access Review Agent
  { from:'access-reviews',      to:'agent-access-review', flow:'data',   label:'Review queue' },
  { from:'agent-access-review', to:'access-reviews',    flow:'policy', label:'Recommend approve/remove' },
  // App Lifecycle Agent
  { from:'service-principals',  to:'agent-app-lifecycle', flow:'data',   label:'SP inventory' },
  { from:'app-registrations',   to:'agent-app-lifecycle', flow:'data',   label:'App inventory' },
  { from:'agent-app-lifecycle', to:'service-principals', flow:'policy', label:'Cleanup / recertify' },
  { from:'agent-app-lifecycle', to:'access-reviews',    flow:'policy', label:'Trigger reviews' }
]

export const EDGES = _EDGES_RAW.map(e => ({
  source: e.from,
  target: e.to,
  type: FLOW_TO_TYPE[e.flow],
  flow: e.flow,
  label: e.label,
  priority: e.type || 'primary'
}))

export function edgesBetween(idsSet) {
  return EDGES.filter(e => idsSet.has(e.source) && idsSet.has(e.target))
}
