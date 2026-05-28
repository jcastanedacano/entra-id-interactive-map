// Pre-built scenarios — overlay node sets with problem/outcome narrative.

export const SCENARIO_GROUPS = [
  {
    label: 'Compliance & framework',
    scenarios: [
      {
        id: 'zero-trust', title: 'Zero Trust · Identity Pillar',
        problem: 'NIST SP 800-207 y Microsoft Zero Trust exigen verificar explícitamente cada acceso, usar acceso mínimo y asumir brecha. Sin Conditional Access + MFA + risk + device compliance + CAE, no hay verificación explícita real.',
        outcome: 'Conditional Access es el chokepoint. MFA/Passkeys autentican fuerte. Identity Protection eleva risk. Intune valida compliant device. CAE revoca near-real-time. PIM elimina standing privilege.',
        nodes: ['conditional-access','mfa','passkeys','identity-protection','risk-policies','cae','intune','pim']
      },
      {
        id: 'nist-ia', title: 'NIST 800-53 · IA (Identification & Auth)',
        problem: 'Familia IA exige MFA para acceso privilegiado y network, gestionar identificadores y autenticadores, y reautenticación tras eventos críticos. Auditores requieren evidencia.',
        outcome: 'Auth Methods Policy + Authentication Strengths cubren IA-2(1)/(2). Passkeys cubren IA-2(11). PIM cubre IA-2(6) + AC-6. Sign-in logs proveen evidencia. CAE cubre la reautenticación.',
        nodes: ['auth-methods','passkeys','auth-strengths','pim','sign-in-logs','cae','conditional-access']
      },
      {
        id: 'iso-27001-ac', title: 'ISO 27001:2022 · Access Control (A.5/A.8)',
        problem: 'Anexo A controles 5.15-5.18 (access control, gestión de derechos, privileged access) y 8.5 (secure authentication). Necesario evidenciar revisión periódica de accesos.',
        outcome: 'Conditional Access + MFA cubren A.5.17/8.5. PIM cubre A.5.15/5.18 (privileged). Access Reviews + Entitlement Mgmt evidencian A.5.18 review. Lifecycle Workflows automatizan JML.',
        nodes: ['conditional-access','mfa','pim','access-reviews','entitlement-mgmt','lifecycle-workflows']
      },
      {
        id: 'nis2-identity', title: 'NIS2 · Identity & Access',
        problem: 'NIS2 (essential/important entities) exige autenticación multifactor o equivalente para acceso a sistemas relevantes y gestión del ciclo de vida de cuentas. Reporte 24h/72h.',
        outcome: 'MFA + Passkeys = "equivalent or stronger". Lifecycle Workflows automatiza JML. Sentinel correlaciona para timeline de incidentes y reporte. Identity Protection detecta credenciales filtradas.',
        nodes: ['mfa','passkeys','lifecycle-workflows','identity-protection','sentinel','conditional-access']
      }
    ]
  },
  {
    label: 'Use case · attack & defense',
    scenarios: [
      {
        id: 'uc-aitm', title: 'AiTM / Token theft attempt',
        problem: 'Atacante usa proxy de phishing (EvilGinx) para robar token + cookie de un usuario. Sin defensas, replica la sesión desde su máquina y bypassea MFA.',
        outcome: 'Token Protection liga el token al device originador. Identity Protection detecta el "anomalous token". CAE revoca en minutos. Risk-based CA fuerza re-auth con passkey. Sentinel hunting confirma alcance.',
        nodes: ['token-protection','identity-protection','risk-policies','cae','passkeys','sentinel','conditional-access']
      },
      {
        id: 'uc-pwd-spray', title: 'Password spray attack',
        problem: 'Botnet lanza spray contra miles de cuentas con passwords comunes. Sin MFA y sin detección, una cuenta cae y arranca el ataque.',
        outcome: 'Identity Protection detecta el patrón (sign-in risk: password spray). Conditional Access bloquea/eleva. Defender for Identity correlaciona con AD. Sentinel correlaciona y dispara playbook (disable user).',
        nodes: ['identity-protection','risk-policies','conditional-access','defender-identity','sentinel','sign-in-logs']
      },
      {
        id: 'uc-lateral', title: 'On-prem credential theft → cloud lateral movement',
        problem: 'Compromiso en AD on-prem (Kerberoasting, NTLM relay). Atacante extrae hash, salta a Entra ID via cuenta sincronizada, busca elevación a Global Admin.',
        outcome: 'Defender for Identity detecta el ataque on-prem. PIM bloquea elevación standing. Identity Protection eleva risk del usuario. Risk policies fuerzan password change. Sentinel encadena la kill-chain.',
        nodes: ['defender-identity','pim','identity-protection','risk-policies','sentinel','conditional-access']
      },
      {
        id: 'uc-workload-leak', title: 'Service principal credential leak (GitHub)',
        problem: 'Un developer commitea un client secret a un repo público. Bots lo recogen en minutos y empiezan a llamar a Graph desde IPs no esperadas.',
        outcome: 'Identity Protection (Workload ID) detecta "leaked credentials" y "anomalous SP sign-in". Workload ID Premium aplica CA que bloquea IPs fuera de Named Locations. Access Reviews recurrentes evitan SPs zombi.',
        nodes: ['workload-id-premium','identity-protection','risk-policies','named-locations','access-reviews','service-principals']
      },
      {
        id: 'uc-byod-copilot', title: 'BYOD + Copilot data exposure',
        problem: 'Un empleado accede a M365 + Copilot desde un dispositivo personal no compliant. Riesgo de exfiltración a través del browser.',
        outcome: 'CA exige compliant device o browser via app protection policy. Intune verifica el device. Purview labels + container CA limitan acceso a SharePoint sensible. Internet Access (SWG) aplica filtering.',
        nodes: ['conditional-access','intune','purview','internet-access','global-secure-access']
      },
      {
        id: 'uc-ca-optim', title: 'CA gaps detectados por agente (autonomous)',
        problem: 'Auditoría revela ~47 apps sin Conditional Access aplicada, usuarios privilegiados fuera de scope CA, policies obsoletas y solapadas. Equipo IAM no tiene capacidad de auditarlo manualmente.',
        outcome: 'CA Optimization Agent (Security Copilot) analiza Sign-in Logs + CA policies, detecta gaps, overlap y missing Zero Trust controls. Sugiere policies con one-click apply. Admin aprueba en workflow. Evidence en Sign-in Logs + Sentinel.',
        nodes: ['agent-ca-optim','security-copilot','conditional-access','sign-in-logs','sentinel']
      },
      {
        id: 'uc-agent-risky', title: 'Respuesta autónoma a usuario en riesgo',
        problem: 'Credenciales del usuario aparecen en un dump conocido + sign-in atípico desde otro continente. SOC saturado, MTTR > 4h.',
        outcome: 'Risky User Remediation Agent investiga el risk event, propone password reset + token revoke vía CAE + bloqueo temporal. Admin aprueba en 1 click. Tiempo de respuesta < 10 min. Sin SOC en el loop.',
        nodes: ['agent-risky-user','security-copilot','identity-protection','risk-policies','cae','sentinel']
      },
      {
        id: 'uc-agent-cleanup', title: 'Cleanup masivo de SPs huérfanos + reviewer fatigue',
        problem: 'Tras 3 años, el tenant tiene 800 service principals (200 sin uso en 90+ días) y los reviewers tardan semanas en cada ciclo de access review por volumen.',
        outcome: 'App Lifecycle Agent identifica SPs riesgosos/inactivos, dispara recertificaciones; Access Review Agent analiza usage + recomienda approve/remove decisions. Reviewer aprueba en lote. Cleanup en días, no semanas.',
        nodes: ['agent-app-lifecycle','agent-access-review','security-copilot','service-principals','access-reviews','entitlement-mgmt']
      },
      {
        id: 'uc-multitenant-secret', title: 'Multi-tenant app secret compromise · ataque silencioso cross-tenant',
        problem: 'El App Registration ABC del tenant Owner es multi-tenant (signInAudience: AzureADMultipleOrgs). Tenants Cliente A y B consintieron la app y crearon Service Principals con permisos Mail.Read + Files.Read.All. El client_secret XYZ se filtra (commit GitHub, log dump). El attacker NO ataca el App Registration del owner: ataca los Service Principals en los tenants de los clientes — POST a /{tenant-cliente}/oauth2/v2.0/token con grant_type=client_credentials → Entra del cliente valida que el SP existe + tiene permisos consentidos → emite token → API calls a Graph. El owner no ve actividad anómala porque toda la actividad ocurre en sign-in logs de los tenants clientes, no en el suyo.',
        outcome: 'Workload ID Premium aplica CA al SP en cada tenant cliente. Named Locations restringe el SP a IPs/regiones esperadas (datacenter del owner). Identity Protection (Workload) emite "leaked credentials" + "anomalous SP sign-in" en el tenant del cliente. Risk-Based Policies bloquea. CAE revoca tokens activos. Cross-Tenant Access Settings del cliente puede bloquear el SP del owner explícitamente. Owner rota secret y migra a Federated Credentials (sin secret = sin leak posible).',
        nodes: ['app-registrations','service-principals','cross-tenant-access','workload-id-premium','named-locations','identity-protection','risk-policies','cae','sign-in-logs','agent-app-lifecycle','sentinel']
      }
    ]
  },
  {
    label: 'Deployment model',
    scenarios: [
      {
        id: 'dp-passwordless', title: 'Deployment · Passwordless rollout',
        problem: 'Phishing y password spray son el vector #1. Objetivo: eliminar passwords del flujo de auth en ~6 meses, manteniendo break-glass.',
        outcome: 'Auth Methods Policy habilita Passkeys + WHfB. TAP onboardea sin password. Authentication Strengths exige phishing-resistant para apps sensibles. PIM solo activable con passkey. FIDO2 keys = break-glass.',
        nodes: ['auth-methods','passkeys','mfa','auth-strengths','pim','conditional-access']
      },
      {
        id: 'dp-jml', title: 'Deployment · Joiner-Mover-Leaver automation',
        problem: 'Onboarding manual de empleados toma 3-5 días, leaver olvidados, accesos heredados acumulados. HR no se entera de "movers".',
        outcome: 'Lifecycle Workflows dispara desde Workday/SuccessFactors. Joiner pide TAP + welcome email + access packages. Mover revoca old / asigna new. Leaver disable + revoke + grace + delete. Access Reviews recertifican.',
        nodes: ['lifecycle-workflows','entitlement-mgmt','access-reviews','groups','users']
      },
      {
        id: 'dp-pim-zero-standing', title: 'Deployment · Zero standing privilege (PIM)',
        problem: 'Auditoría detecta 47 Global Admins permanentes. Estándar interno exige máximo 5 break-glass + 0 permanentes.',
        outcome: 'PIM convierte assignments en Eligible. Activación exige justificación + approval + Phishing-Resistant MFA. PIM Access Reviews cada 90 días. Auditoría queda en Sign-in Logs + Sentinel.',
        nodes: ['pim','auth-strengths','access-reviews','conditional-access','sign-in-logs']
      },
      {
        id: 'dp-gsa', title: 'Deployment · GSA · Reemplazo de VPN',
        problem: 'VPN tradicional concede acceso de red plano. Costoso, lento y rompe Zero Trust. Quieres SSE + ZTNA por app.',
        outcome: 'Global Secure Access instala client. Private Access publica apps via connectors (no inbound firewall). Internet Access aplica SWG + Compliant Network claim para CA. Source IP restoration mantiene logs.',
        nodes: ['global-secure-access','private-access','internet-access','conditional-access']
      },
      {
        id: 'dp-b2b-ext', title: 'Deployment · B2B + External Collaboration',
        problem: 'Compartir con partners hoy es caos: cuentas duplicadas, sin recertificación, contractors con acceso eterno. Necesitas onboarding gobernado.',
        outcome: 'B2B + Cross-Tenant Access Settings confían MFA del partner. Connected Organization permite self-service. Entitlement Mgmt empaqueta acceso con expiración + AR. Cross-Tenant Sync para subsidiarias.',
        nodes: ['b2b','cross-tenant-access','entitlement-mgmt','access-reviews','cross-tenant-sync']
      }
    ]
  },
  {
    label: 'Identity flow',
    scenarios: [
      {
        id: 'fl-sign-in', title: 'Flow · Sign-in con CA decision',
        problem: 'Usuario abre Outlook desde un café. ¿Cómo decide Entra si dejar pasar?',
        outcome: 'STS evalúa user + group + location + device + risk + app. CA aplica grants (MFA si untrusted location, compliant device required, auth strength). Sign-in queda en logs y CAE registra session.',
        nodes: ['conditional-access','mfa','intune','identity-protection','named-locations','cae','sign-in-logs']
      },
      {
        id: 'fl-jit-admin', title: 'Flow · JIT activation de Global Admin',
        problem: 'SRE necesita Global Admin por 1h para investigar un incidente.',
        outcome: 'PIM activation → Auth Strength obliga passkey → approval del manager (registrado) → role activo 1h → CA bloquea actividad fuera de admin workstation → auto-deactivation → todo registrado en Sign-in Logs + Sentinel.',
        nodes: ['pim','auth-strengths','passkeys','conditional-access','sign-in-logs','sentinel']
      },
      {
        id: 'fl-risk-response', title: 'Flow · Risky user auto-remediation',
        problem: 'Identity Protection detecta credenciales del usuario en un dump conocido. El usuario sigue trabajando.',
        outcome: 'User Risk = High → Risk-based CA exige password change + MFA. CAE revoca tokens activos. Sign-in Logs trace todo. Sentinel correlaciona con Defender XDR. Si no se remedia en 24h, account disable.',
        nodes: ['identity-protection','risk-policies','cae','conditional-access','sign-in-logs','sentinel']
      }
    ]
  }
]

export const SCENARIO_MAP = Object.fromEntries(
  SCENARIO_GROUPS.flatMap(g => g.scenarios).map(s => [s.id, s])
)
