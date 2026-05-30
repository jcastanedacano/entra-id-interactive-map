// Compare mode — pick up to 2 components and show them side-by-side in a
// bottom drawer. Module-level store via useSyncExternalStore so the toggle
// is shared between Graph/Grid right-click handlers and the drawer renderer.

import { useSyncExternalStore } from 'react'

const MAX = 2

let _ids = []           // [string, string?] — order matters for left/right slots
const _listeners = new Set()
function _emit() { _listeners.forEach(l => l()) }
function _subscribe(l) { _listeners.add(l); return () => _listeners.delete(l) }
function _getSnapshot() { return _ids }

export function toggleCompareId(id) {
  if (!id) return
  if (_ids.includes(id)) {
    _ids = _ids.filter(x => x !== id)
  } else {
    if (_ids.length >= MAX) _ids = [_ids[1], id]  // FIFO eviction
    else _ids = [..._ids, id]
  }
  _emit()
}

export function clearCompare() {
  if (_ids.length === 0) return
  _ids = []
  _emit()
}

export function useCompare() {
  const ids = useSyncExternalStore(_subscribe, _getSnapshot, _getSnapshot)
  return { ids, toggle: toggleCompareId, clear: clearCompare, max: MAX }
}
