// Story View · 3 historias · Use cases (ataques y defensas)
import { pickNodes as pick } from "../storyData.js"

export const STORY_ORDER = ['uc-aitm','uc-pwd-spray','uc-workload-leak']

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
  }
}
