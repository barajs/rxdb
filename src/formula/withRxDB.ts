import { getContext } from '@barajs/core'
import { Formula } from '@barajs/formula'

import { RxDatabase } from 'rxdb'

import { BARA_RXDB } from '../types'

export const withRxDB = (formula: Formula) => (options?: any) => (
  payload: any,
  contextes: any,
) => {
  const data: any = getContext(BARA_RXDB, contextes)
  const rxdb: RxDatabase = data.rxdb
  return formula(options)(payload, rxdb, contextes)
}
