import React, { useMemo } from 'react'
import { X, ExternalLink } from 'lucide-react'
import { COMPONENT_MAP, CATEGORIES } from '../data/components.js'
import { EDGES, EDGE_TYPES } from '../data/edges.js'
import { COMPONENT_META, WORKLOADS, WORKLOAD_ORDER, coverageScore } from '../data/workloads.js'
import { useCompare, toggleCompareId, clearCompare } from '../hooks/useCompare.js'

// Bottom drawer that shows up to 2 components side-by-side.
// Hidden when no ids are picked. Slide-up reveal when at least 1 picked.
export default function CompareDrawer() {
  const { ids } = useCompare()
  const comps = useMemo(() => ids.map(id => COMPONENT_MAP[id]).filter(Boolean), [ids])

  if (comps.length === 0) return null

  const ink = '#0E1729', ink2 = '#344054', ink3 = '#667085', border = '#E4E7EC'

  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, bottom: 0,
      zIndex: 50,
      background: '#FFFFFF',
      borderTop: `2px solid ${ink}`,
      boxShadow: '0 -8px 24px rgba(15,23,42,0.10)',
      fontFamily: 'Inter, system-ui, sans-serif',
      maxHeight: '52vh', overflow: 'hidden',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', borderBottom: `1px solid ${border}`,
        background: '#F6F7F9'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: ink, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            Compare · {comps.length}/2
          </span>
          <span style={{ fontSize: 10.5, color: ink3 }}>
            Click derecho en cards de Graph/Grid para agregar · {comps.length === 1 && 'selecciona uno más para ver side-by-side'}
          </span>
        </div>
        <button onClick={clearCompare} title="Cerrar compare"
          style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
            border: `1px solid ${border}`, borderRadius: 6, background: '#fff',
            color: ink2, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit'
          }}>
          <X size={12} /> Cerrar
        </button>
      </div>

      {/* Two-column body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: comps.length === 2 ? '1fr 1fr' : '1fr',
        gap: 0,
        flex: 1, overflow: 'auto'
      }}>
        {comps.map((c, idx) => <CompareColumn key={c.id} comp={c} idx={idx} other={comps[1 - idx]} />)}
      </div>
    </div>
  )
}

function CompareColumn({ comp, idx, other }) {
  const cat = CATEGORIES[comp.category] || { color: '#475467', bg: '#F6F7F9', label: comp.category }
  const meta = COMPONENT_META[comp.id]
  const score = Math.round((coverageScore(comp.id) || 0) * 100)

  const outEdges = EDGES.filter(e => e.source === comp.id)
  const inEdges = EDGES.filter(e => e.target === comp.id)

  // If the OTHER component is the source or target of an edge, mark it
  const sharedWithOther = other ? EDGES.filter(e =>
    (e.source === comp.id && e.target === other.id) ||
    (e.source === other.id && e.target === comp.id)
  ) : []

  return (
    <div style={{
      padding: '14px 18px',
      borderRight: idx === 0 ? '1px solid #E4E7EC' : 'none',
      minWidth: 0, overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        {comp.iconSvg && <img src={comp.iconSvg} alt="" style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} onError={(e) => { e.target.style.display = 'none' }} />}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0E1729', lineHeight: 1.2 }}>{comp.name}</div>
          <div style={{ fontSize: 10, color: cat.color, fontWeight: 600, marginTop: 2, textTransform: 'uppercase', letterSpacing: '.06em' }}>{cat.label}</div>
        </div>
        <button onClick={() => toggleCompareId(comp.id)} title="Remover de compare"
          style={{ padding: 4, border: 'none', background: 'transparent', cursor: 'pointer', color: '#98A2B3' }}>
          <X size={14} />
        </button>
      </div>

      {/* Description */}
      <p style={{ fontSize: 11.5, color: '#344054', lineHeight: 1.55, margin: 0 }}>{comp.description}</p>

      {/* Quick stats row */}
      <div style={{ display: 'flex', gap: 14, marginTop: 12, paddingTop: 10, borderTop: '1px solid #EEF0F3' }}>
        <Stat label="Phase" value={meta?.phase ? `P${meta.phase}` : '—'} />
        <Stat label="Edges out" value={outEdges.length} />
        <Stat label="Edges in" value={inEdges.length} />
        <Stat label="Coverage" value={`${score}%`} />
      </div>

      {/* Shared edges (highlight) */}
      {sharedWithOther.length > 0 && (
        <div style={{ marginTop: 10, padding: 8, background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#1D4ED8', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>
            Conexión directa con {other?.name}
          </div>
          {sharedWithOther.map((e, i) => {
            const et = EDGE_TYPES[e.type]
            const dir = e.source === comp.id ? '→' : '←'
            return (
              <div key={i} style={{ fontSize: 11, color: '#0E1729', lineHeight: 1.5 }}>
                <span style={{ color: et?.color, fontWeight: 600 }}>{dir} {e.type}</span> · {e.label}
              </div>
            )
          })}
        </div>
      )}

      {/* Workload coverage strip */}
      {meta && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#98A2B3', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>Recursos protegidos</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {WORKLOAD_ORDER.map(wid => {
              const w = WORKLOADS[wid]
              const cov = meta.workloads?.[wid] || 0
              if (cov === 0) return null
              return (
                <span key={wid} title={`${w.label} · ${cov === 2 ? 'full' : 'partial'} coverage`}
                  style={{ fontSize: 9.5, padding: '2px 6px', borderRadius: 4,
                    background: cov === 2 ? w.color : 'transparent',
                    color: cov === 2 ? '#fff' : w.color,
                    border: `1px solid ${w.color}`, fontWeight: 600,
                    fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}>
                  {w.short}
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Edges out + in (collapsed lists) */}
      <details style={{ marginTop: 10 }}>
        <summary style={{ fontSize: 10, fontWeight: 700, color: '#98A2B3', textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer' }}>
          Edges salientes ({outEdges.length})
        </summary>
        <ul style={{ margin: '4px 0 0', padding: '0 0 0 14px', fontSize: 10.5, color: '#344054', lineHeight: 1.6 }}>
          {outEdges.slice(0, 8).map((e, i) => {
            const target = COMPONENT_MAP[e.target]
            const et = EDGE_TYPES[e.type]
            return (
              <li key={i}>
                <span style={{ color: et?.color, fontWeight: 600 }}>{e.type}</span>
                {' → '}
                <span style={{ color: '#0E1729', fontWeight: 500 }}>{target?.name || e.target}</span>
                {e.label && <span style={{ color: '#98A2B3' }}> · {e.label}</span>}
              </li>
            )
          })}
          {outEdges.length > 8 && <li style={{ color: '#98A2B3', listStyle: 'none' }}>… {outEdges.length - 8} más</li>}
        </ul>
      </details>

      <details style={{ marginTop: 4 }}>
        <summary style={{ fontSize: 10, fontWeight: 700, color: '#98A2B3', textTransform: 'uppercase', letterSpacing: '.06em', cursor: 'pointer' }}>
          Edges entrantes ({inEdges.length})
        </summary>
        <ul style={{ margin: '4px 0 0', padding: '0 0 0 14px', fontSize: 10.5, color: '#344054', lineHeight: 1.6 }}>
          {inEdges.slice(0, 8).map((e, i) => {
            const source = COMPONENT_MAP[e.source]
            const et = EDGE_TYPES[e.type]
            return (
              <li key={i}>
                <span style={{ color: et?.color, fontWeight: 600 }}>{e.type}</span>
                {' ← '}
                <span style={{ color: '#0E1729', fontWeight: 500 }}>{source?.name || e.source}</span>
                {e.label && <span style={{ color: '#98A2B3' }}> · {e.label}</span>}
              </li>
            )
          })}
          {inEdges.length > 8 && <li style={{ color: '#98A2B3', listStyle: 'none' }}>… {inEdges.length - 8} más</li>}
        </ul>
      </details>

      {/* Learn link */}
      {comp.learnUrl && (
        <a href={comp.learnUrl} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 12,
            fontSize: 11, color: '#1D4ED8', textDecoration: 'none', fontWeight: 600
          }}>
          <ExternalLink size={12} /> Microsoft Learn
        </a>
      )}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#0E1729', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 8.5, color: '#98A2B3', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 2, fontWeight: 700 }}>{label}</div>
    </div>
  )
}
