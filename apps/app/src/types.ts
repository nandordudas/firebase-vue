export type Nullable<T> = T | null | undefined

export interface Entity {
  id: string
  key?: string // INFO: because of iteration item 🤔
}
