// Mindmap presets — multiple selectable layouts for the Mindmap view.
// Each preset reorganizes the canvas into its own root + families + cards.
// Items may be either:
//   - a string referencing an id in COMPONENT_MAP (real component, full data), OR
//   - an inline {id, name, cat, sublabel?, learnUrl?} object (no edges/tooltips
//     beyond the basics).
//
// Inspired by https://entra.news/p/entra-mind-maps reference set.

export const MINDMAP_PRESETS = [
  // ── 1) Entra Suite (current default — uses real components) ────────────────
  {
    id: 'entra-suite',
    label: 'Entra Suite · componentes',
    description: 'Las 8 familias del mapa interactivo principal.',
    root: { top: 'MICROSOFT', main: 'Entra ID' },
    ecoHubLabel: 'ECOSISTEMA',
    families: [
      { cat: 'core',       items: ['users','groups','admin-units','custom-attributes'] },
      { cat: 'access',     items: ['conditional-access','mfa','auth-methods','passkeys','auth-strengths','cae','token-protection','named-locations'] },
      { cat: 'governance', items: ['pim','entitlement-mgmt','access-reviews','lifecycle-workflows','cross-tenant-sync'] },
      { cat: 'protection', items: ['identity-protection','sign-in-logs','risk-policies'] },
      { cat: 'workload',   items: ['app-registrations','service-principals','managed-identities','workload-id-premium'] },
      { cat: 'external',   items: ['b2b','external-id','verified-id','cross-tenant-access','entra-connect'] },
      { cat: 'network',    items: ['global-secure-access','internet-access','private-access'] }
    ],
    ecoItems: ['intune','defender-identity','purview','sentinel']
  },

  // ── 2) Entra ID — Deep dive (admin portal nav structure) ───────────────────
  {
    id: 'entra-id-deep',
    label: 'Entra ID · deep dive (portal nav)',
    description: 'Estructura del Centro de administración Entra ID.',
    root: { top: 'MICROSOFT', main: 'Entra ID' },
    ecoHubLabel: 'HYBRID MGMT',
    families: [
      { cat: 'core', label: 'USERS', items: [
        { id:'eid-users-licenses', name:'Licenses', cat:'core' },
        { id:'eid-users-assigned-roles', name:'Assigned roles', cat:'core' },
        { id:'eid-users-azure-roles', name:'Azure role assignments', cat:'core' },
        { id:'eid-users-auth-methods', name:'Authentication methods', cat:'core' },
        { id:'eid-users-sspr', name:'Self-service password reset', cat:'core' },
        { id:'eid-users-settings', name:'User settings', cat:'core' }
      ]},
      { cat: 'core', label: 'GROUPS', items: [
        { id:'eid-groups-azure', name:'Azure role assignments', cat:'core' },
        { id:'eid-groups-au', name:'Administrative units', cat:'core' },
        { id:'eid-groups-ssgm', name:'Self-service group mgmt', cat:'core' },
        { id:'eid-groups-expiration', name:'Group expiration', cat:'core' },
        { id:'eid-groups-naming', name:'Group naming policy', cat:'core' },
        { id:'eid-groups-pim', name:'PIM for Groups', cat:'core' },
        { id:'eid-groups-dynamic', name:'Dynamic groups', cat:'core' }
      ]},
      { cat: 'external', label: 'EXTERNAL IDENTITIES', items: [
        { id:'eid-ext-collab', name:'External collaboration settings', cat:'external' },
        { id:'eid-ext-cta', name:'Cross-tenant access', cat:'external' },
        { id:'eid-ext-cts', name:'Cross-tenant synchronization', cat:'external' },
        { id:'eid-ext-idp', name:'Identity providers', cat:'external' }
      ]},
      { cat: 'access', label: 'CONDITIONAL ACCESS', items: [
        { id:'eid-ca-locations', name:'Named locations', cat:'access' },
        { id:'eid-ca-controls', name:'Custom controls', cat:'access' },
        { id:'eid-ca-tou', name:'Terms of use', cat:'access' },
        { id:'eid-ca-authctx', name:'Authentication context', cat:'access' },
        { id:'eid-ca-strengths', name:'Authentication strengths', cat:'access' },
        { id:'eid-ca-cae', name:'Continuous access evaluation', cat:'access' },
        { id:'eid-ca-sif', name:'Sign-in frequency', cat:'access' },
        { id:'eid-ca-token', name:'Token protection', cat:'access' },
        { id:'eid-ca-mam', name:'App protection (MAM)', cat:'access' },
        { id:'eid-ca-compliance', name:'Device compliance', cat:'access' }
      ]},
      { cat: 'protection', label: 'PROTECT & SECURE', items: [
        { id:'eid-prot-idp', name:'Identity Protection', cat:'protection' },
        { id:'eid-prot-score', name:'Identity Secure Score', cat:'protection' },
        { id:'eid-prot-whfb', name:'Windows Hello for Business', cat:'protection' },
        { id:'eid-prot-fido2', name:'Passkeys — FIDO2 key', cat:'protection' },
        { id:'eid-prot-passkey-ma', name:'Passkey in MS Authenticator', cat:'protection' },
        { id:'eid-prot-cert', name:'Certificate-based auth', cat:'protection' },
        { id:'eid-prot-macos', name:'Platform Credential for macOS', cat:'protection' },
        { id:'eid-prot-authenticator', name:'Microsoft Authenticator app', cat:'protection' },
        { id:'eid-prot-tap', name:'Temporary access pass', cat:'protection' },
        { id:'eid-prot-csa', name:'Custom security attributes', cat:'protection' }
      ]},
      { cat: 'workload', label: 'APPLICATIONS', items: [
        { id:'eid-app-prov', name:'Application & HR provisioning', cat:'workload' },
        { id:'eid-app-gallery', name:'Application gallery', cat:'workload' },
        { id:'eid-app-ssa', name:'Self-service access', cat:'workload' },
        { id:'eid-app-myapps', name:'My Apps', cat:'workload' },
        { id:'eid-app-consent', name:'Consent and permissions', cat:'workload' },
        { id:'eid-app-restr', name:'Tenant restrictions', cat:'workload' },
        { id:'eid-app-proxy', name:'Application proxy', cat:'workload' },
        { id:'eid-app-mi', name:'Managed identities', cat:'workload' },
        { id:'eid-app-fed', name:'Workload identity federation', cat:'workload' },
        { id:'eid-app-customauth', name:'Custom authentication extensions', cat:'workload' }
      ]},
      { cat: 'governance', label: 'ROLES & ADMINS', items: [
        { id:'eid-roles-au', name:'Administrative units', cat:'governance' },
        { id:'eid-roles-restr-au', name:'Restricted admin units', cat:'governance' },
        { id:'eid-roles-delegated', name:'Delegated admin partners', cat:'governance' },
        { id:'eid-roles-protected', name:'Protected actions', cat:'governance' }
      ]},
      { cat: 'protection', label: 'MONITORING & HEALTH', items: [
        { id:'eid-mon-signin', name:'Sign-in logs', cat:'protection' },
        { id:'eid-mon-audit', name:'Audit logs', cat:'protection' },
        { id:'eid-mon-prov', name:'Provisioning logs', cat:'protection' },
        { id:'eid-mon-la', name:'Log Analytics', cat:'protection' },
        { id:'eid-mon-diag', name:'Diagnostic settings', cat:'protection' },
        { id:'eid-mon-wbk', name:'Workbooks', cat:'protection' },
        { id:'eid-mon-insights', name:'Usage & insights', cat:'protection' },
        { id:'eid-mon-aad-health', name:'AAD Connect Health', cat:'protection' }
      ]}
    ],
    ecoItems: [
      { id:'eid-hyb-connect', name:'Connect Sync', cat:'ecosystem' },
      { id:'eid-hyb-cloud', name:'Cloud Sync', cat:'ecosystem' },
      { id:'eid-hyb-phs', name:'Password hash sync', cat:'ecosystem' },
      { id:'eid-hyb-pta', name:'Pass-through authentication', cat:'ecosystem' },
      { id:'eid-hyb-fed', name:'Federation', cat:'ecosystem' },
      { id:'eid-hyb-sso', name:'Seamless SSO', cat:'ecosystem' }
    ]
  },

  // ── 3) Microsoft Admin Roles (3-column taxonomy) ───────────────────────────
  {
    id: 'admin-roles',
    label: 'Microsoft Admin Roles',
    description: 'Cross-service · Entra ID-specific · Service-specific.',
    root: { top: 'MICROSOFT', main: 'Admin Roles' },
    ecoHubLabel: 'CROSS-SERVICE',
    presetCategories: {
      'role-cross':   { color: '#E24B4A', bg: '#FBE6E6', label: 'Cross-service' },
      'role-entra':   { color: '#C97A14', bg: '#FBF1DE', label: 'Entra ID-specific' },
      'role-service': { color: '#3B5DD9', bg: '#E6EAFB', label: 'Service-specific' }
    },
    families: [
      { cat: 'role-entra', label: 'APPLICATION', items: [
        { id:'r-app-admin', name:'Application Administrator', cat:'role-entra' },
        { id:'r-app-dev', name:'Application Developer', cat:'role-entra' },
        { id:'r-app-cloud', name:'Cloud Application Admin', cat:'role-entra' }
      ]},
      { cat: 'role-entra', label: 'AUTHENTICATION', items: [
        { id:'r-auth-admin', name:'Authentication Administrator', cat:'role-entra' },
        { id:'r-auth-ext', name:'Authentication Extensibility Admin', cat:'role-entra' },
        { id:'r-auth-policy', name:'Authentication Policy Admin', cat:'role-entra' },
        { id:'r-auth-priv', name:'Privileged Authentication Admin', cat:'role-entra' }
      ]},
      { cat: 'role-entra', label: 'CUSTOM SECURITY ATTRIBUTE', items: [
        { id:'r-attr-assign-admin', name:'Attribute Assignment Admin', cat:'role-entra' },
        { id:'r-attr-assign-reader', name:'Attribute Assignment Reader', cat:'role-entra' },
        { id:'r-attr-def-admin', name:'Attribute Definition Admin', cat:'role-entra' },
        { id:'r-attr-def-reader', name:'Attribute Definition Reader', cat:'role-entra' },
        { id:'r-attr-log-admin', name:'Attribute Log Admin', cat:'role-entra' },
        { id:'r-attr-log-reader', name:'Attribute Log Reader', cat:'role-entra' }
      ]},
      { cat: 'role-entra', label: 'DEVICE / DIRECTORY', items: [
        { id:'r-dev-cloud', name:'Cloud Device Admin', cat:'role-entra' },
        { id:'r-dev-local', name:'Entra Joined Device Local Admin', cat:'role-entra' },
        { id:'r-dir-readers', name:'Directory Readers', cat:'role-entra' },
        { id:'r-dir-sync', name:'Directory Synchronization Accounts', cat:'role-entra' },
        { id:'r-dir-writers', name:'Directory Writers', cat:'role-entra' }
      ]},
      { cat: 'role-entra', label: 'EXTERNAL ID', items: [
        { id:'r-ext-b2c-key', name:'B2C IEF Keyset Admin', cat:'role-entra' },
        { id:'r-ext-b2c-pol', name:'B2C IEF Policy Admin', cat:'role-entra' },
        { id:'r-ext-flow', name:'External ID User Flow Admin', cat:'role-entra' },
        { id:'r-ext-flow-attr', name:'External ID User Flow Attribute Admin', cat:'role-entra' },
        { id:'r-ext-idp', name:'External Identity Provider Admin', cat:'role-entra' },
        { id:'r-ext-guest', name:'Guest Inviter', cat:'role-entra' }
      ]},
      { cat: 'role-entra', label: 'IDENTITY GOVERNANCE', items: [
        { id:'r-ig-id', name:'Identity Governance Administrator', cat:'role-entra' },
        { id:'r-ig-lcw', name:'Lifecycle Workflows Administrator', cat:'role-entra' },
        { id:'r-ig-priv', name:'Privileged Role Administrator', cat:'role-entra' },
        { id:'r-ig-sec', name:'Security Administrator (Entra)', cat:'role-entra' }
      ]},
      { cat: 'role-entra', label: 'OTHER ENTRA-SPECIFIC', items: [
        { id:'r-gsa', name:'Global Secure Access Admin', cat:'role-entra' },
        { id:'r-grp', name:'Groups Administrator', cat:'role-entra' },
        { id:'r-help-admin', name:'Helpdesk Administrator', cat:'role-entra' },
        { id:'r-pwd-admin', name:'Password Administrator', cat:'role-entra' },
        { id:'r-lic', name:'License Administrator', cat:'role-entra' },
        { id:'r-perm', name:'Permissions Mgmt Administrator', cat:'role-entra' },
        { id:'r-rep', name:'Reports Reader', cat:'role-entra' },
        { id:'r-ca-admin', name:'Conditional Access Administrator', cat:'role-entra' },
        { id:'r-tenant-domain', name:'Domain Name Administrator', cat:'role-entra' },
        { id:'r-tenant-brand', name:'Organizational Branding Admin', cat:'role-entra' },
        { id:'r-user-hyb', name:'Hybrid Identity Administrator', cat:'role-entra' },
        { id:'r-user-admin', name:'User Administrator', cat:'role-entra' }
      ]},
      { cat: 'role-service', label: 'INTUNE · DEFENDER', items: [
        { id:'r-intune-admin', name:'Intune Administrator', cat:'role-service' },
        { id:'r-intune-desktop', name:'Desktop Analytics Admin', cat:'role-service' },
        { id:'r-intune-wu', name:'Windows Update Deployment Admin', cat:'role-service' },
        { id:'r-def-attack-author', name:'Attack Payload Author', cat:'role-service' },
        { id:'r-def-attack-sim', name:'Attack Simulation Admin', cat:'role-service' },
        { id:'r-def-mdca', name:'Cloud App Security Admin', cat:'role-service' }
      ]},
      { cat: 'role-service', label: 'M365 / TEAMS / SHAREPOINT', items: [
        { id:'r-m365-search-admin', name:'Search Administrator', cat:'role-service' },
        { id:'r-m365-office', name:'Office Apps Administrator', cat:'role-service' },
        { id:'r-m365-knowledge', name:'Knowledge Administrator', cat:'role-service' },
        { id:'r-m365-msgcenter', name:'Message Center Reader', cat:'role-service' },
        { id:'r-spo', name:'SharePoint Administrator', cat:'role-service' },
        { id:'r-spo-embedded', name:'SharePoint Embedded Admin', cat:'role-service' },
        { id:'r-teams', name:'Teams Administrator', cat:'role-service' },
        { id:'r-teams-comm', name:'Teams Communications Admin', cat:'role-service' },
        { id:'r-teams-dev', name:'Teams Devices Admin', cat:'role-service' },
        { id:'r-exch', name:'Exchange Administrator', cat:'role-service' },
        { id:'r-exch-rec', name:'Exchange Recipient Admin', cat:'role-service' },
        { id:'r-pv-aip', name:'Azure Information Protection Admin', cat:'role-service' },
        { id:'r-pv-lockbox', name:'Customer LockBox Access Approver', cat:'role-service' }
      ]}
    ],
    ecoItems: [
      { id:'r-cross-billing', name:'Billing Administrator', cat:'role-cross' },
      { id:'r-cross-comp', name:'Compliance Administrator', cat:'role-cross' },
      { id:'r-cross-compdata', name:'Compliance Data Admin', cat:'role-cross' },
      { id:'r-cross-ga', name:'Global Administrator', cat:'role-cross' },
      { id:'r-cross-gr', name:'Global Reader', cat:'role-cross' },
      { id:'r-cross-secadm', name:'Security Administrator', cat:'role-cross' },
      { id:'r-cross-secop', name:'Security Operator', cat:'role-cross' },
      { id:'r-cross-secread', name:'Security Reader', cat:'role-cross' },
      { id:'r-cross-ssa', name:'Service Support Admin', cat:'role-cross' }
    ]
  },

  // ── 4) External ID Deployment Guide ────────────────────────────────────────
  {
    id: 'external-id-deploy',
    label: 'External ID · Deployment Guide',
    description: 'Las 6 áreas a cubrir al desplegar External ID (CIAM).',
    root: { top: 'MICROSOFT ENTRA', main: 'External ID' },
    ecoHubLabel: 'CUSTOMIZE',
    presetCategories: {
      'ext-tenant':   { color: '#8541C5', bg: '#F0E7FA', label: 'Tenant Design' },
      'ext-customize':{ color: '#C97A14', bg: '#FBF1DE', label: 'Customize' },
      'ext-security': { color: '#E24B4A', bg: '#FBE6E6', label: 'Security' },
      'ext-ux':       { color: '#0F9D6A', bg: '#E6F6EE', label: 'User Experience' },
      'ext-audit':    { color: '#0891A6', bg: '#E0F4F7', label: 'Auditing & Monitoring' },
      'ext-auth':     { color: '#3B5DD9', bg: '#E6EAFB', label: 'Auth & Access Control' }
    },
    families: [
      { cat: 'ext-tenant', label: 'TENANT DESIGN', items: [
        { id:'ex-td-userdir', name:'User directory', cat:'ext-tenant' },
        { id:'ex-td-attrsel', name:'Attribute selection', cat:'ext-tenant' },
        { id:'ex-td-attrs', name:'Attributes in user directory', cat:'ext-tenant' },
        { id:'ex-td-migr', name:'User data migration', cat:'ext-tenant' },
        { id:'ex-td-naming', name:'Naming convention', cat:'ext-tenant' },
        { id:'ex-td-refarch', name:'Reference architecture', cat:'ext-tenant' },
        { id:'ex-td-admin', name:'Administration', cat:'ext-tenant' },
        { id:'ex-td-dirops', name:'Directory data operations', cat:'ext-tenant' },
        { id:'ex-td-compliance', name:'Compliance', cat:'ext-tenant' },
        { id:'ex-td-limits', name:'Service limits', cat:'ext-tenant' }
      ]},
      { cat: 'ext-customize', label: 'CUSTOMIZE', items: [
        { id:'ex-cu-workflows', name:'Custom workflows', cat:'ext-customize' }
      ]},
      { cat: 'ext-security', label: 'SECURITY', items: [
        { id:'ex-se-mfa', name:'Multi-factor authentication', cat:'ext-security' },
        { id:'ex-se-endpoint', name:'Endpoint protection', cat:'ext-security' },
        { id:'ex-se-sso', name:'Single sign-on (SSO)', cat:'ext-security' },
        { id:'ex-se-rbac', name:'Role-based access control', cat:'ext-security' },
        { id:'ex-se-edge', name:'Edge protection with custom domains', cat:'ext-security' },
        { id:'ex-se-ddos', name:'Distributed denial of service', cat:'ext-security' },
        { id:'ex-se-irsf', name:'International Revenue Share Fraud', cat:'ext-security' },
        { id:'ex-se-signup', name:'Sign-up fraud', cat:'ext-security' },
        { id:'ex-se-takeover', name:'Account takeover', cat:'ext-security' },
        { id:'ex-se-fed', name:'Workload identity federation', cat:'ext-security' },
        { id:'ex-se-customauth', name:'Custom auth extensions', cat:'ext-security' }
      ]},
      { cat: 'ext-ux', label: 'USER EXPERIENCE', items: [
        { id:'ex-ux-brand', name:'Branding', cat:'ext-ux' },
        { id:'ex-ux-social', name:'Social Identity Providers', cat:'ext-ux' },
        { id:'ex-ux-ss', name:'Self-service', cat:'ext-ux' },
        { id:'ex-ux-redirect', name:'Web browser redirect', cat:'ext-ux' },
        { id:'ex-ux-native', name:'Native user experience', cat:'ext-ux' },
        { id:'ex-ux-graph', name:'Microsoft Graph API experience', cat:'ext-ux' }
      ]},
      { cat: 'ext-audit', label: 'AUDITING & MONITORING', items: [
        { id:'ex-au-logs', name:'Auditing and logs', cat:'ext-audit' },
        { id:'ex-au-alert', name:'Monitor and alert', cat:'ext-audit' },
        { id:'ex-au-degrad', name:'Service degradation alerting', cat:'ext-audit' },
        { id:'ex-au-usage', name:'Monitor usage', cat:'ext-audit' }
      ]},
      { cat: 'ext-auth', label: 'AUTH & ACCESS CONTROL', items: [
        { id:'ex-ac-native', name:'Native client: mobile & platform', cat:'ext-auth' },
        { id:'ex-ac-web', name:'Web applications on server', cat:'ext-auth' },
        { id:'ex-ac-spa', name:'SPA (single-page application)', cat:'ext-auth' },
        { id:'ex-ac-middleware', name:'Web app on server: middleware', cat:'ext-auth' },
        { id:'ex-ac-limited', name:'Limited input device', cat:'ext-auth' },
        { id:'ex-ac-ext', name:'Custom auth extension design', cat:'ext-auth' },
        { id:'ex-ac-api', name:'API and event handler considerations', cat:'ext-auth' }
      ]}
    ],
    ecoItems: [
      { id:'ex-cu-hub-1', name:'Branding hub', cat:'ext-customize' },
      { id:'ex-cu-hub-2', name:'Workflows hub', cat:'ext-customize' },
      { id:'ex-cu-hub-3', name:'Layout hub', cat:'ext-customize' }
    ]
  }
]

// Lookup helpers
export function getPreset(id) {
  return MINDMAP_PRESETS.find(p => p.id === id) || MINDMAP_PRESETS[0]
}

// Normalize an item (string id or inline object) to a card definition.
// Returns { id, name, cat, sublabel?, iconSvg?, description?, learnUrl?, _real }
export function resolveItem(item, componentMap) {
  if (typeof item === 'string') {
    const c = componentMap[item]
    if (!c) return null
    return { id: c.id, name: c.name, cat: c.category, sublabel: c.sublabel,
             iconSvg: c.iconSvg, description: c.description, learnUrl: c.learnUrl, _real: true }
  }
  return { ...item, _real: false }
}
