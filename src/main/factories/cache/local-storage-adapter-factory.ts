import { SetStorage } from '@/data/protocols/cache'
import { LocalStorageAdapter } from '@/infra/test/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
