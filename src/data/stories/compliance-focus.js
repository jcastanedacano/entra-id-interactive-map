// Story View · 2 historias · External & Governance focus
import { pickNodes as pick } from "../storyData.js"

export const STORY_ORDER = ['ext-b2b','ext-verified-id']

export const STORIES = {

  'ext-b2b': {
    id:'ext-b2b',
    title:'B2B governance · partner onboarding',
    tag:'Use case',
    blurb:'Un partner necesita acceso a un proyecto durante 6 meses. Sin caos, con expiración.',
    duration:'3 escenas · ~3 min',
    primaryCat:'external',
    nodes: pick(['b2b','cross-tenant-access','entitlement-mgmt','access-reviews','conditional-access','cross-tenant-sync']),
    scenes: [
      {
        id:1, chip:'Escena 1 · Trust con el partner',
        heading:'Cross-Tenant Access Settings: confiar la MFA del partner.',
        narrative:'<b>Cross-Tenant Access Settings</b> define inbound policy del partner: ¿qué usuarios pueden ser invitados? ¿confiamos su MFA y su device compliance? Si sí, evitamos pedir MFA <i>de nuevo</i>.',
        insight:'Sin trust transitivo, el guest hace 2x MFA. Con trust, una sola — y heredamos el contexto Zero Trust del partner.',
        introNodes:['cross-tenant-access','b2b'],
        introEdges:[
          {a:'cross-tenant-access', b:'b2b', t:'policy', label:'partner allow'},
          {a:'cross-tenant-access', b:'conditional-access', t:'policy', label:'trust MFA'}
        ],
        annotations:[{x:770, y:80, arrow:'down', tone:'default', body:'<b>Trust transitivo</b>'}]
      },
      {
        id:2, chip:'Escena 2 · Self-service request',
        heading:'Entitlement Mgmt + Connected Organization = onboarding gobernado.',
        narrative:'Partner aparece como <b>Connected Organization</b>. Pide el access package "Project Atlas - External" desde un portal. Approval del project owner. Expiración 6 meses. Recurring AR cada 60 días.',
        insight:'Sin Entitlement Mgmt, IT crea cuentas manualmente y se olvida de removerlas. Con EM, la expiración es código.',
        introNodes:['entitlement-mgmt','conditional-access'],
        introEdges:[
          {a:'entitlement-mgmt', b:'b2b', t:'policy', label:'guest onboarding'},
          {a:'b2b', b:'conditional-access', t:'policy', label:'guest CA policy'}
        ],
        annotations:[{x:600, y:50, arrow:'down', tone:'edge-policy', body:'<b>Self-service</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Lifecycle limpio',
        heading:'Access Reviews + Cross-Tenant Sync mantienen el directorio sano.',
        narrative:'<b>Access Reviews</b> recurrentes preguntan al owner: "¿sigue Pedro necesitando esto?". Si no responde: remove. <b>Cross-Tenant Sync</b> mantiene el guest sincronizado con cambios del partner (sale del partner → desaparece aquí).',
        insight:'El #1 hallazgo de auditoría B2B: guests fantasma activos meses tras el fin del proyecto. AR + CTS eliminan ese hallazgo.',
        introNodes:['access-reviews','cross-tenant-sync'],
        introEdges:[
          {a:'entitlement-mgmt', b:'access-reviews', t:'data', label:'recertify'},
          {a:'cross-tenant-sync', b:'b2b', t:'data', label:'sync guests'},
          {a:'access-reviews', b:'b2b', t:'policy', label:'remove'}
        ],
        annotations:[{x:600, y:200, arrow:'left', tone:'edge-policy', body:'<b>Lifecycle</b>'}]
      }
    ]
  },

  'ext-verified-id': {
    id:'ext-verified-id',
    title:'Verified ID · onboarding sin re-KYC',
    tag:'Use case',
    blurb:'Un nuevo empleado/contractor presenta una VC del proveedor de KYC. No re-colectamos PII.',
    duration:'3 escenas · ~3 min',
    primaryCat:'external',
    nodes: pick(['verified-id','users','entitlement-mgmt','lifecycle-workflows','b2b']),
    scenes: [
      {
        id:1, chip:'Escena 1 · El emisor confiable',
        heading:'El proveedor KYC emite una Verifiable Credential al wallet del candidato.',
        narrative:'Candidate pasa KYC en su provider. Provider (Issuer) emite VC firmada al wallet (MS Authenticator). VC contiene atributos: identidad verificada, fecha, scope.',
        insight:'La VC vive en el wallet del usuario, no en ningún DB centralizado. El user la presenta cuando hace falta.',
        introNodes:['verified-id'],
        introEdges:[],
        annotations:[{x:770, y:50, arrow:'down', tone:'default', body:'<b>Issuer firma VC</b>'}]
      },
      {
        id:2, chip:'Escena 2 · Presentation al onboarding',
        heading:'Entra como Verifier: pide VC al candidato durante el sign-up.',
        narrative:'Lifecycle Workflows arranca onboarding. Pide VC válida del emisor confiable. <b>Verified ID Verifier</b> evalúa firma + revocación + claims. Si OK → user creado en directorio con KYC verificado.',
        insight:'No reimplementamos KYC interno. Reutilizamos el del proveedor confiable. Reducción brutal en time-to-onboard.',
        introNodes:['users','lifecycle-workflows'],
        introEdges:[
          {a:'verified-id', b:'users', t:'data', label:'onboard'},
          {a:'lifecycle-workflows', b:'users', t:'policy', label:'create'}
        ],
        annotations:[{x:430, y:50, arrow:'down', tone:'edge-policy', body:'<b>Verifier</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Credential-gated access',
        heading:'Entitlement Mgmt requiere VC para activar acceso.',
        narrative:'Para el access package "Production Support", <b>Entitlement Mgmt</b> exige presentar VC "On-Call Certified" además de approval. La VC expira cada año; renovación con re-train evita drift.',
        insight:'VCs convierten compliance ("hizo el training") en una credencial verificable cryptographically, no un check manual en una hoja.',
        introNodes:['entitlement-mgmt','b2b'],
        introEdges:[
          {a:'verified-id', b:'entitlement-mgmt', t:'policy', label:'cred-gated'},
          {a:'entitlement-mgmt', b:'b2b', t:'policy', label:'external invite'}
        ],
        annotations:[{x:600, y:200, arrow:'left', tone:'edge-policy', body:'<b>Cred-gated EM</b>'}]
      }
    ]
  }
}
