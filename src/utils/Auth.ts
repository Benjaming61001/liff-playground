import liff from '@line/liff'

export interface ISetHeader {
  key: string
  value: unknown
}

export function makeHeader(key: string, value: string | null = ''): ISetHeader | null {
  if (!value) return null
  return {
    key,
    value,
  }
}

async function initAndGetIdToken(liffId: string): Promise<string | null> {
  liff.openWindow({url: `https://liff.line.me/${liffId}` })
  await liff?.init({ liffId })
  const redirectUri = await liff.permanentLink.createUrlBy(window.location.href)
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri })
    return null
  }
  return liff.getIDToken()
}

export async function getAccessTokenNameCard(): Promise<ISetHeader | null> {
  const liffId = import.meta.env.VITE_APP_LIFF_ID || ''
  const accessToken = await initAndGetIdToken(liffId)
  return makeHeader('x-id-token-vc', accessToken)
}

export async function getAccessTokenSeatReservation(): Promise<ISetHeader | null> {
  const liffId = import.meta.env.VITE_APP_LIFF_ID_2 || ''
  const accessToken = await initAndGetIdToken(liffId)
  return makeHeader('x-id-token-lt', accessToken)
}
