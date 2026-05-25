// Sub-topic catalog per Entra component. Rendered in DetailPanel.

export const SUBTOPICS = {

  'conditional-access': [
    { id:'sig',  chip:'Sig.',  label:'Signals', url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-conditions',
      desc:'User, group, app, device state, location, risk level, client app, sign-in frequency.' },
    { id:'grnt', chip:'Grant', label:'Grant Controls', url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant',
      desc:'Require MFA, compliant device, hybrid-joined device, app protection policy, terms of use, authentication strength.' },
    { id:'sess', chip:'Sess.', label:'Session Controls', url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-session',
      desc:'Sign-in frequency, persistent browser session, app-enforced restrictions, CAE, token protection, MDCA app control.' },
    { id:'rep',  chip:'Rep.', label:'Report-only & What-If', url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-report-only',
      desc:'Test policies before enforcement; What-If simulator to predict outcome for a specific user/app/device combination.' }
  ],

  'mfa': [
    { id:'auth', chip:'Auth', label:'Microsoft Authenticator', url:'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-authenticator-app',
      desc:'Push + number matching + GPS + biometric. Default recommended method. Supports passwordless sign-in and TAP.' },
    { id:'oath', chip:'OATH', label:'OATH Hardware/Software Tokens', url:'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-oath-tokens',
      desc:'TOTP tokens (HW: YubiKey, Token2; SW: Google Authenticator). Useful when phones not allowed.' },
    { id:'tap',  chip:'TAP',  label:'Temporary Access Pass', url:'https://learn.microsoft.com/en-us/entra/identity/authentication/howto-authentication-temporary-access-pass',
      desc:'Time-limited passcode for bootstrapping passwordless onboarding without password.' },
    { id:'leg',  chip:'Leg.', label:'Legacy (SMS / Voice)', url:'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-phone-options',
      desc:'Phishable. Deprecated for primary MFA; allowed only as fallback. Move users to Authenticator + Passkeys.' }
  ],

  'passkeys': [
    { id:'fido', chip:'FIDO2', label:'FIDO2 Security Keys', url:'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passwordless#fido2-security-keys',
      desc:'YubiKey, Feitian, Token2. Roaming, cross-platform, attestation-validated. Required for break-glass kits.' },
    { id:'wh',   chip:'WHfB',  label:'Windows Hello for Business', url:'https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/',
      desc:'TPM-backed biometric/PIN on Windows. Phishing-resistant. Counts as Passkey + strong-auth.' },
    { id:'pkma', chip:'Pkma',  label:'Passkeys in MS Authenticator', url:'https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-enable-passkey-authenticator',
      desc:'Device-bound passkeys synced via the Authenticator app. iOS + Android. GA 2025.' }
  ],

  'pim': [
    { id:'jit',  chip:'JIT',  label:'JIT Role Activation', url:'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-activate-role',
      desc:'Eligible → Active with justification, MFA, approval, time-limit. Auto-deactivation at expiry.' },
    { id:'app',  chip:'Apprv',label:'Approval Workflows', url:'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/azure-ad-pim-approval-workflow',
      desc:'Multiple approvers per role. Approval required even for tenant admins. Audited.' },
    { id:'ar',   chip:'AR',   label:'PIM Access Reviews', url:'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-access-review',
      desc:'Recurring reviews of eligible role assignments. Reviewers approve/remove; self-review allowed.' },
    { id:'azure',chip:'Azure',label:'PIM for Azure Resources', url:'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-resource-roles-assign-roles',
      desc:'JIT for Azure RBAC scoped to subscription / RG / resource. Same workflow as Entra roles.' }
  ],

  'identity-protection': [
    { id:'sgnr', chip:'Sg.Rsk',label:'Sign-in Risk', url:'https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks',
      desc:'Atypical travel, anonymous IP, malware IP, AiTM, password spray detection, suspicious browser.' },
    { id:'usr',  chip:'Usr Rsk', label:'User Risk', url:'https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-user-experience',
      desc:'Leaked creds, Microsoft threat intel, aggregated sign-in anomalies. Required: dismiss/confirm safe or password change.' },
    { id:'wkr',  chip:'Wrkld', label:'Workload Identity Risk', url:'https://learn.microsoft.com/en-us/entra/id-protection/concept-workload-identity-risk',
      desc:'Leaked creds, suspicious sign-in, anomalous service principal behavior. Requires Workload ID Premium.' }
  ],

  'entitlement-mgmt': [
    { id:'pkg',  chip:'Pkg', label:'Access Packages', url:'https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-create',
      desc:'Bundle groups + apps + SharePoint sites. Define policies (who can request, approvers, expiry, recurring AR).' },
    { id:'cat',  chip:'Cat', label:'Catalogs', url:'https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-catalog-create',
      desc:'Container of related access packages owned by a business unit. Delegated catalog admins.' },
    { id:'ext',  chip:'Ext', label:'Connected Organizations', url:'https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-organization',
      desc:'Allow specific external tenants/domains to request access packages — drives B2B onboarding workflow.' }
  ],

  'lifecycle-workflows': [
    { id:'jnr',  chip:'Jnr', label:'Joiner Workflow', url:'https://learn.microsoft.com/en-us/entra/id-governance/lifecycle-workflow-templates',
      desc:'Pre-hire onboarding: TAP, welcome email, assign manager, add to groups, assign access package.' },
    { id:'mvr',  chip:'Mvr', label:'Mover Workflow', url:'https://learn.microsoft.com/en-us/entra/id-governance/lifecycle-workflow-templates',
      desc:'Job/department change: revoke old access, request new packages, notify manager.' },
    { id:'lvr',  chip:'Lvr', label:'Leaver Workflow', url:'https://learn.microsoft.com/en-us/entra/id-governance/lifecycle-workflow-templates',
      desc:'Pre-leave, leave, post-leave: remove memberships, disable account, revoke licenses, delete after grace.' }
  ],

  'global-secure-access': [
    { id:'ia',   chip:'IA',   label:'Internet Access (SWG)', url:'https://learn.microsoft.com/en-us/entra/global-secure-access/concept-internet-access',
      desc:'TLS inspection, URL filtering, M365 traffic profile, compliant network claim for CA.' },
    { id:'pa',   chip:'PA',   label:'Private Access (ZTNA)', url:'https://learn.microsoft.com/en-us/entra/global-secure-access/concept-private-access',
      desc:'Replaces VPN. Per-app tunnels via connectors. Quick Access for legacy ports.' },
    { id:'src',  chip:'SrcIP',label:'Source IP Restoration', url:'https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-source-ip-restoration',
      desc:'Preserves the original client IP for downstream logs (M365, SaaS) even when traffic goes through GSA.' }
  ],

  'b2b': [
    { id:'inv',  chip:'Inv', label:'Guest Invitations', url:'https://learn.microsoft.com/en-us/entra/external-id/add-users-administrator',
      desc:'Invite by email; recipient redeems and authenticates with home tenant or email OTP.' },
    { id:'fed',  chip:'Fed', label:'Direct Federation (SAML/WS-Fed)', url:'https://learn.microsoft.com/en-us/entra/external-id/direct-federation',
      desc:'Federate with external IdPs that aren\'t Entra (Okta, Ping, third-party SAML).' },
    { id:'red',  chip:'Red.',label:'Cross-Tenant Redemption Settings', url:'https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-settings-b2b-collaboration',
      desc:'Allow/block which users from which partner tenants can be invited. Granular per-user, per-app.' }
  ],

  'app-registrations': [
    { id:'auth', chip:'Auth', label:'Auth Configuration', url:'https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols',
      desc:'Redirect URIs, supported account types (single-tenant, multi-tenant, personal), implicit/auth-code flow.' },
    { id:'perm', chip:'Perm', label:'API Permissions', url:'https://learn.microsoft.com/en-us/entra/identity-platform/permissions-consent-overview',
      desc:'Delegated and application permissions on Microsoft Graph and custom APIs. Admin consent for tenant-wide.' },
    { id:'cred', chip:'Cred', label:'Credentials', url:'https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation',
      desc:'Secrets (avoid), certificates (rotate), or federated credentials (recommended — no secret to leak).' }
  ],

  'verified-id': [
    { id:'iss',  chip:'Issr', label:'Issuer', url:'https://learn.microsoft.com/en-us/entra/verified-id/issuer-openid',
      desc:'Define credential schema, issue VCs to user wallets, support revocation lists.' },
    { id:'ver',  chip:'Verf', label:'Verifier', url:'https://learn.microsoft.com/en-us/entra/verified-id/verifier-openid',
      desc:'Request and verify VCs at sign-in or app onboarding. Trust framework and presentation request.' },
    { id:'wallet',chip:'Wlt', label:'MS Authenticator Wallet', url:'https://learn.microsoft.com/en-us/entra/verified-id/get-started-request-api',
      desc:'Holds the user\'s VCs in the Authenticator app. Cross-platform iOS/Android.' }
  ],

  'cae': [
    { id:'evt',  chip:'Evt',  label:'Critical Events', url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation',
      desc:'User disable, password change, MFA revoke, sign-in risk increase, location change → token revoked in minutes.' },
    { id:'app',  chip:'Apps', label:'Supported Apps', url:'https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-continuous-access-evaluation',
      desc:'Native M365 (Outlook, Teams, OneDrive, SPO), Defender XDR, Sentinel, MS Graph. SaaS support growing.' }
  ]
}
