import type { Fn } from './types'

export function unary(fn: Fn) {
  return (arg: Parameters<Fn>[0]) => fn(arg)
}

export function invoke(fn: Fn) {
  return fn()
}
