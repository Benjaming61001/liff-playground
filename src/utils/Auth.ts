import liff from '@line/liff'

export interface ISetHeader {
  key: string
  value: unknown
}

export async function getLocalToken(key: string): Promise<string | null> {
  return localStorage.getItem(key)
}

export function saveToken(key: string, token: string) {
  localStorage.setItem(key, token)
}

export function clearTokens() {
  localStorage.removeItem('x-id-token-vc')
  localStorage.removeItem('x-id-token-lt')
}

export function makeHeader(key: string, value: string | null = ''): ISetHeader | null {
  if (!value) return null
  return { key, value }
}

export async function initAndGetIdToken(liffId: string): Promise<string | null> {
  await liff.init({ liffId })
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: window.location.href })
    return null
  }

  return liff.getIDToken()
}

export async function getAccessTokenNameCard(): Promise<ISetHeader | null> {
  const accessToken = await getLocalToken('x-id-token-vc')
  return makeHeader('x-id-token-vc', accessToken)
}

export async function getAccessTokenSeatReservation(): Promise<ISetHeader | null> {
  const accessToken = await getLocalToken('x-id-token-lt')
  return makeHeader('x-id-token-lt', accessToken)
}
