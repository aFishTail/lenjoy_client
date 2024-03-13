import axios, { AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { getIronSession } from 'iron-session'
import { SessionData, sessionOptions } from '@/lib/session'

interface RegisterParams {
  username: string
  email: string
  password: string
  captchaId: string
  captchaCode: string
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  )
  const { username, password, captchaId, captchaCode, email } =
    request.body as RegisterParams
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      username,
      password,
      captchaId,
      captchaCode,
      email,
    })
    console.log('registerRes', res)
    session.username = username
    session.token = res.data.data.token
    session.isLoggedIn = true
    await session.save()
    response.status(201).json(res.data)
  } catch (error) {
    const res = (error as any).response as AxiosResponse
    response.status(res.status).json(res.data)
  }
}
