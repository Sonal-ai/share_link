// lib/auth.js
import axios from 'axios'

export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) throw new Error("Missing refresh token")

  const res = await axios.post('https://tnp-recruitment-challenge.manitvig.live/refresh', {
    refreshToken
  })

  localStorage.setItem('accessToken', res.data.accessToken)
  return res.data.accessToken
}
