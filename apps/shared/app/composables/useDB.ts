import { MockCbtDB } from '#layers/shared/db'

let db: MockCbtDB | null = null
export default () => {
  if (!db)
    db = new MockCbtDB()
  return db
}
