export type Result<T> = {
  code: number
  msg: string
  data: T
}
export type Hitokoto = {
  hitokoto: string
}

export type ArticleInfo = {
  author: string
  time: number
  view: number
}
export type ArticleDataTable = {
  id: number
  title: string
  category: string
  date: string
}
export type UserInfo = {
  username: string
  password: string
}
