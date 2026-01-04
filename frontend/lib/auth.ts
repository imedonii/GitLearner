export async function getMe() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    credentials: 'include',
  })

  if (!res.ok) return null
  return res.json()
}
