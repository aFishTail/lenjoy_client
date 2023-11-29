// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { SessionOptions } from 'iron-session'

export interface SessionData {
  username: string
  token: string
  isLoggedIn: boolean
}

export const defaultSession: SessionData = {
  username: '',
  token: '',
  isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'session',
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === 'production',
  },
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: IUser
  }
}
