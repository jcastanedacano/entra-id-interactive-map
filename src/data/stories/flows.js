// Story View · 2 historias · Flows
import { pickNodes as pick } from "../storyData.js"

export const STORY_ORDER = ['fl-sign-in','fl-jit-admin']

export const STORIES = {

  'fl-sign-in': {
    id:'fl-sign-in',
    title:'Flow · Sign-in con CA',
    tag:'Data flow',
    blurb:'Un usuario abre Outlook desde un café. ¿Qué pasa por dentro?',
    duration:'3 escenas · ~3 min',
    primaryCat:'access',
    nodes: pick(['conditional-access','mfa','intune','identity-protection','named-locations','cae','sign-in-logs']),
    scenes: [
      {
        id:1, chip:'Escena 1 · Token request',
        heading:'STS recoge cada señal antes de emitir token.',
        narrative:'Outlook pide token al endpoint. Entra recoge: <b>user</b>, app, device state (compliant?), location (named?), risk level, client type. Todo va al motor de <b>Conditional Access</b>.',
        insight:'CA evalúa todas las políticas asignadas al user+app. La decisión es: allow / allow-with-grants / block. Resultado registrado en Sign-in Logs.',
        introNodes:['conditional-access','sign-in-logs'],
        introEdges:[{a:'conditional-access', b:'sign-in-logs', t:'data', label:'decisión'}],
        annotations:[{x:260, y:50, arrow:'down', tone:'default', body:'<b>STS decision</b>'}]
      },
      {
        id:2, chip:'Escena 2 · Grants aplicados',
        heading:'Café = untrusted location. CA exige MFA + compliant device.',
        narrative:'Named Locations dice "no trusted". CA aplica grants: <b>MFA</b> (Authenticator) + <b>compliant device</b> (signal de Intune) + Auth Strength = Phishing-Resistant si app sensible.',
        insight:'Si el device no es compliant (BYOD personal), CA aplica app protection policy en vez de full block — datos no salen del browser controlado.',
        introNodes:['mfa','intune','named-locations'],
        introEdges:[
          {a:'mfa', b:'conditional-access', t:'policy', label:'grant'},
          {a:'intune', b:'conditional-access', t:'signal', label:'compliant'},
          {a:'named-locations', b:'conditional-access', t:'data', label:'untrusted'}
        ],
        annotations:[{x:260, y:200, arrow:'down', tone:'edge-policy', body:'<b>Grants</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Sesión + CAE',
        heading:'Token emitido. CAE vigila durante la vida del token.',
        narrative:'Token emitido. <b>Identity Protection</b> sigue evaluando risk en background. <b>CAE</b> escucha eventos críticos (password change, MFA revoke, risk up, IP change) y revoca el token en minutos si algo cambia.',
        insight:'Sin CAE, el token vive su TTL (1h+). Con CAE, una revocación tarda &lt; 5 min — del lado de Microsoft 365 apps, casi instantáneo.',
        introNodes:['identity-protection','cae'],
        introEdges:[
          {a:'identity-protection', b:'conditional-access', t:'signal', label:'risk'},
          {a:'conditional-access', b:'cae', t:'signal', label:'eventos'},
          {a:'cae', b:'sign-in-logs', t:'data', label:'revocaciones'}
        ],
        annotations:[{x:430, y:50, arrow:'down', tone:'edge-signal', body:'<b>CAE</b>'}]
      }
    ]
  },

  'fl-jit-admin': {
    id:'fl-jit-admin',
    title:'Flow · JIT Global Admin',
    tag:'Data flow',
    blurb:'SRE necesita Global Admin por 1h. Sin PIM, es permanente. Con PIM, es ceremonia.',
    duration:'3 escenas · ~3 min',
    primaryCat:'governance',
    nodes: pick(['pim','auth-strengths','passkeys','conditional-access','sign-in-logs','sentinel']),
    scenes: [
      {
        id:1, chip:'Escena 1 · Activation request',
        heading:'SRE abre PIM, selecciona role, escribe justificación.',
        narrative:'<b>PIM</b> requiere ticket # + justification. Activation comienza un workflow: aprobación del manager (registrada), MFA, duración max 1h, scope de role.',
        insight:'Sin PIM, el SRE ya tiene Global Admin 24/7. Con PIM, debe justificar cada elevación — y eso queda grabado.',
        introNodes:['pim','conditional-access'],
        introEdges:[{a:'pim', b:'conditional-access', t:'policy', label:'grant'}],
        annotations:[{x:600, y:50, arrow:'down', tone:'default', body:'<b>PIM request</b>'}]
      },
      {
        id:2, chip:'Escena 2 · Strong auth gate',
        heading:'Auth Strength obliga passkey. SMS no aplica.',
        narrative:'<b>Authentication Strength = Phishing-Resistant</b> es requerido por la activation policy. SRE debe presentar passkey/FIDO2/WHfB. SMS o Authenticator push <i>solos</i> no califican.',
        insight:'Esto cierra la brecha clásica: "MFA estaba on pero era SMS". Con Auth Strength + PIM, no hay degradación silenciosa.',
        introNodes:['auth-strengths','passkeys'],
        introEdges:[
          {a:'pim', b:'auth-strengths', t:'policy', label:'phishing-resistant'},
          {a:'passkeys', b:'auth-strengths', t:'data', label:'incluido en set'},
          {a:'auth-strengths', b:'conditional-access', t:'policy', label:'grant'}
        ],
        annotations:[{x:430, y:50, arrow:'down', tone:'edge-policy', body:'<b>Passkey only</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Active + audited',
        heading:'Role activo 1h. Sentinel registra cada acción.',
        narrative:'Role activo. <b>Conditional Access</b> aplica restricciones extra: solo desde Admin Workstation, sesión persistente off. Al expirar, auto-deactivation. <b>Sentinel</b> recoge actividad y dispara alerts si comportamiento sospechoso.',
        insight:'Audit trail completo: quien pidió, quien aprobó, cuándo, desde dónde, qué hizo. Auditor SOC 2 lo pide en minutos.',
        introNodes:['sign-in-logs','sentinel'],
        introEdges:[
          {a:'pim', b:'sign-in-logs', t:'data', label:'activation'},
          {a:'conditional-access', b:'sign-in-logs', t:'data', label:'decisiones'},
          {a:'sign-in-logs', b:'sentinel', t:'data', label:'stream'}
        ],
        annotations:[{x:600, y:200, arrow:'left', tone:'default', body:'<b>Audit trail</b>'}]
      }
    ]
  }
}
