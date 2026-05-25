// Story View · 3 historias · Frameworks (Zero Trust, NIST IA, ISO/NIS2)
import { pickNodes as pick } from "../storyData.js"

export const STORY_ORDER = ['zero-trust','nist-ia','iso-nis2']

export const STORIES = {

  'zero-trust': {
    id:'zero-trust',
    title:'Zero Trust · Identity Pillar',
    tag:'Framework',
    blurb:'Verificar explícitamente, acceso mínimo, asumir brecha — aterrizado en Entra.',
    duration:'3 escenas · ~3 min',
    primaryCat:'access',
    nodes: pick(['conditional-access','mfa','passkeys','identity-protection','risk-policies','cae','intune','pim']),
    scenes: [
      {
        id:1, chip:'Escena 1 · Verificar explícitamente',
        heading:'Cada acceso pasa por Conditional Access. Sin excepciones.',
        narrative:'<b>Conditional Access</b> es el chokepoint. Evalúa señales (usuario, app, device, location, risk) y aplica grants (MFA, compliant device, auth strength). Sin CA cubriendo el 100% de apps, Zero Trust no existe — solo es PowerPoint.',
        insight:'La meta: <b>cero apps sin política CA</b>. Report-only mode para validar; What-If para predecir; Identity Protection alimenta el risk signal.',
        introNodes:['conditional-access','mfa'],
        introEdges:[{a:'mfa', b:'conditional-access', t:'policy', label:'grant'}],
        annotations:[{x:260, y:30, arrow:'down', tone:'default', body:'<b>CA</b><br/><span class="muted">Chokepoint Zero Trust.</span>'}]
      },
      {
        id:2, chip:'Escena 2 · Phishing-resistant + risk-aware',
        heading:'Passkeys eliminan el password. Identity Protection eleva el risk.',
        narrative:'<b>Passkeys</b> (FIDO2 + Authenticator passkeys) son phishing-resistant. <b>Identity Protection</b> detecta sign-in risk y user risk. <b>Risk-based policies</b> traducen ese risk en decisiones CA: step-up MFA, password change, block.',
        insight:'Sin auth phishing-resistant, AiTM bypassea MFA tradicional. Sin risk policies, los ataques password spray pasan desapercibidos.',
        introNodes:['passkeys','identity-protection','risk-policies'],
        introEdges:[
          {a:'passkeys', b:'conditional-access', t:'policy', label:'auth strength'},
          {a:'identity-protection', b:'risk-policies', t:'signal', label:'risk level'},
          {a:'risk-policies', b:'conditional-access', t:'policy', label:'risk grant'}
        ],
        annotations:[{x:430, y:50, arrow:'down', tone:'default', body:'<b>Phishing-resistant + risk</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Asumir brecha',
        heading:'CAE revoca en minutos. PIM elimina privilegio permanente. Intune valida el device.',
        narrative:'<b>CAE</b> reduce el window de un token comprometido de 1h a minutos. <b>PIM</b> hace que Global Admin sea JIT, no permanente. <b>Intune</b> garantiza que el device cumple antes de dejarlo entrar.',
        insight:'Asumir brecha significa: si el atacante entra, no se queda. CAE corta el token, PIM le quita los roles, Intune lo deja sin device. Defensa en profundidad real.',
        introNodes:['cae','pim','intune'],
        introEdges:[
          {a:'conditional-access', b:'cae', t:'signal', label:'critical events'},
          {a:'pim', b:'conditional-access', t:'policy', label:'activation grant'},
          {a:'intune', b:'conditional-access', t:'signal', label:'compliant device'}
        ],
        annotations:[{x:600, y:50, arrow:'down', tone:'edge-policy', body:'<b>Asumir brecha</b><br/><span class="muted">CAE + PIM + Intune.</span>'}]
      }
    ]
  },

  'nist-ia': {
    id:'nist-ia',
    title:'NIST 800-53 · IA family',
    tag:'Framework',
    blurb:'Identification & Authentication — MFA, gestión de autenticadores, reautenticación.',
    duration:'3 escenas · ~3 min',
    primaryCat:'access',
    nodes: pick(['auth-methods','passkeys','auth-strengths','pim','sign-in-logs','cae','conditional-access']),
    scenes: [
      {
        id:1, chip:'Escena 1 · IA-2 MFA',
        heading:'IA-2(1) y (2) exigen MFA para acceso privilegiado y network.',
        narrative:'<b>Auth Methods Policy</b> es la fuente única de verdad. Habilita Authenticator, Passkeys, FIDO2; deprecate SMS/Voice. <b>Authentication Strengths</b> define el set permitido por escenario.',
        insight:'Sin Authentication Strengths, "MFA" significa "cualquier MFA" — incluyendo SMS phishable. Con Strengths, Conditional Access exige <i>exactamente</i> el método aprobado.',
        introNodes:['auth-methods','auth-strengths','conditional-access'],
        introEdges:[
          {a:'auth-methods', b:'auth-strengths', t:'data', label:'método disponible'},
          {a:'auth-strengths', b:'conditional-access', t:'policy', label:'strong auth grant'}
        ],
        annotations:[{x:260, y:50, arrow:'down', tone:'default', body:'<b>Modern Auth Policy</b>'}]
      },
      {
        id:2, chip:'Escena 2 · IA-2(11) Phishing-resistant',
        heading:'Passkeys cubren IA-2(11) sin discusión.',
        narrative:'Passkeys (FIDO2 + Authenticator) son por diseño phishing-resistant. Para sistemas críticos (federal high), IA-2(11) exige autenticación que resista phishing — eso es Passkey o WHfB.',
        insight:'Si tu Authentication Strength permite SMS, no cumples IA-2(11). Construye un Strength "Phishing-Resistant" y úsalo en CA para PIM y apps Tier-0.',
        introNodes:['passkeys','pim'],
        introEdges:[
          {a:'passkeys', b:'auth-strengths', t:'data', label:'set incluye'},
          {a:'pim', b:'auth-strengths', t:'policy', label:'activación exige'}
        ],
        annotations:[{x:430, y:50, arrow:'down', tone:'edge-policy', body:'<b>PIM exige passkey</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Evidencia',
        heading:'Sign-in Logs + CAE = evidencia auditable de reautenticación.',
        narrative:'<b>Sign-in Logs</b> registran cada decisión CA. <b>CAE</b> documenta cada revocación. Para auditores: "muéstrenme reautenticación tras evento crítico" → query KQL en Logs.',
        insight:'Retener 30 días en Entra es insuficiente para auditoría anual. Stream a <b>Sentinel</b> para 2+ años. Audit familia AU se beneficia del mismo pipeline.',
        introNodes:['sign-in-logs','cae'],
        introEdges:[
          {a:'conditional-access', b:'sign-in-logs', t:'data', label:'decisiones'},
          {a:'cae', b:'sign-in-logs', t:'data', label:'revocaciones'}
        ],
        annotations:[{x:430, y:200, arrow:'left', tone:'default', body:'<b>Evidencia</b>'}]
      }
    ]
  },

  'iso-nis2': {
    id:'iso-nis2',
    title:'ISO 27001:2022 + NIS2',
    tag:'Framework',
    blurb:'Access control A.5.15–5.18 + NIS2 medidas básicas de gestión de identidad.',
    duration:'3 escenas · ~3 min',
    primaryCat:'governance',
    nodes: pick(['conditional-access','mfa','pim','access-reviews','entitlement-mgmt','lifecycle-workflows','identity-protection','sentinel']),
    scenes: [
      {
        id:1, chip:'Escena 1 · A.5.17 Auth fuerte',
        heading:'MFA + CA cubren autenticación segura.',
        narrative:'ISO 27001:2022 control A.8.5 (secure authentication) y NIS2 medida MFA — la base. <b>Conditional Access</b> garantiza que cada acceso pase por MFA; <b>Identity Protection</b> escala con risk.',
        insight:'Auditor ISO pide "evidencia de MFA aplicada a usuarios privilegiados". Reporta desde Access Reviews + Sign-in Logs.',
        introNodes:['conditional-access','mfa','identity-protection'],
        introEdges:[
          {a:'mfa', b:'conditional-access', t:'policy', label:'grant'},
          {a:'identity-protection', b:'conditional-access', t:'signal', label:'risk'}
        ],
        annotations:[{x:260, y:50, arrow:'down', tone:'default', body:'<b>A.8.5 + NIS2 MFA</b>'}]
      },
      {
        id:2, chip:'Escena 2 · A.5.15 / 5.18 Acceso privilegiado',
        heading:'PIM + Access Reviews cierran el ciclo de privilegio.',
        narrative:'<b>PIM</b> elimina standing privilege (A.5.15 access control). <b>Access Reviews</b> recertifican periódicamente (A.5.18 review of access rights). <b>Entitlement Management</b> documenta cada otorgamiento.',
        insight:'NIS2 espera que cuentes con un proceso documentado de revisión; Access Reviews + Entitlement Mgmt te lo entregan listo + auditable.',
        introNodes:['pim','access-reviews','entitlement-mgmt'],
        introEdges:[
          {a:'pim', b:'access-reviews', t:'data', label:'recurring review'},
          {a:'entitlement-mgmt', b:'access-reviews', t:'data', label:'package review'}
        ],
        annotations:[{x:600, y:50, arrow:'down', tone:'edge-policy', body:'<b>A.5.15 + A.5.18</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Lifecycle + reporting',
        heading:'Lifecycle Workflows automatiza JML. Sentinel arma el reporte.',
        narrative:'<b>Lifecycle Workflows</b> automatiza joiner/mover/leaver — sin orphans ni accesos sobrantes. <b>Sentinel</b> agrega los logs y produce los reportes de incidentes (NIS2 exige 24h early warning + 72h full).',
        insight:'JML automatizado + SIEM con KQL es el combo que sobrevive tanto a auditoría ISO como a notificación regulatoria NIS2.',
        introNodes:['lifecycle-workflows','sentinel'],
        introEdges:[
          {a:'lifecycle-workflows', b:'entitlement-mgmt', t:'policy', label:'auto-assign'},
          {a:'sentinel', b:'access-reviews', t:'data', label:'evidence'}
        ],
        annotations:[{x:600, y:200, arrow:'left', tone:'default', body:'<b>NIS2 reporting</b>'}]
      }
    ]
  }
}
