import { getContext } from '@barajs/core'
import { Formula } from '@barajs/formula'

import { RxCollection } from 'rxdb'

import { BARA_RXDB } from '../types'

export const withCollection = (formula: Formula) => (...args: any[]) => (
  payload: any,
  contextes: any,
) => {
  const data: any = getContext(BARA_RXDB, contextes)
  const [collectionName, ...rest] = args
  const collection: RxCollection = data.collections[collectionName]
  return formula(...rest)(payload, collection, contextes)
}
