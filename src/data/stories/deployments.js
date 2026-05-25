// Story View · 3 historias · Deployments
import { pickNodes as pick } from "../storyData.js"

export const STORY_ORDER = ['dp-passwordless','dp-jml','dp-gsa']

export const STORIES = {

  'dp-passwordless': {
    id:'dp-passwordless',
    title:'Passwordless rollout',
    tag:'Deployment',
    blurb:'Eliminar el password como vector de auth en ~6 meses. Sin romper break-glass.',
    duration:'3 escenas · ~3 min',
    primaryCat:'access',
    nodes: pick(['auth-methods','passkeys','mfa','auth-strengths','pim','conditional-access']),
    scenes: [
      {
        id:1, chip:'Escena 1 · Habilitar métodos',
        heading:'Auth Methods Policy es el switch maestro.',
        narrative:'Habilita <b>Passkeys (Authenticator + FIDO2)</b> + <b>Windows Hello for Business</b>. Deprecate SMS/Voice como primary. Mantén FIDO2 keys físicas para break-glass.',
        insight:'No migres legacy per-user MFA settings — la Auth Methods Policy moderna las reemplaza. Microsoft deprecará legacy en 2026.',
        introNodes:['auth-methods','mfa','passkeys'],
        introEdges:[
          {a:'mfa', b:'auth-methods', t:'data', label:'método'},
          {a:'auth-methods', b:'passkeys', t:'policy', label:'rollout'}
        ],
        annotations:[{x:260, y:50, arrow:'down', tone:'default', body:'<b>Modern Auth Policy</b>'}]
      },
      {
        id:2, chip:'Escena 2 · Strengths por escenario',
        heading:'No todo necesita lo mismo. Construye Auth Strengths.',
        narrative:'Crea Auth Strengths: <b>Phishing-Resistant</b> (passkey + WHfB + cert), <b>Passwordless</b> (passkey + WHfB), <b>MFA</b> (passkey + Authenticator). Aplica vía CA: PIM/admin apps = Phishing-Resistant.',
        insight:'Sin Strengths, "MFA required" significa "SMS está bien". Con Strengths, controlas <i>exactamente</i> qué método cuenta para cada app.',
        introNodes:['auth-strengths','conditional-access'],
        introEdges:[
          {a:'passkeys', b:'auth-strengths', t:'data', label:'sets'},
          {a:'auth-strengths', b:'conditional-access', t:'policy', label:'grant'}
        ],
        annotations:[{x:430, y:50, arrow:'down', tone:'edge-policy', body:'<b>Per-app strength</b>'}]
      },
      {
        id:3, chip:'Escena 3 · PIM + onboarding TAP',
        heading:'PIM solo activable con passkey. TAP bootstrap sin password.',
        narrative:'<b>PIM</b> exige Phishing-Resistant en activation — convierte "Global Admin" en una credencial física. <b>TAP</b> (Temporary Access Pass) onboardea nuevos usuarios sin contraseña: van directo al setup de passkey.',
        insight:'TAP + Lifecycle Workflows = onboarding day-1 sin password, ever. El usuario nunca conoce su password porque nunca lo necesita.',
        introNodes:['pim'],
        introEdges:[
          {a:'pim', b:'auth-strengths', t:'policy', label:'activación'},
          {a:'pim', b:'conditional-access', t:'policy', label:'grant'}
        ],
        annotations:[{x:600, y:50, arrow:'down', tone:'edge-policy', body:'<b>PIM = passkey only</b>'}]
      }
    ]
  },

  'dp-jml': {
    id:'dp-jml',
    title:'Joiner-Mover-Leaver automation',
    tag:'Deployment',
    blurb:'Onboarding/offboarding 100% automatizado desde HR. Sin orphans ni accesos sobrantes.',
    duration:'3 escenas · ~3 min',
    primaryCat:'governance',
    nodes: pick(['lifecycle-workflows','entitlement-mgmt','access-reviews','groups','users']),
    scenes: [
      {
        id:1, chip:'Escena 1 · Joiner',
        heading:'Workday dispara. Lifecycle Workflows ejecuta.',
        narrative:'HR cambia employeeHireDate. <b>Lifecycle Workflows</b> Joiner ejecuta: crear TAP, enviar welcome email al manager, asignar a grupos default, pedir access packages baseline. Día 1: usuario productivo con passkey.',
        insight:'Sin Lifecycle Workflows, el día-1 es un ticket a IT que toma 3-5 días. Con LW, es automático en minutos cuando HR actualiza el record.',
        introNodes:['users','lifecycle-workflows'],
        introEdges:[
          {a:'users', b:'lifecycle-workflows', t:'data', label:'HR trigger'},
          {a:'lifecycle-workflows', b:'users', t:'policy', label:'enable + TAP'}
        ],
        annotations:[{x:90, y:50, arrow:'down', tone:'default', body:'<b>Joiner trigger</b>'}]
      },
      {
        id:2, chip:'Escena 2 · Entitlement Management',
        heading:'Access Packages son la moneda. Self-service con approval.',
        narrative:'<b>Entitlement Management</b> ofrece packages (Marketing Tier-1, SAP Reader, Project Atlas). Usuario pide via portal; manager aprueba; tiempo limitado; recurring access review.',
        insight:'Sin Entitlement Mgmt, el acceso vive en tickets sueltos. Con EM, hay catálogo, ownership, expiración y trazabilidad.',
        introNodes:['entitlement-mgmt','groups'],
        introEdges:[
          {a:'lifecycle-workflows', b:'entitlement-mgmt', t:'policy', label:'auto-assign baseline'},
          {a:'entitlement-mgmt', b:'groups', t:'data', label:'membership'},
          {a:'groups', b:'users', t:'data', label:'membership'}
        ],
        annotations:[{x:600, y:50, arrow:'down', tone:'edge-policy', body:'<b>Packages</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Leaver + Reviews',
        heading:'Leaver Workflow + Access Reviews mantienen el sistema limpio.',
        narrative:'<b>Leaver Workflow</b>: revoke sessions, remove memberships, revoke licenses, disable, grace period 30d, delete. <b>Access Reviews</b> recertifican memberships cada 90 días — quien no aprueba se cae.',
        insight:'Auditor ISO/NIS2 pide "evidencia de revisión de accesos". Access Reviews lo genera automático con trail completo.',
        introNodes:['access-reviews'],
        introEdges:[
          {a:'lifecycle-workflows', b:'groups', t:'policy', label:'remove'},
          {a:'entitlement-mgmt', b:'access-reviews', t:'data', label:'recurring'},
          {a:'access-reviews', b:'groups', t:'policy', label:'auto-remove'}
        ],
        annotations:[{x:600, y:200, arrow:'left', tone:'edge-policy', body:'<b>Reviews recurrentes</b>'}]
      }
    ]
  },

  'dp-gsa': {
    id:'dp-gsa',
    title:'GSA · Reemplazo de VPN',
    tag:'Deployment',
    blurb:'SSE + ZTNA reemplazan VPN tradicional. Identity-aware, sin firewall holes.',
    duration:'3 escenas · ~3 min',
    primaryCat:'network',
    nodes: pick(['global-secure-access','private-access','internet-access','conditional-access']),
    scenes: [
      {
        id:1, chip:'Escena 1 · Por qué VPN ya no',
        heading:'VPN da red plana. Zero Trust pide acceso por app.',
        narrative:'VPN tradicional: usuario conectado = en la red. Lateral movement trivial post-compromiso. Sin per-app authentication ni CA en la red.',
        insight:'GSA es el plano de red de Zero Trust. Cada app es un destino independiente con CA propio.',
        introNodes:['global-secure-access','conditional-access'],
        introEdges:[],
        annotations:[{x:870, y:50, arrow:'down', tone:'default', body:'<b>GSA platform</b>'}]
      },
      {
        id:2, chip:'Escena 2 · Private Access (ZTNA)',
        heading:'Per-app tunnels via connectors. Sin inbound holes.',
        narrative:'<b>Private Access</b> publica apps on-prem/Azure via connectors outbound. No abres puertos firewall. Conditional Access aplica per-app — RDP a un servidor exige passkey + compliant device.',
        insight:'Quick Access cubre puertos legacy (RDP, SSH, SMB). Apps modernas via Enterprise Apps. Mismo CA stack que para SaaS.',
        introNodes:['private-access'],
        introEdges:[
          {a:'global-secure-access', b:'private-access', t:'data', label:'ZTNA profile'},
          {a:'private-access', b:'conditional-access', t:'policy', label:'per-app grant'}
        ],
        annotations:[{x:870, y:120, arrow:'down', tone:'edge-policy', body:'<b>ZTNA</b>'}]
      },
      {
        id:3, chip:'Escena 3 · Internet Access (SWG + Compliant Network)',
        heading:'SWG protege egress. Compliant Network es un signal CA.',
        narrative:'<b>Internet Access</b> es un Secure Web Gateway: filtering, TLS inspection, perfil M365 optimizado. La <b>Compliant Network</b> condition prueba al CA que el tráfico viene desde GSA — bloquea bypass por VPN personal.',
        insight:'Sin Compliant Network, los usuarios bypassean GSA en BYOD. Con ella, CA exige que el sign-in pase por GSA — sin alternativa.',
        introNodes:['internet-access'],
        introEdges:[
          {a:'global-secure-access', b:'internet-access', t:'data', label:'SSE profile'},
          {a:'internet-access', b:'conditional-access', t:'policy', label:'compliant network'}
        ],
        annotations:[{x:870, y:130, arrow:'down', tone:'edge-policy', body:'<b>Compliant Network</b>'}]
      }
    ]
  }
}
