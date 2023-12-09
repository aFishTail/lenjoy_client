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
  console.log('session:',session)

  // const res = await axios.post(`http://localhost:3000/api/auth/userInfo`, {
  // }, {headers: {authorization: session.token}})

  // if (res.status !== 201) {
  //   response.status(res.status).json({ error: res.statusText })
  // } else {
  //   response.status(201).json(res.data)
  // }
  response.status(200).json({name: 'name'})
}
