import React from 'react'

export interface IGlobalContext {
  setting: ISetting
  scoreRankList: IUserScore[]
  categories: ICategory[]
  tags: ITag[]
  user: IUser
  setUser: (arg: IUser | null) => void
  removeUser: () => void
}

export const GlobalContext = React.createContext<IGlobalContext>({
  setting: {},
  scoreRankList: [],
  categories: [],
  tags: [],
  user: null as any,
  setUser: () => {},
  removeUser: () => {},
})
