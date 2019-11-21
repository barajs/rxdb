import { portion, flow, popEvent } from '@barajs/core'

import RxDB, { RxDatabase } from 'rxdb'
import HttpPouch from 'pouchdb-adapter-http'
import * as SQLite from 'expo-sqlite'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'

import { RxDBContext, RxDBMold, BARA_RXDB } from './types'

const SQLiteAdapter = SQLiteAdapterFactory(SQLite)

RxDB.plugin(SQLiteAdapter)
RxDB.plugin(HttpPouch)

export const BaraRxDB = portion<any, RxDBContext, RxDBMold>({
  name: BARA_RXDB,
  init: mold => {
    const { options, rxdb } = mold
    const db: Promise<RxDatabase> =
      rxdb ||
      RxDB.create({
        name: BARA_RXDB,
        adapter: 'react-native-sqlite',
        multiInstance: false,
        ...options,
      })
    const collections = {}
    return { db, collections }
  },
  whenInitialized: flow<any, RxDBContext, RxDBMold>({
    bootstrap: ({ context, mold, next }) => {
      const { db } = context
      db.then(async (realDB: RxDatabase) => {
        const { collections } = mold
        for (const config of collections) {
          const col = await realDB.collection(config)
          context.collections[col.name] = col
          console.log(`[RxDB Collection] Registered "${col.name}"`)
        }
        context.db = realDB
        next()
      }).catch((err: Error) => {
        console.error(`[RxDB Error]: ${err.message}`)
      })
    },
  }),
})

const { whenInitialized: whenDatabaseReady } = popEvent(BaraRxDB)

export { whenDatabaseReady }

export * from './formula'
