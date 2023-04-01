export const getUserLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude])
      },
      (err) => {
        alert('No se pudo obtener la geolocalización' + err)
        console.log(err)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
      }
    )
  })
}
