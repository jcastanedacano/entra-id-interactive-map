// Cost overlay toggle — module-level store via useSyncExternalStore.
// Same pattern as useBlastRadius / useCompare so the Toolbar button and
// GridView/GraphView/MindmapView all see the same on/off state.

import { useSyncExternalStore } from 'react'

let _enabled = false
const _listeners = new Set()
function _emit() { _listeners.forEach(l => l()) }
function _subscribe(l) { _listeners.add(l); return () => _listeners.delete(l) }
function _getSnapshot() { return _enabled }

export function setCostEnabled(v) {
  const next = !!v
  if (next === _enabled) return
  _enabled = next; _emit()
}
export function toggleCost() { setCostEnabled(!_enabled) }

export function useCostOverlay() {
  const enabled = useSyncExternalStore(_subscribe, _getSnapshot, _getSnapshot)
  return { enabled, toggle: toggleCost, setEnabled: setCostEnabled }
}
