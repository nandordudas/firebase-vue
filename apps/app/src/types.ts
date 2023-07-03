export type Nullable<T> = T | null | undefined

export interface Entity {
  readonly id: string
  readonly key?: string // INFO: because of iteration item 🤔
}
