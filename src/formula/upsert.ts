import { Formula } from '@barajs/formula'
import { RxCollection } from 'rxdb'

import { withCollection } from './withCollection'
/**
 * @param {string} collection
 * @param {Formula} formula
 */
export const upsert = withCollection(
  (query: Formula) => async (
    payload: any,
    collection: RxCollection,
    ...rest: any[]
  ) => {
    const q = await Promise.resolve(query(payload, ...rest))
    return await collection.upsert(q)
  },
)
