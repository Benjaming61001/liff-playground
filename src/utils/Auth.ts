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
  const liffId1 = import.meta.env.VITE_APP_LIFF_ID || ''
  // const liffId2 = import.meta.env.VITE_APP_LIFF_ID_2 || ''
  // if (liff.isLoggedIn() && liff.id === liffId1) {
  //   const accessToken = liff.getIDToken()
  //   console.assert(!!accessToken, 'Name-Card AccessToken not found')
  //   return makeHeader('x-id-token-vc', accessToken)
  // }
  // if (liff.id === liffId2) {
  //   liff.openWindow({ url: `https://liff.line.me/${liffId1}` })
  //   return null
  // }
  await liff?.init({
    liffId: liffId1,
    withLoginOnExternalBrowser: true,
  })
  const accessToken = liff.getIDToken()
  console.assert(!!accessToken, 'Name-Card AccessToken not found')
  return makeHeader('x-id-token-vc', accessToken)
}

export async function getAccessTokenSeatReservation(): Promise<ISetHeader | null> {
  // const liffId1 = import.meta.env.VITE_APP_LIFF_ID || ''
  const liffId2 = import.meta.env.VITE_APP_LIFF_ID_2 || ''
  // if (liff.isLoggedIn() && liff.id === liffId2) {
  //   const accessToken = liff.getIDToken()
  //   console.assert(!!accessToken, 'Seat-reservation AccessToken not found')
  //   return makeHeader('x-id-token-lt', accessToken)
  // }
  // if (liff.id === liffId1) {
  //   liff.openWindow({ url: `https://liff.line.me/${liffId2}` })
  //   return null
  // }
  await liff?.init({
    liffId: liffId2,
    withLoginOnExternalBrowser: true,
  })
  const accessToken = liff.getIDToken()
  console.assert(!!accessToken, 'Seat-reservation AccessToken not found')
  return makeHeader('x-id-token-lt', accessToken)
}
