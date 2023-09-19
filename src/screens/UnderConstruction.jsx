import React from 'react'

export const UnderConstruction = () => {
  return (
    <div className='construction-container'>

      <div className='logos-gob'>
        <img src='/img-UC/logo-gobierno.png' className='logo-gobierno' />
        <img src='/img-UC/logo-cultura.png' className='logo-cultura' />
      </div>

      <div className='textos'>
        <h1>Agenda en Construcción</h1>
        <p>Si quieres que tu evento esté en esta agenda dejanos tus datos
          <a href='https://forms.gle/LvVzNNdGNu7NMhiN6' target='_blank'> aquí</a>
        </p>
      </div>

      <div className='organiza'>

        <div className='logo-txt'>
          <span>Powered By</span>
          <img src='/img-UC/logo-geoguia.jpg' />
        </div>

        <div className='logo-txt'>
          <span>Organiza</span>
          <img src='/img-UC/logo-licania.png' />
        </div>
      </div>
    </div>
  )
}
