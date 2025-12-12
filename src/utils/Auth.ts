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

export async function getAccessTokenNameCard(): Promise<ISetHeader | null> {
  await liff?.init({
    liffId: import.meta.env.VITE_APP_LIFF_ID || '',
    withLoginOnExternalBrowser: true,
  })
  const accessToken = liff.getIDToken()
  console.assert(!!accessToken, 'Name-Card AccessToken not found')
  return makeHeader('x-id-token-vc', accessToken)
}

export async function getAccessTokenSeatReservation(): Promise<ISetHeader | null> {
  await liff?.init({
    liffId: import.meta.env.VITE_APP_LIFF_ID_2 || '',
    withLoginOnExternalBrowser: true,
  })
  const accessToken = liff.getIDToken()
  console.assert(!!accessToken, 'Seat-reservation AccessToken not found')
  return makeHeader('x-id-token-lt', accessToken)
}
