import { GetStorage, SetStorage } from '@/data/protocols/cache'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): SetStorage & GetStorage => {
  return new LocalStorageAdapter()
}
