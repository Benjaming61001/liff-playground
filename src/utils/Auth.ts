import liff from '@line/liff'

export interface ISetHeader {
  key: string
  value: unknown
}

export function makeHeader(key: string, value: string | null = ''): ISetHeader | null {
  if (!value) return null
  return { key, value }
}

async function initAndGetIdToken(liffId: string): Promise<string | null> {
  await liff?.init({ 
    liffId,
    withLoginOnExternalBrowser: true
  })
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
