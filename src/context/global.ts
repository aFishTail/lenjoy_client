import React from 'react'
import { boolean } from 'yup'

export interface IGlobalContext {
  setting: ISetting
  scoreRankList: IUserScore[]
  categories: ICategory[]
  tags: ITag[]
  user: IUser
  isMobile: boolean
  setUser: (arg: IUser | null) => void
  removeUser: () => void
  refreshUser: () => void
}

export const GlobalContext = React.createContext<IGlobalContext>({
  setting: {},
  scoreRankList: [],
  categories: [],
  tags: [],
  user: null as any,
  setUser: () => {},
  removeUser: () => {},
  refreshUser: () => {},
  isMobile: false
})
