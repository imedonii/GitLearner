import { jwtVerify } from 'jose'

export async function verifyAuth(token: string) {
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return true
  } catch {
    return false
  }
}
