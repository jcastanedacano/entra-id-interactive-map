// MITRE ATT&CK overlay for scenarios.
// Each scenario can reference 2-4 techniques; each has `role`:
//   - 'attack'  : scenario describes execution of the technique
//   - 'defense' : scenario describes how the stack mitigates/detects it
// Tactics use the Enterprise tactic ID (TA*).
//
// Sources: attack.mitre.org/techniques/ (verified Oct 2025).

// ── Technique catalog ───────────────────────────────────────────────────────
export const TTP = {
  'T1078':       { name: 'Valid Accounts',                       tactic: 'Defense Evasion' },
  'T1078.004':   { name: 'Cloud Accounts',                       tactic: 'Initial Access' },
  'T1098':       { name: 'Account Manipulation',                 tactic: 'Persistence' },
  'T1110':       { name: 'Brute Force',                          tactic: 'Credential Access' },
  'T1110.003':   { name: 'Password Spraying',                    tactic: 'Credential Access' },
  'T1133':       { name: 'External Remote Services',             tactic: 'Initial Access' },
  'T1136':       { name: 'Create Account',                       tactic: 'Persistence' },
  'T1190':       { name: 'Exploit Public-Facing Application',    tactic: 'Initial Access' },
  'T1199':       { name: 'Trusted Relationship',                 tactic: 'Initial Access' },
  'T1213':       { name: 'Data from Information Repositories',   tactic: 'Collection' },
  'T1484':       { name: 'Domain or Tenant Policy Modification', tactic: 'Defense Evasion' },
  'T1528':       { name: 'Steal Application Access Token',       tactic: 'Credential Access' },
  'T1530':       { name: 'Data from Cloud Storage',              tactic: 'Collection' },
  'T1539':       { name: 'Steal Web Session Cookie',             tactic: 'Credential Access' },
  'T1550.002':   { name: 'Pass the Hash',                        tactic: 'Lateral Movement' },
  'T1552':       { name: 'Unsecured Credentials',                tactic: 'Credential Access' },
  'T1552.004':   { name: 'Private Keys',                         tactic: 'Credential Access' },
  'T1556':       { name: 'Modify Authentication Process',        tactic: 'Credential Access' },
  'T1557':       { name: 'Adversary-in-the-Middle',              tactic: 'Credential Access' },
  'T1557.003':   { name: 'AiTM · Web Session Cookie',            tactic: 'Credential Access' },
  'T1558.003':   { name: 'Kerberoasting',                        tactic: 'Credential Access' }
}

// ── Per-scenario mapping ────────────────────────────────────────────────────
// role values: 'attack' = scenario *executes* the TTP · 'defense' = scenario
// *mitigates/detects* the TTP.
export const SCENARIO_MITRE = {
  // Compliance & framework — all defensive
  'zero-trust':         [{ id:'T1078', role:'defense' }, { id:'T1557', role:'defense' }, { id:'T1110', role:'defense' }],
  'nist-ia':            [{ id:'T1078', role:'defense' }, { id:'T1110', role:'defense' }, { id:'T1556', role:'defense' }],
  'iso-27001-ac':       [{ id:'T1078', role:'defense' }, { id:'T1098', role:'defense' }, { id:'T1484', role:'defense' }],
  'nis2-identity':      [{ id:'T1078', role:'defense' }, { id:'T1110', role:'defense' }, { id:'T1556', role:'defense' }],

  // Use case · attack & defense
  'uc-aitm':            [{ id:'T1557.003', role:'attack' }, { id:'T1539', role:'attack' }, { id:'T1078.004', role:'attack' }],
  'uc-pwd-spray':       [{ id:'T1110.003', role:'attack' }, { id:'T1078', role:'attack' }],
  'uc-lateral':         [{ id:'T1558.003', role:'attack' }, { id:'T1550.002', role:'attack' }, { id:'T1078', role:'attack' }],
  'uc-workload-leak':   [{ id:'T1552.004', role:'attack' }, { id:'T1078.004', role:'attack' }, { id:'T1098', role:'attack' }],
  'uc-byod-copilot':    [{ id:'T1530', role:'attack' }, { id:'T1213', role:'attack' }],
  'uc-ca-optim':        [{ id:'T1078.004', role:'defense' }, { id:'T1199', role:'defense' }],
  'uc-agent-risky':     [{ id:'T1078', role:'defense' }, { id:'T1110', role:'defense' }, { id:'T1556', role:'defense' }],
  'uc-agent-cleanup':   [{ id:'T1078.004', role:'defense' }, { id:'T1098', role:'defense' }],
  'uc-multitenant-secret': [{ id:'T1552', role:'attack' }, { id:'T1528', role:'attack' }, { id:'T1078.004', role:'attack' }, { id:'T1199', role:'attack' }],

  // Deployment model — all defensive
  'dp-passwordless':    [{ id:'T1110', role:'defense' }, { id:'T1557', role:'defense' }, { id:'T1539', role:'defense' }],
  'dp-jml':             [{ id:'T1078', role:'defense' }, { id:'T1136', role:'defense' }, { id:'T1098', role:'defense' }],
  'dp-pim-zero-standing':[{ id:'T1078', role:'defense' }, { id:'T1098', role:'defense' }, { id:'T1484', role:'defense' }],
  'dp-gsa':             [{ id:'T1133', role:'defense' }, { id:'T1190', role:'defense' }],
  'dp-b2b-ext':         [{ id:'T1199', role:'defense' }, { id:'T1078.004', role:'defense' }],

  // Identity flow — all detection/defense
  'fl-sign-in':         [{ id:'T1078', role:'defense' }],
  'fl-jit-admin':       [{ id:'T1078', role:'defense' }, { id:'T1098', role:'defense' }],
  'fl-risk-response':   [{ id:'T1078', role:'defense' }, { id:'T1110', role:'defense' }, { id:'T1539', role:'defense' }]
}

// Helper used by DetailPanel.
export function getMitreFor(scenarioId) {
  const list = SCENARIO_MITRE[scenarioId]
  if (!list) return []
  return list.map(ref => ({
    id: ref.id,
    role: ref.role,
    name: TTP[ref.id]?.name || ref.id,
    tactic: TTP[ref.id]?.tactic || '',
    url: `https://attack.mitre.org/techniques/${ref.id.replace('.', '/')}/`
  }))
}
