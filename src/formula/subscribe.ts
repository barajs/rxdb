import { Formula } from '@barajs/formula'

import { RxReplicationState } from 'rxdb'

export const changeSub = (formula: Formula) => (
  payload: RxReplicationState,
  ...rest: any[]
) => {
  payload.change$.subscribe((changed: any) => formula(changed, ...rest))
  return payload
}

export const docSub = (formula: Formula) => (
  payload: RxReplicationState,
  ...rest: any[]
) => {
  payload.docs$.subscribe((docData: any) => formula(docData, ...rest))
  return payload
}

export const deniedSub = (formula: Formula) => (
  payload: RxReplicationState,
  ...rest: any[]
) => {
  payload.denied$.subscribe((docData: any) => formula(docData, ...rest))
  return payload
}

export const errorSub = (formula: Formula) => (
  payload: RxReplicationState,
  ...rest: any[]
) => {
  payload.error$.subscribe((docData: any) => formula(docData, ...rest))
  return payload
}

export const completeSub = (formula: Formula) => (
  payload: RxReplicationState,
  ...rest: any[]
) => {
  payload.complete$.subscribe((docData: any) => formula(docData, ...rest))
  return payload
}

export const aliveSub = (formula: Formula) => (
  payload: RxReplicationState,
  ...rest: any[]
) => {
  payload.alive$.subscribe((docData: any) => formula(docData, ...rest))
  return payload
}
