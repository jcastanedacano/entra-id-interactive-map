// Microsoft Entra ID component dataset

// 8 hues equidistantes en OKLCH (L≈0.55, C≈0.13). Δhue ≥ 35° entre vecinos.
export const CATEGORIES = {
  core: {
    id: 'core',
    label: 'Core Identity',
    short: 'CORE IDENTITY',
    color: '#C5377A',  // 345° Pink — Entra signature
    bg: '#FBE6EF'
  },
  access: {
    id: 'access',
    label: 'Access & Authentication',
    short: 'ACCESS & AUTH',
    color: '#3B5DD9',  // 260° Indigo
    bg: '#E6EAFB'
  },
  governance: {
    id: 'governance',
    label: 'Identity Governance',
    short: 'IDENTITY GOVERNANCE',
    color: '#0891A6',  // 200° Teal
    bg: '#E0F4F7'
  },
  protection: {
    id: 'protection',
    label: 'Protection & Risk',
    short: 'PROTECTION & RISK',
    color: '#E24B4A',  // 25° Red — risk
    bg: '#FBE6E6'
  },
  workload: {
    id: 'workload',
    label: 'Workload Identities',
    short: 'WORKLOAD IDENTITIES',
    color: '#8541C5',  // 295° Violet
    bg: '#F0E7FA'
  },
  external: {
    id: 'external',
    label: 'External Identities',
    short: 'EXTERNAL IDENTITIES',
    color: '#0F9D6A',  // 160° Emerald
    bg: '#E6F6EE'
  },
  network: {
    id: 'network',
    label: 'Global Secure Access',
    short: 'GLOBAL SECURE ACCESS',
    color: '#C97A14',  // 65° Amber
    bg: '#FBF1DE'
  },
  ecosystem: {
    id: 'ecosystem',
    label: 'Ecosystem',
    short: 'ECOSYSTEM',
    color: '#6D9224',  // 120° Lime
    bg: '#F0F5DC'
  }
}

export const COMPONENTS = [
  // Core Identity
  { id: 'users', name: 'Users & Identities', category: 'core', icon: 'User',
    sublabel: 'Cloud · Synced · Guest · Hybrid',
    prereqs: [],
    description: 'Identity object directory: cloud-only, hybrid (synced from on-prem AD), guests (B2B), and external customer identities. Source of truth for every authentication and authorization decision in the Microsoft stack.' },
  { id: 'groups', name: 'Groups & M365 Groups', category: 'core', icon: 'Users',
    sublabel: 'Security · M365 · Dynamic · Assignable',
    prereqs: ['users'],
    description: 'Security groups, Microsoft 365 groups and dynamic groups used for license assignment, Conditional Access targeting, app role assignment and entitlement access packages.' },
  { id: 'admin-units', name: 'Administrative Units', category: 'core', icon: 'Building2',
    sublabel: 'Scoped Admin · Delegated Roles',
    prereqs: ['users','groups'],
    description: 'Scope admin permissions and policies (CA, password reset, license) to a subset of users, groups or devices — by country, subsidiary or business unit — without granting tenant-wide rights.' },
  { id: 'custom-attributes', name: 'Custom Security Attributes', category: 'core', icon: 'Tags',
    sublabel: 'ABAC for Azure & Entra',
    prereqs: ['users'],
    description: 'Business-defined attributes attached to users, service principals and Azure resources. Power attribute-based access control (ABAC) for Azure Storage and segmentation in Entra workload identities.' },

  // Access & Authentication
  { id: 'conditional-access', name: 'Conditional Access', category: 'access', icon: 'KeyRound',
    sublabel: 'Signals · Decisions · Enforcement',
    prereqs: ['users','groups'],
    description: 'Zero Trust policy engine. Evaluates signals (user, device, location, app, risk) and enforces controls (MFA, compliant device, block, session limits). Single chokepoint for every access decision in the tenant.' },
  { id: 'mfa', name: 'Multi-Factor Authentication', category: 'access', icon: 'ShieldCheck',
    sublabel: 'MS Authenticator · SMS · Voice · OATH',
    prereqs: ['users'],
    description: 'Second factor proof: Microsoft Authenticator (push + number match), FIDO2 keys, Windows Hello, OATH tokens, SMS/voice (legacy). Mandatory under MFA enforcement and Microsoft mandatory MFA rollout (2024-2025).' },
  { id: 'auth-methods', name: 'Authentication Methods Policy', category: 'access', icon: 'Settings2',
    sublabel: 'Modern Policy · Migration · Per-Method',
    prereqs: ['mfa'],
    description: 'Unified policy that replaces legacy per-user MFA + SSPR settings. Manage enablement and targeting of every method (Authenticator, FIDO2, Passkeys, SMS, TAP, certificate-based) tenant-wide.' },
  { id: 'passkeys', name: 'FIDO2 & Passkeys', category: 'access', icon: 'Fingerprint',
    sublabel: 'Device-bound · Synced · Phishing-resistant',
    prereqs: ['auth-methods'],
    description: 'Phishing-resistant credentials — FIDO2 security keys and device-bound passkeys in Microsoft Authenticator. The foundation of a passwordless rollout and required by Authentication Strengths for privileged access.' },
  { id: 'auth-strengths', name: 'Authentication Strengths', category: 'access', icon: 'Award',
    sublabel: 'Built-in · Custom · Per-CA Policy',
    prereqs: ['conditional-access','mfa'],
    description: 'Named combinations of allowed authentication methods (e.g. Phishing-Resistant MFA, Passwordless MFA). Referenced by Conditional Access to require strong auth for sensitive apps or PIM activations.' },
  { id: 'cae', name: 'Continuous Access Evaluation', category: 'access', icon: 'Activity',
    sublabel: 'Near-real-time Revocation · Critical Events',
    prereqs: ['conditional-access'],
    description: 'Revokes access tokens within minutes (vs. 1h default) on critical events: password change, user disable, MFA revoke, IP change, risk increase. Removes the 60-minute token lifetime gap.' },
  { id: 'token-protection', name: 'Token Protection', category: 'access', icon: 'Lock',
    sublabel: 'Sign-in Session Binding',
    prereqs: ['conditional-access'],
    description: 'Cryptographically binds refresh tokens and sign-in sessions to the originating device. Mitigates AiTM (Adversary-in-the-Middle) and token replay attacks. Enforced via Conditional Access.' },
  { id: 'named-locations', name: 'Named Locations', category: 'access', icon: 'MapPin',
    sublabel: 'IP Ranges · Countries · Trusted Networks',
    prereqs: ['conditional-access'],
    description: 'Define IP ranges and country-based locations used as Conditional Access conditions. Mark networks as trusted to skip MFA, or block sign-ins from sanctioned/embargoed regions.' },

  // Identity Governance
  { id: 'pim', name: 'Privileged Identity Management', category: 'governance', icon: 'Crown',
    sublabel: 'JIT Activation · Approval · MFA · Access Reviews',
    prereqs: ['conditional-access'],
    description: 'Just-in-time elevation for Entra and Azure RBAC roles. Approval workflows, MFA on activation, max-duration, automatic role expiry, and integrated access reviews to eliminate standing privilege.' },
  { id: 'entitlement-mgmt', name: 'Entitlement Management', category: 'governance', icon: 'PackageOpen',
    sublabel: 'Access Packages · Catalogs · Approval Workflows',
    prereqs: ['groups'],
    description: 'Access packages bundle groups, apps and SharePoint sites for self-service request with approval workflows, time-limited assignment, and recurring access reviews. Designed for joiner/mover/leaver and B2B onboarding.' },
  { id: 'access-reviews', name: 'Access Reviews', category: 'governance', icon: 'ClipboardCheck',
    sublabel: 'Group · App · Role · Guest · Recurring',
    prereqs: ['groups'],
    description: 'Recurring or one-time reviews of group membership, app assignment, privileged role assignment, and guest access. Reviewers approve/remove access; auto-remove if reviewer does not respond.' },
  { id: 'lifecycle-workflows', name: 'Lifecycle Workflows', category: 'governance', icon: 'GitBranch',
    sublabel: 'Joiner · Mover · Leaver Automation',
    prereqs: ['users'],
    description: 'Automated joiner/mover/leaver flows: send welcome email, request TAP, add to groups, request access package, revoke licenses, disable account. Trigger via attributes or scheduled relative to employee hire/leave date.' },
  { id: 'cross-tenant-sync', name: 'Cross-Tenant Sync', category: 'governance', icon: 'GitMerge',
    sublabel: 'Multi-tenant B2B · Automatic Provisioning',
    prereqs: ['users'],
    description: 'Automatically provisions and synchronizes B2B guests across multiple Entra tenants. Used by enterprises with subsidiaries or post-merger integrations to provide seamless cross-tenant collaboration.' },

  // Protection & Risk
  { id: 'identity-protection', name: 'Identity Protection', category: 'protection', icon: 'ShieldAlert',
    sublabel: 'Sign-in Risk · User Risk · Risk Detections',
    prereqs: ['users'],
    description: 'Machine learning that scores sign-in risk (atypical travel, anonymous IP, malware-linked IP, AiTM) and user risk (leaked credentials, password spray). Surfaces risky users/sign-ins and feeds Conditional Access.' },
  { id: 'sign-in-logs', name: 'Sign-in & Audit Logs', category: 'protection', icon: 'FileSearch',
    sublabel: 'Sign-ins · Audit · Provisioning · Risk',
    prereqs: [],
    description: 'Tenant-level telemetry: every interactive and non-interactive sign-in, every admin action, every provisioning event, every risk detection. Native retention 30 days; stream to Log Analytics / Sentinel for long-term.' },
  { id: 'risk-policies', name: 'Risk-Based Policies', category: 'protection', icon: 'Siren',
    sublabel: 'Sign-in Risk CA · User Risk CA · Auto-Remediation',
    prereqs: ['identity-protection','conditional-access'],
    description: 'Conditional Access policies driven by Identity Protection risk levels. Force MFA on medium sign-in risk, force password change on high user risk, or block on critical risk. Self-remediation closes risk events.' },

  // Workload Identities
  { id: 'app-registrations', name: 'App Registrations', category: 'workload', icon: 'AppWindow',
    sublabel: 'OAuth2 · OIDC · API Permissions',
    prereqs: [],
    description: 'Application objects representing OAuth2/OIDC apps. Define redirect URIs, requested API permissions, app roles, and credentials (secrets, certificates, federated credentials). Multi-tenant or single-tenant.' },
  { id: 'service-principals', name: 'Enterprise Apps & SPs', category: 'workload', icon: 'Layers',
    sublabel: 'SSO · App Roles · Provisioning',
    prereqs: ['app-registrations'],
    description: 'Tenant-specific instance of an application. Holds SSO config (SAML/OIDC), user/group assignments, app role assignments, and SCIM provisioning. The CA-targetable surface of an app.' },
  { id: 'managed-identities', name: 'Managed Identities', category: 'workload', icon: 'BadgeCheck',
    sublabel: 'System-Assigned · User-Assigned · Federated',
    prereqs: [],
    description: 'Azure-managed credentials for Azure resources (VMs, Functions, Apps). No secrets to rotate; the platform handles lifecycle. Federated identity credentials extend MI to GitHub Actions, Kubernetes and external workloads.' },
  { id: 'workload-id-premium', name: 'Workload ID Premium', category: 'workload', icon: 'Sparkles',
    sublabel: 'CA for SPs · Risk · Access Reviews',
    prereqs: ['service-principals','conditional-access'],
    description: 'Premium SKU that brings Conditional Access, risk detections, and access reviews to workload identities (service principals + managed identities). Required for Zero Trust on non-human accounts.' },

  // External Identities
  { id: 'b2b', name: 'B2B Collaboration', category: 'external', icon: 'UserPlus',
    sublabel: 'Guest Invitations · Email OTP · Federation',
    prereqs: ['users'],
    description: 'Invite external users (partners, vendors, contractors) as guest accounts in your tenant. Guests authenticate with their home tenant (federation) or via email OTP, and are governed by Conditional Access and Entitlement Mgmt.' },
  { id: 'external-id', name: 'External ID (CIAM)', category: 'external', icon: 'Globe',
    sublabel: 'Customer IAM · Self-Service Sign-up · Social IdP',
    prereqs: [],
    description: 'Customer Identity & Access Management. Branded sign-up/sign-in for customer-facing apps. Supports email OTP, Google/Facebook/Apple federation, and custom user attributes. Successor to Azure AD B2C.' },
  { id: 'verified-id', name: 'Verified ID', category: 'external', icon: 'BadgeCheck',
    sublabel: 'W3C VC · Issuer · Verifier · Wallet',
    prereqs: [],
    description: 'Microsoft\'s decentralized identity service based on W3C Verifiable Credentials. Issue credentials (employee ID, training certificate, KYC proof) and verify them at sign-in or onboarding without re-collecting PII.' },
  { id: 'cross-tenant-access', name: 'Cross-Tenant Access Settings', category: 'external', icon: 'Network',
    sublabel: 'Inbound · Outbound · MFA Trust · Device Trust',
    prereqs: ['b2b'],
    description: 'Per-partner inbound and outbound B2B policy. Trust MFA and device claims from partner tenants (transitive Zero Trust), restrict which users/apps a guest can access, and allow/block specific tenants.' },
  { id: 'entra-connect', name: 'Entra Connect Sync', category: 'external', icon: 'GitMerge',
    sublabel: 'Cloud Sync · Connect Sync · Pass-through Auth',
    prereqs: [],
    description: 'Synchronize users, groups and credentials from on-premises Active Directory to Entra ID. Cloud Sync is the modern lightweight agent; legacy Connect Sync remains for complex topologies (filtering, writeback).' },

  // Global Secure Access
  { id: 'global-secure-access', name: 'Global Secure Access', category: 'network', icon: 'Network',
    sublabel: 'SSE Platform · Client · CA-aware',
    prereqs: ['conditional-access'],
    description: 'Microsoft\'s Security Service Edge (SSE) platform unifying Internet Access and Private Access. Identity-aware network plane integrated with Conditional Access, source IP enforcement and compliant network conditions.' },
  { id: 'internet-access', name: 'GSA · Internet Access', category: 'network', icon: 'Globe2',
    sublabel: 'SWG · Web Filtering · M365 Profile · TLS Inspect',
    prereqs: ['global-secure-access'],
    description: 'Secure Web Gateway that protects access to M365 and the public internet. Web content filtering, TLS inspection, and the Compliant Network condition that ties traffic to a Conditional Access policy.' },
  { id: 'private-access', name: 'GSA · Private Access', category: 'network', icon: 'Lock',
    sublabel: 'ZTNA · Quick Access · App Segmentation',
    prereqs: ['global-secure-access'],
    description: 'Zero Trust Network Access replacement for VPN. Per-app tunnels to private resources (on-prem or Azure VNet) via connectors. CA-enforced, no inbound firewall holes, no broad network access.' },

  // Ecosystem
  { id: 'intune', name: 'Microsoft Intune', category: 'ecosystem', icon: 'Smartphone',
    sublabel: 'MDM · MAM · Compliance · App Protection',
    prereqs: [],
    description: 'Unified endpoint management. Enrolls devices, enforces compliance policies, and emits the compliant-device signal consumed by Conditional Access. Application Protection Policies enforce data containment on BYOD.' },
  { id: 'defender-identity', name: 'Defender for Identity', category: 'ecosystem', icon: 'Fingerprint',
    sublabel: 'ITDR · Lateral Movement · AD & Entra Sensors',
    prereqs: [],
    description: 'Identity Threat Detection & Response across on-prem AD and Entra ID. Detects lateral movement, Kerberoasting, pass-the-hash, AS-REP roasting and feeds Entra Identity Protection + Defender XDR.' },
  { id: 'purview', name: 'Microsoft Purview', category: 'ecosystem', icon: 'Database',
    sublabel: 'Sensitivity Labels · DLP · IRM · Audit',
    prereqs: [],
    description: 'Data security & compliance stack. Container sensitivity labels enforce CA conditions on SharePoint/Teams. Adaptive Protection translates IRM risk into CA policy tightening for the user.' },
  { id: 'sentinel', name: 'Microsoft Sentinel', category: 'ecosystem', icon: 'Eye',
    sublabel: 'SIEM · KQL · Data Lake · UEBA',
    prereqs: [],
    description: 'Cloud-native SIEM that ingests sign-in, audit and risk telemetry from Entra. KQL hunting, UEBA, SOAR playbooks, and the data lake tier provides 12-year retention for identity forensics.' },

  // Security Copilot + Entra-specific agents (validated Nov 2025 Microsoft blog)
  { id: 'security-copilot', name: 'Microsoft Security Copilot', category: 'ecosystem', icon: 'Sparkles',
    sublabel: 'AI assistant · KQL drafting · Incident summarization',
    prereqs: [],
    description: 'Generative AI assistant that reads from Entra, Defender, Sentinel, Purview and Intune. Drafts KQL, summarizes incidents, generates reports, recommends actions. Foundation for all Security Copilot agents.' },
  { id: 'agent-ca-optim', name: 'CA Optimization Agent', category: 'governance', icon: 'Bot',
    sublabel: 'Autonomous · Detects gaps + overlap · Suggests CA',
    prereqs: ['security-copilot','conditional-access'],
    description: 'Security Copilot agent for Microsoft Entra (Preview, GA 2025). Continuously analyzes Conditional Access policies, detects gaps (users/apps not covered), overlap, outdated assignments and missing Zero Trust controls. Recommends one-click remediations.' },
  { id: 'agent-risky-user', name: 'Risky User Remediation Agent', category: 'protection', icon: 'Bot',
    sublabel: 'Autonomous · Proactive remediation',
    prereqs: ['security-copilot','identity-protection'],
    description: 'Security Copilot agent for Entra (Preview). Proactively investigates and remediates risky users surfaced by Identity Protection — closes risk events, forces password reset, blocks where needed, all with approval workflows.' },
  { id: 'agent-access-review', name: 'Access Review Agent', category: 'governance', icon: 'Bot',
    sublabel: 'Autonomous · Streamlines AR decisions',
    prereqs: ['security-copilot','access-reviews'],
    description: 'Security Copilot agent for Entra (Preview). Streamlines access reviews by analyzing usage signals, identifying stale access and recommending approve/remove decisions to reviewers — reducing review fatigue.' },
  { id: 'agent-app-lifecycle', name: 'App Lifecycle Agent', category: 'governance', icon: 'Bot',
    sublabel: 'Autonomous · Reduce app sprawl',
    prereqs: ['security-copilot','service-principals'],
    description: 'Security Copilot agent for Entra (Preview). Manages application lifecycles to reduce risk — identifies unused or risky app registrations, recommends owner reviews, triggers cleanup workflows and recertifications.' }
]

// No legacy IDs in this fresh project — kept for shape parity.
export const ID_ALIASES = {}

export function resolveId(id) {
  if (id in ID_ALIASES) return ID_ALIASES[id]
  return id
}

// Microsoft Learn URLs per component.
const LEARN_URLS = {
  'users':                  'https://learn.microsoft.com/en-us/entra/fundamentals/users-default-permissions',
  'groups':                 'https://learn.microsoft.com/en-us/entra/fundamentals/concept-learn-about-groups',
  'admin-units':            'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units',
  'custom-attributes':      'https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-overview',
  'conditional-access':     'https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview',
  'mfa':                    'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks',
  'auth-methods':           'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage',
  'passkeys':               'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passwordless',
  'auth-strengths':         'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths',
  'cae':                    'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation',
  'token-protection':       'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-token-protection',
  'named-locations':        'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network',
  'pim':                    'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure',
  'entitlement-mgmt':       'https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview',
  'access-reviews':         'https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview',
  'lifecycle-workflows':    'https://learn.microsoft.com/en-us/entra/id-governance/what-are-lifecycle-workflows',
  'cross-tenant-sync':      'https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-overview',
  'identity-protection':    'https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection',
  'sign-in-logs':           'https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins',
  'risk-policies':          'https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-policies',
  'app-registrations':      'https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app',
  'service-principals':     'https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals',
  'managed-identities':     'https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview',
  'workload-id-premium':    'https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview',
  'b2b':                    'https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b',
  'external-id':            'https://learn.microsoft.com/en-us/entra/external-id/customers/overview-customers-ciam',
  'verified-id':            'https://learn.microsoft.com/en-us/entra/verified-id/decentralized-identifier-overview',
  'cross-tenant-access':    'https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-overview',
  'entra-connect':          'https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/what-is-cloud-sync',
  'global-secure-access':   'https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access',
  'internet-access':        'https://learn.microsoft.com/en-us/entra/global-secure-access/concept-internet-access',
  'private-access':         'https://learn.microsoft.com/en-us/entra/global-secure-access/concept-private-access',
  'intune':                 'https://learn.microsoft.com/en-us/mem/intune/fundamentals/what-is-intune',
  'defender-identity':      'https://learn.microsoft.com/en-us/defender-for-identity/what-is',
  'purview':                'https://learn.microsoft.com/en-us/purview/purview',
  'sentinel':               'https://learn.microsoft.com/en-us/azure/sentinel/overview',
  'security-copilot':       'https://learn.microsoft.com/en-us/security-copilot/microsoft-security-copilot',
  'agent-ca-optim':         'https://learn.microsoft.com/en-us/entra/identity/conditional-access/agentic-iam-conditional-access-optimization-agent',
  'agent-risky-user':       'https://learn.microsoft.com/en-us/security-copilot/agentic-iam-risky-user-remediation-agent',
  'agent-access-review':    'https://learn.microsoft.com/en-us/security-copilot/agentic-iam-access-review-agent',
  'agent-app-lifecycle':    'https://learn.microsoft.com/en-us/security-copilot/agentic-iam-app-lifecycle-agent'
}
COMPONENTS.forEach(c => { c.learnUrl = LEARN_URLS[c.id] })

// Defaults for shape parity with the Purview architecture.
COMPONENTS.forEach(c => {
  if (!c.effort) c.effort = 'Medium'
  c.multiTenant = 'Partial'
  c.subComponents = c.subComponents || []
  c.knownLimitations = c.knownLimitations || []
  c.links = {
    learn: c.learnUrl,
    licensing: 'https://m365maps.com/files/Microsoft-Entra-Suite.htm',
    permissions: 'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference'
  }
  c.iconSvg = `/icons/${c.id}.svg`
})

// Per-component icon overrides (when extension differs from .svg, or when
// multiple components share an icon).
const ICON_OVERRIDES = {
  'security-copilot':    '/icons/security-copilot.png',
  'agent-ca-optim':      '/icons/security-copilot.png',
  'agent-risky-user':    '/icons/security-copilot.png',
  'agent-access-review': '/icons/security-copilot.png',
  'agent-app-lifecycle': '/icons/security-copilot.png',
  'auth-methods':        '/icons/auth-methods.png',
  'cae':                 '/icons/cae.png'
}
COMPONENTS.forEach(c => { if (ICON_OVERRIDES[c.id]) c.iconSvg = ICON_OVERRIDES[c.id] })

const _byId = Object.fromEntries(COMPONENTS.map(c => [c.id, c]))
export const COMPONENT_MAP = new Proxy(_byId, {
  get(target, prop) {
    if (typeof prop !== 'string') return target[prop]
    if (prop in target) return target[prop]
    const aliased = ID_ALIASES[prop]
    if (aliased && aliased in target) return target[aliased]
    return undefined
  },
  has(target, prop) {
    if (typeof prop !== 'string') return prop in target
    if (prop in target) return true
    const aliased = ID_ALIASES[prop]
    return !!(aliased && aliased in target)
  }
})

const _phaseMemo = {}
export function computePhase(id) {
  const realId = resolveId(id)
  if (_phaseMemo[realId] !== undefined) return _phaseMemo[realId]
  const node = COMPONENT_MAP[realId]
  if (!node) return 1
  if (!node.prereqs?.length) { _phaseMemo[realId] = 1; return 1 }
  const maxPrereqPhase = Math.max(...node.prereqs.map(p => computePhase(p)))
  _phaseMemo[realId] = maxPrereqPhase + 1
  return _phaseMemo[realId]
}

export const GROUPS_LEFT_PANEL = [
  { key: 'core', label: 'CORE IDENTITY' },
  { key: 'access', label: 'ACCESS & AUTH' },
  { key: 'governance', label: 'IDENTITY GOVERNANCE' },
  { key: 'protection', label: 'PROTECTION & RISK' },
  { key: 'workload', label: 'WORKLOAD IDENTITIES' },
  { key: 'external', label: 'EXTERNAL IDENTITIES' },
  { key: 'network', label: 'GLOBAL SECURE ACCESS' },
  { key: 'ecosystem', label: 'ECOSYSTEM' }
]
