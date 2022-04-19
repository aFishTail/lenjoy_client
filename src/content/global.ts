import React from 'react'

export interface IGlobalContext {
  setting: ISetting
  categories: ICategory[]
  tags: ITag[]
  user: IUser
  setUser: (arg: IUser) => void
  removeUser: () => void
}

export const GlobalContext = React.createContext<IGlobalContext>({
    setting: {},
     categories: [],
     tags: [],
     user: null as any,
     setUser: () => {},
     removeUser: () => {}
})