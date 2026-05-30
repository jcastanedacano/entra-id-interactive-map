// Blast Radius — downstream impact propagation BFS over the directed edge
// catalog, exposed as a tiny module-level store shared between Toolbar
// (toggle) and GraphView (renderer) without lifting state to App.jsx.
//
// Visual encoding lives in GraphView.jsx; this file owns:
//   1. The semantic filter (which edge flows propagate impact)
//   2. The pure BFS over (originId, edges, options)
//   3. A subscribe/snapshot store for the on/off toggle
//
// Change PROPAGATING_FLOWS below to model "only escalation + signal" or any
// other semantic without touching the render layer.

import { useSyncExternalStore } from 'react'

// Edge flows that propagate impact during the BFS. Edges declare `flow` in
// lowercase: 'data' | 'signal' | 'policy' | 'escalation'.
export const PROPAGATING_FLOWS = ['data', 'signal', 'policy', 'escalation']

// ─── Heat ramp by hop distance ────────────────────────────────────────────
// hop 0 (origin) → purple selection; hop 1 hot red; cools toward gray.
const HEAT_RAMP = ['#DC2626', '#F97316', '#FACC15', '#84CC16', '#22D3EE', '#94A3B8']

export function hopColor(hop) {
  if (hop <= 0) return '#7C3AED'                   // origin
  const i = Math.min(hop - 1, HEAT_RAMP.length - 1)
  return HEAT_RAMP[i]
}

// Origin gets a purple selection; reachable nodes ramp from hot → cool.
export const HOP_MAX_PALETTE = HEAT_RAMP.length

// ─── Module-level store (subscribe / snapshot) ────────────────────────────
let _enabled = false
const _listeners = new Set()
function _emit() { _listeners.forEach(l => l()) }
function _subscribe(l) { _listeners.add(l); return () => _listeners.delete(l) }
function _getSnapshot() { return _enabled }
export function setBlastEnabled(v) {
  const next = !!v
  if (next === _enabled) return
  _enabled = next
  _emit()
}
export function toggleBlast() { setBlastEnabled(!_enabled) }

// React hook — both Toolbar and GraphView call this; they share `_enabled`
// through the module-level state above.
export function useBlastRadius() {
  const enabled = useSyncExternalStore(_subscribe, _getSnapshot, _getSnapshot)
  return { enabled, toggle: toggleBlast, setEnabled: setBlastEnabled }
}

// ─── Pure BFS — downstream impact propagation ─────────────────────────────
// Follows edges in their declared direction (source → target). Only edges
// whose `flow` is in propagatingFlows count. No hop cap by default — the
// render decides how to encode distance.
//
// Returns:
//   reachable        : Map<nodeId, hop>   (origin is 0)
//   traversedEdgeKeys: Set<"src→tgt">     (edges actually walked during BFS)
//   maxHops          : number             (deepest hop reached)
//   count            : number             (reachable.size including origin)
export function bfsBlast(originId, edges, { propagatingFlows = PROPAGATING_FLOWS } = {}) {
  const empty = { reachable: new Map(), traversedEdgeKeys: new Set(), maxHops: 0, count: 0 }
  if (!originId || !Array.isArray(edges)) return empty

  const flowSet = new Set(propagatingFlows.map(f => String(f).toLowerCase()))
  // Build adjacency: src → [{ source, target, flow, ... }]
  const adj = new Map()
  for (const e of edges) {
    if (!flowSet.has(String(e.flow || '').toLowerCase())) continue
    let list = adj.get(e.source)
    if (!list) { list = []; adj.set(e.source, list) }
    list.push(e)
  }

  const reachable = new Map([[originId, 0]])
  const traversedEdgeKeys = new Set()
  const queue = [originId]
  let maxHops = 0

  while (queue.length) {
    const node = queue.shift()
    const hop = reachable.get(node)
    const outs = adj.get(node)
    if (!outs) continue
    for (const e of outs) {
      traversedEdgeKeys.add(e.source + '→' + e.target)
      if (!reachable.has(e.target)) {
        const nextHop = hop + 1
        reachable.set(e.target, nextHop)
        if (nextHop > maxHops) maxHops = nextHop
        queue.push(e.target)
      }
    }
  }

  return { reachable, traversedEdgeKeys, maxHops, count: reachable.size }
}
