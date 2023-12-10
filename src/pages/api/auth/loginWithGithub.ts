import axios, { AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { getIronSession } from 'iron-session'
import { SessionData, sessionOptions } from '@/lib/session'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  )
  const { code } = request.body
  try {
    const res = await axios.post(
      `http://localhost:3000/api/auth/loginWithGithub`,
      {
        code,
      }
    )
    const user = res.data.data
    session.username = user.username
    session.token = user.token
    session.isLoggedIn = true
    await session.save()
    response.status(201).json(res.data)
  } catch (error) {
    const res = (error as any).response as AxiosResponse
    response.status(res.status).json(res.data)
  }
}
