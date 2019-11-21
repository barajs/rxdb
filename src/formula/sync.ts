import { RxCollection, SyncOptions } from 'rxdb'
import { withCollection } from './withCollection'

export interface SyncProps {
  name: string
}

export const sync = withCollection(
  (options: SyncOptions) => (_: any, collection: RxCollection) => {
    let syncState = null
    try {
      syncState = collection.sync(options)
    } catch (err) {
      console.log(err)
    }
    return syncState
  },
)
