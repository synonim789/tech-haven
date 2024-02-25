import { jwtDecode } from 'jwt-decode'

type decodedToken = {
  userId: string
  role: string
  exp: string
}

export const decodeToken = (token: string | null) => {
  if (!token) {
    return null
  }

  try {
    const decodedToken: decodedToken = jwtDecode(token)
    const { userId, role, exp } = decodedToken
    return { userId, role, exp }
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}
