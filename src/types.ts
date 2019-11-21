import { RxDatabase, RxCollection, RxCollectionCreator } from 'rxdb'
export const BARA_RXDB = 'bara-rxdb'

export interface RxDBMold {
  options?: any
  rxdb?: Promise<RxDatabase>
  collections?: RxCollectionCreator[]
}

export interface RxDBContext {
  db: Promise<RxDatabase<any>> | RxDatabase<any>
  collections: {
    [k: string]: RxCollection
  }
}
