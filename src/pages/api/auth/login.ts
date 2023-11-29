import axios from 'axios'
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
    sessionOptions,
  );
  const { username, password, captchaId, captchaCode } = request.body

  const res = await axios.post(`http://localhost:3000/api/auth/login`, {
    username,
    password,
    captchaId,
    captchaCode,
  })

  if (res.status !== 201) {
    response.status(res.status).json({ error: res.statusText })
  } else {
    session.username = username
    session.token = res.data.data.token
    session.isLoggedIn = true
    await session.save();
    response.status(201).json(res.data)
  }
}
