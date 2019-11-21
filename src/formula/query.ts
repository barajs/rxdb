import { Formula } from '@barajs/formula'

import { RxCollection } from 'rxdb'
import { withCollection } from './withCollection'

export const query = withCollection(
  (query: Formula) => async (
    payload: any,
    collection: RxCollection,
    ...rest: any[]
  ) => {
    const q = await Promise.resolve(query(payload, ...rest))
    return await collection.find(q)
  },
)

export const exec = (queryFormula: Formula) => async (
  payload: any,
  ...rest: any[]
) => {
  const query = await Promise.resolve(queryFormula(payload, ...rest))
  return await query.exec()
}

export const find = (formula?: any | Formula) => async (
  payload: any,
  ...rest: any[]
) => {
  if (typeof formula === 'function') {
    const queryObject = await Promise.resolve(formula(payload, ...rest))
    return queryObject
  }
  return formula
}
