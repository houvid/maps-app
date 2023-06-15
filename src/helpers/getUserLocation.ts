export const getUserLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.latitude, coords.longitude])
      },
      (err) => {
        alert('¡Recuerda Activar la Geolocalización en la CONFIGURACION de tu teléfono!')
        console.log(err)
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
      }
    )
  })
}
