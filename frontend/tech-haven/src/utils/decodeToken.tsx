import { jwtDecode } from 'jwt-decode'
import { TokenType } from '../types'

export const decodeToken = (token: TokenType | string) => {
  const decodedToken = jwtDecode(
    typeof token === 'string' ? token : token.token
  )
  const { userId, role, exp } = decodedToken as {
    userId: string
    role: string
    exp: number
  }
  return { userId, role, exp }
}
