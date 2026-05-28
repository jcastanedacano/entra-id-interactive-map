// Story View · 3 historias · Use cases (ataques y defensas)
import { pickNodes as pick } from "../storyData.js"

export const STORY_ORDER = ['uc-aitm','uc-pwd-spray','uc-workload-leak','multitenant-secret','agent-ca-optim','agent-risky-response']

export const STORIES = {

  'uc-aitm': {
    id:'uc-aitm',
    title:'AiTM · Token theft',
    tag:'Use case',
    blurb:'Phishing avanzado (EvilGinx) roba token+cookie. ¿Cómo lo detiene Entra moderno?',
    duration:'3 escenas · ~3 min',
    primaryCat:'protection',
    nodes: pick(['token-protection','identity-protection','risk-policies','cae','passkeys','sentinel','conditional-access']),
    scenes: [
      {
        id:1, chip:'Escena 1 · El ataque',
        heading:'EvilGinx termina con un token válido en manos del atacante.',
        narrative:'Usuario hace MFA en una página spoofed. El proxy del atacante reenvía la cookie de sesión + token. En unos minutos el atacante puede leer mail, archivos, Teams. MFA tradicional <b>no protege</b>.',
        insight:'AiTM rompe MFA basado en pushes/SMS. La defensa: <b>auth phishing-resistant</b> (Passkeys) que liga la cred al origen + binding device.',
        introNodes:['conditional-access','passkeys'],
        introEdges:[{a:'passkeys', b:'conditional-access', t:'policy', label:'phishing-resistant'}],
        annotations:[{x:260, y:50, arrow:'down', tone:'edge-policy', body:'<b>Passkey</b><br/><span class="muted">Cred ligada al origen.</span>'}]
      },
      {
        id:2, chip:'Escena 2 · Token Protection + CAE',
        heading:'El token va atado al device. Y si algo cambia, se revoca en minutos.',
        narrative:'<b>Token Protection</b> liga el refresh token al device originador — el atacante no puede usarlo desde otra máquina. <b>CAE</b> revoca el token al primer signo de risk o cambio de IP/sesión.',
        insight:'Sin Token Protection + CAE, un token vive 60-90 minutos sin remedio. Con ambos: minutos y atado al hardware correcto.',
        introNodes:['token-protection','cae'],
        introEdges:[
          {a:'token-protection', b:'conditional-access', t:'policy', label:'bind session'},
          {a:'conditional-access', b:'cae', t:'signal', label:'critical events'},
          {a:'token-protection', b:'cae', t:'signal', label:'token tampering'}
        ],
        annotations:[{x:430, y:50, arrow:'down', tone:'default', body:'<b>Token bound</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Detect + respond',
        heading:'Identity Protection detecta el anomalous token. Sentinel encadena.',
        narrative:'<b>Identity Protection</b> detecta "anomalous token" o "unfamiliar sign-in properties". <b>Risk policies</b> fuerzan password reset y re-auth con passkey. <b>Sentinel</b> recoge el evento y dispara playbook (disable user, kill sessions).',
        insight:'Detect + respond automatizado evita que el SOC dependa de manual triage. KQL hunting confirma alcance lateral.',
        introNodes:['identity-protection','risk-policies','sentinel'],
        introEdges:[
          {a:'identity-protection', b:'risk-policies', t:'signal', label:'risk level'},
          {a:'risk-policies', b:'conditional-access', t:'policy', label:'force re-auth'},
          {a:'identity-protection', b:'sentinel', t:'data', label:'risk events'}
        ],
        annotations:[{x:430, y:200, arrow:'left', tone:'edge-signal', body:'<b>Auto-respond</b>'}]
      }
    ]
  },

  'uc-pwd-spray': {
    id:'uc-pwd-spray',
    title:'Password spray',
    tag:'Use case',
    blurb:'Botnet intenta passwords comunes contra miles de cuentas. Una cae.',
    duration:'3 escenas · ~3 min',
    primaryCat:'protection',
    nodes: pick(['identity-protection','risk-policies','conditional-access','defender-identity','sentinel','sign-in-logs']),
    scenes: [
      {
        id:1, chip:'Escena 1 · El spray',
        heading:'Miles de intentos lentos desde IPs residenciales rotando.',
        narrative:'Atacante usa lista de usernames (LinkedIn) + passwords comunes (Spring2025!, Empresa@123). Velocidad baja para evitar lockouts. Sin MFA, una cuenta cede.',
        insight:'Sin MFA universal, el spray funciona. Sin detección, no te enteras. Sin risk policies, no respondes.',
        introNodes:['sign-in-logs','identity-protection'],
        introEdges:[{a:'sign-in-logs', b:'identity-protection', t:'signal', label:'baseline'}],
        annotations:[{x:430, y:50, arrow:'down', tone:'default', body:'<b>Sign-in telemetry</b>'}]
      },
      {
        id:2, chip:'Escena 2 · Detección + respuesta automática',
        heading:'Identity Protection reconoce el patrón. Risk policies escalan.',
        narrative:'<b>Identity Protection</b> dispara detección "password spray" + "leaked credentials". <b>Risk-based CA</b> exige password change inmediato + MFA. <b>CAE</b> revoca sesiones vigentes.',
        insight:'La acción se ejecuta sin SOC en el loop. Para High Risk: block hasta intervención del admin.',
        introNodes:['risk-policies','conditional-access'],
        introEdges:[
          {a:'identity-protection', b:'risk-policies', t:'signal', label:'risk level'},
          {a:'risk-policies', b:'conditional-access', t:'policy', label:'force reset+MFA'}
        ],
        annotations:[{x:430, y:120, arrow:'down', tone:'edge-policy', body:'<b>Auto-remediate</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Correlación + caza',
        heading:'Defender for Identity ve el AD. Sentinel ata la kill chain.',
        narrative:'<b>Defender for Identity</b> detecta intentos paralelos contra AD on-prem. <b>Sentinel</b> correlaciona Entra + AD + endpoints, ejecuta playbook SOAR (disable user, notify SecOps), retiene 12 años para forensics.',
        insight:'La correlación cross-domain es lo que convierte señales aisladas en una incidencia con kill chain trazable.',
        introNodes:['defender-identity','sentinel'],
        introEdges:[
          {a:'defender-identity', b:'identity-protection', t:'signal', label:'AD ITDR'},
          {a:'defender-identity', b:'sentinel', t:'data', label:'alerts'},
          {a:'sentinel', b:'risk-policies', t:'signal', label:'custom risk'}
        ],
        annotations:[{x:870, y:50, arrow:'down', tone:'edge-signal', body:'<b>Cross-domain hunt</b>'}]
      }
    ]
  },

  'uc-workload-leak': {
    id:'uc-workload-leak',
    title:'SP credential leak (GitHub)',
    tag:'Use case',
    blurb:'Un secret commiteado a un repo público. Bots lo recogen en minutos.',
    duration:'3 escenas · ~3 min',
    primaryCat:'workload',
    nodes: pick(['workload-id-premium','identity-protection','risk-policies','named-locations','access-reviews','service-principals']),
    scenes: [
      {
        id:1, chip:'Escena 1 · El leak',
        heading:'Un developer commitea client_secret en un repo público.',
        narrative:'Bots de scraping detectan el secret en minutos. Intentan call a Graph desde IPs en otro continente. <b>Sin defensas para workload identities</b>, los SPs son la zona ciega.',
        insight:'Workload identities = no-human. CA tradicional aplica a usuarios. Hace falta <b>Workload ID Premium</b> para extender el modelo Zero Trust.',
        introNodes:['service-principals'],
        introEdges:[],
        annotations:[{x:600, y:230, arrow:'left', tone:'default', body:'<b>SP en peligro</b>'}]
      },
      {
        id:2, chip:'Escena 2 · Workload ID Premium + Named Locations',
        heading:'CA para Service Principals. La IP fuera de lista, bloqueada.',
        narrative:'<b>Workload ID Premium</b> aplica CA a SPs. <b>Named Locations</b> definen rangos esperados (datacenter, oficinas). Si el SP llama desde fuera: bloqueo automático. <b>Identity Protection (Workload)</b> emite "leaked credentials".',
        insight:'Sin Named Locations + CA para SPs, el atacante tiene 24h+ antes de detección manual. Con ambos: minutos.',
        introNodes:['workload-id-premium','named-locations','identity-protection'],
        introEdges:[
          {a:'workload-id-premium', b:'service-principals', t:'policy', label:'CA for SPs'},
          {a:'named-locations', b:'workload-id-premium', t:'data', label:'IP allowlist'},
          {a:'workload-id-premium', b:'identity-protection', t:'signal', label:'workload risk'}
        ],
        annotations:[{x:770, y:50, arrow:'down', tone:'edge-policy', body:'<b>Zero Trust workload</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Higiene continua',
        heading:'Access Reviews para SPs. Rotación + Federated Credentials.',
        narrative:'<b>Access Reviews</b> recertifican SPs y app permissions cada 90 días — eliminan los SPs zombi. Idealmente, migrar a <b>Federated Credentials</b> elimina el secret de raíz (OIDC trust con GitHub Actions, no client_secret).',
        insight:'El mejor secret es el que no existe. Federated credentials eliminan la superficie de leak.',
        introNodes:['access-reviews','risk-policies'],
        introEdges:[
          {a:'workload-id-premium', b:'access-reviews', t:'data', label:'SP review'},
          {a:'identity-protection', b:'risk-policies', t:'signal', label:'workload risk'},
          {a:'risk-policies', b:'service-principals', t:'policy', label:'block on risk'}
        ],
        annotations:[{x:600, y:200, arrow:'left', tone:'default', body:'<b>Higiene</b>'}]
      }
    ]
  },

  'agent-ca-optim': {
    id:'agent-ca-optim',
    title:'CA Optimization Agent · el agente que cubre los huecos',
    tag:'Use case',
    blurb:'Security Copilot agent (Preview) que detecta gaps de CA y propone policies con un click.',
    duration:'3 escenas · ~3 min',
    primaryCat:'governance',
    nodes: pick(['agent-ca-optim','security-copilot','conditional-access','sign-in-logs','sentinel']),
    scenes: [
      {
        id:1, chip:'Escena 1 · El hueco invisible',
        heading:'El audit dice "47 apps sin Conditional Access". Nadie tiene tiempo.',
        narrative:'El equipo IAM creció 4x en 18 meses. Apps nuevas se onboardean día con día y nadie revisa si quedan dentro de scope CA. Privileged users en exclusiones temporales que nunca expiran. Policies obsoletas heredadas de 2019.',
        insight:'Sin auditoría continua, el motor Zero Trust tiene huecos crecientes invisibles. El SOC no ve lo que no tiene policy.',
        introNodes:['conditional-access','sign-in-logs'],
        introEdges:[{a:'conditional-access', b:'sign-in-logs', t:'data', label:'policy decisions'}],
        annotations:[{x:260, y:50, arrow:'down', tone:'default', body:'<b>47 apps sin CA</b>'}]
      },
      {
        id:2, chip:'Escena 2 · El agente analiza',
        heading:'CA Optimization Agent lee policies + telemetría + Zero Trust catalog.',
        narrative:'<b>Security Copilot</b> + <b>CA Optimization Agent</b> corren autónomamente. El agente cruza las CA policies actuales con sign-in logs (qué apps/usuarios pasan), detecta gaps, overlap, exclusiones obsoletas, y compara contra el blueprint Zero Trust de Microsoft.',
        insight:'No es un escaneo one-shot. El agente trabaja continuo. Cada app nueva en sign-in logs aparece en su queue.',
        introNodes:['security-copilot','agent-ca-optim'],
        introEdges:[
          {a:'security-copilot', b:'agent-ca-optim', t:'data', label:'platform'},
          {a:'conditional-access', b:'agent-ca-optim', t:'data', label:'policies analyzed'},
          {a:'sign-in-logs', b:'agent-ca-optim', t:'data', label:'telemetry baseline'}
        ],
        annotations:[{x:600, y:50, arrow:'down', tone:'edge-policy', body:'<b>Agent analyzes</b>'}]
      },
      {
        id:3, chip:'Escena 3 · One-click apply',
        heading:'Admin aprueba la sugerencia. Evidence en Sentinel.',
        narrative:'El agente propone: "Crear CA policy para 12 apps SaaS sin cobertura, requiring MFA + compliant device". Admin abre el agente, revisa la lógica + impact analysis, aprueba con un click. La policy se crea en Entra. Sign-in Logs + <b>Sentinel</b> capturan toda la cadena (agente sugiere → admin aprueba → policy aplica → primer block).',
        insight:'El humano sigue en el loop para la decisión. El trabajo aburrido (descubrir el gap, redactar policy) lo hace el agente. ROI inmediato en time-to-coverage.',
        introNodes:['sentinel'],
        introEdges:[
          {a:'agent-ca-optim', b:'conditional-access', t:'policy', label:'apply (approved)'},
          {a:'agent-ca-optim', b:'sentinel', t:'data', label:'audit'},
          {a:'conditional-access', b:'sign-in-logs', t:'data', label:'new blocks'}
        ],
        annotations:[{x:430, y:200, arrow:'left', tone:'edge-policy', body:'<b>One-click apply</b>'}]
      }
    ]
  },

  'agent-risky-response': {
    id:'agent-risky-response',
    title:'Risky User → remediación autónoma en minutos',
    tag:'Use case',
    blurb:'Risky User Remediation Agent corre el playbook completo: investigar, proponer, ejecutar con approval.',
    duration:'3 escenas · ~3 min',
    primaryCat:'protection',
    nodes: pick(['agent-risky-user','security-copilot','identity-protection','risk-policies','cae','sentinel']),
    scenes: [
      {
        id:1, chip:'Escena 1 · Risk signal',
        heading:'Identity Protection: leaked credentials + sign-in atípico desde otro continente.',
        narrative:'<b>Identity Protection</b> detecta credenciales del usuario en un dump conocido (Have I Been Pwned via MS threat intel) + sign-in anómalo. User Risk = High. Sin un agente, esto se queda en una alerta en la queue del SOC hasta que alguien tenga tiempo (MTTR típico: horas).',
        insight:'El tiempo entre detección y acción es donde el atacante hace daño. Cada minuto cuenta.',
        introNodes:['identity-protection'],
        introEdges:[],
        annotations:[{x:430, y:50, arrow:'down', tone:'default', body:'<b>User risk = High</b>'}]
      },
      {
        id:2, chip:'Escena 2 · El agente actúa',
        heading:'Risky User Agent investiga, correlaciona, propone playbook.',
        narrative:'<b>Risky User Remediation Agent</b> (Security Copilot) toma el risk event, enriquece con sign-in logs + device context + threat intel, y arma una propuesta: "Force password reset + revoke todas las sesiones vía CAE + bloquear hasta verification". El agente NO ejecuta solo: pide approval del admin.',
        insight:'El agente hace el trabajo de un Tier-2 analyst en segundos: investigación + correlation + recomendación lista para aprobar.',
        introNodes:['security-copilot','agent-risky-user'],
        introEdges:[
          {a:'security-copilot', b:'agent-risky-user', t:'data', label:'platform'},
          {a:'identity-protection', b:'agent-risky-user', t:'signal', label:'risky user feed'}
        ],
        annotations:[{x:430, y:120, arrow:'down', tone:'edge-policy', body:'<b>Agent proposes</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Approval + CAE',
        heading:'Admin aprueba. CAE revoca en minutos. Sentinel cierra el ticket.',
        narrative:'Admin recibe push notification, abre el agente, revisa el blast radius (qué sesiones, qué apps), aprueba. <b>Risk Policies</b> se dispara: password reset + <b>CAE</b> revoca tokens en &lt;5 min. El user queda bloqueado hasta verification. <b>Sentinel</b> retiene la cadena completa para forensics.',
        insight:'MTTR: minutos en vez de horas. Trabajo del SOC: aprobar/escalar, no investigar desde cero. Zero Trust en acción.',
        introNodes:['risk-policies','cae','sentinel'],
        introEdges:[
          {a:'agent-risky-user', b:'risk-policies', t:'policy', label:'trigger (approved)'},
          {a:'risk-policies', b:'cae', t:'signal', label:'force re-eval'},
          {a:'cae', b:'sentinel', t:'data', label:'revocation events'},
          {a:'agent-risky-user', b:'sentinel', t:'data', label:'investigation log'}
        ],
        annotations:[{x:600, y:200, arrow:'left', tone:'edge-signal', body:'<b>MTTR: minutos</b>'}]
      }
    ]
  },

  'multitenant-secret': {
    id:'multitenant-secret',
    title:'Multi-tenant app secret · ataque silencioso cross-tenant',
    tag:'Use case',
    blurb:'El client_secret de una App Registration multi-tenant se filtra. El attacker NO ataca al owner: ataca los SPs en los tenants que consintieron la app.',
    duration:'3 escenas · ~4 min',
    primaryCat:'workload',
    nodes: pick(['app-registrations','service-principals','cross-tenant-access','workload-id-premium','named-locations','identity-protection','risk-policies','cae','sign-in-logs','sentinel']),
    scenes: [
      {
        id:1, chip:'Escena 1 · El leak + la topología real',
        heading:'App Registration multi-tenant. Service Principals en cada cliente. Un único secret que sirve para todos.',
        narrative:'<b>App Registration ABC</b> (tenant Owner, signInAudience: <code>AzureADMultipleOrgs</code>) tiene client_secret XYZ. Tenants Cliente A y B consintieron la app → <b>Enterprise Application / Service Principal</b> creado en cada uno con permisos delegados (Mail.Read, Files.Read.All). Developer commitea XYZ en repo público. El secret <i>no</i> abre el App Registration: abre cualquier Service Principal en cualquier tenant cliente que ya haya consentido la app.',
        insight:'El blast radius no son los datos del tenant Owner. Son los datos de TODOS los clientes que consintieron la app. Una app SaaS con 200 clientes corporativos = 200 tenants explotables con el mismo secret.',
        introNodes:['app-registrations','service-principals'],
        introEdges:[{a:'app-registrations', b:'service-principals', t:'data', label:'instantiation per consenting tenant'}],
        annotations:[{x:600, y:50, arrow:'down', tone:'default', body:'<b>1 secret = N tenants</b>'}]
      },
      {
        id:2, chip:'Escena 2 · El ataque silencioso',
        heading:'POST a /{tenant-cliente-A}/oauth2/v2.0/token. Owner no ve nada.',
        narrative:'Attacker corre:<br/><code>POST https://login.microsoftonline.com/{tenant-cliente-A}/oauth2/v2.0/token</code><br/>con <code>grant_type=client_credentials</code> + <code>client_id=ABC</code> + <code>client_secret=XYZ</code> + <code>scope=https://graph.microsoft.com/.default</code>. Entra ID del cliente A valida: ¿existe el SP? ✓ ¿tiene permisos consentidos? ✓ → emite access token. Attacker llama Graph: <code>GET /users/{user}/messages</code>. Repite contra B, C, D... <b>El owner no ve esta actividad en sus propios sign-in logs</b> porque la auth ocurre en los tenants de los clientes.',
        insight:'El sign-in queda en el log del tenant del cliente, NO del owner. Sin Workload ID Premium + Named Locations en el cliente, el SP del owner aparece sign-in desde Vladivostok a las 3am — pero no hay quien lo correlacione si el cliente no tiene IDP/CA para workload identities.',
        introNodes:['cross-tenant-access','sign-in-logs'],
        introEdges:[
          {a:'service-principals', b:'sign-in-logs', t:'data', label:'logged in CLIENT tenant'},
          {a:'cross-tenant-access', b:'service-principals', t:'policy', label:'allow/block partner SP'}
        ],
        annotations:[{x:430, y:50, arrow:'down', tone:'edge-policy', body:'<b>Sign-in en TENANT CLIENTE</b><br/><span class="muted">Owner ciego.</span>'}]
      },
      {
        id:3, chip:'Escena 3 · Detección, contención, mitigación',
        heading:'Workload ID Premium del cliente lo detecta. Owner migra a Federated Credentials.',
        narrative:'<b>Workload ID Premium</b> aplicado en el tenant del cliente A: CA exige que el SP del owner solo firme desde Named Locations específicas. <b>Identity Protection (Workload)</b> emite "leaked credentials" (Microsoft threat intel detecta el secret en el dump) + "anomalous SP sign-in". <b>Risk-Based Policies</b> bloquea. <b>CAE</b> revoca tokens activos del SP en minutos. <b>Sentinel</b> correlaciona cross-tenant. Mitigación final del owner: rotar secret YA + migrar a <b>Federated Identity Credentials</b> (OIDC trust con GitHub Actions / Workload Identity Federation — sin secret = imposible filtrar).',
        insight:'El owner es responsable de la cadena: rotación + revocación + migración a federated. Pero la PROTECCIÓN runtime depende del cliente (Workload ID Premium en SUS tenants). Sin esa capa, el cliente confía ciegamente en cualquier SP que consintió alguna vez.',
        introNodes:['workload-id-premium','identity-protection','risk-policies','cae','named-locations','sentinel'],
        introEdges:[
          {a:'workload-id-premium', b:'service-principals', t:'policy', label:'CA for SPs'},
          {a:'workload-id-premium', b:'identity-protection', t:'signal', label:'workload risk'},
          {a:'named-locations', b:'workload-id-premium', t:'data', label:'allowed IPs'},
          {a:'identity-protection', b:'risk-policies', t:'signal', label:'risky workload'},
          {a:'risk-policies', b:'cae', t:'signal', label:'revoke tokens'},
          {a:'sign-in-logs', b:'sentinel', t:'data', label:'forensics'}
        ],
        annotations:[
          {x:770, y:50, arrow:'down', tone:'edge-policy', body:'<b>Workload ID Premium</b>'},
          {x:430, y:200, arrow:'left', tone:'edge-signal', body:'<b>Federated Credentials = no secret</b>'}
        ]
      }
    ]
  }
}
