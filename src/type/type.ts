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
export type Article = {
  id?: number
  title: string
  content: string
  postTime: number
  tag: string
  view: number
  user: User
  category: Category
}
export type Category = {
  id?: number
  categoryName?: string
}

export type UserInfo = {
  username: string
  password: string
}
export type User = {
  id?: number
  username?: string
}
export type Token = {
  tokenName: string
  tokenValue: string
}
export type ArticleList = {
  title: string
  category: Category
  postTime: number
}
export type Anchor = {
  title: string
  href: string
}
export type Sensitive = {
  id?: number
  sensitiveWord: string
}
