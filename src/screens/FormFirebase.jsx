/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

function FormsFirebase () {
  const auth = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()
    if (email != null && password != null && password !== '' && email !== '') {
      auth.login(email, password).then(() => { navigate('/administration') }).catch(() => { alert('Couldn\'t login ' + email) })
    }
  }
  const handleLogout = (e) => {
    e.preventDefault()
    auth.logout()
  }

  return (
    <div>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      {/* =============== REMIXICONS =============== */}
      {/* =============== CSS =============== */}
      <div className='login'>
        <form action className='login__form'>
          <h1 className='login__title'>Bienvenido a GeoGuía</h1>
          <div className='login__content'>
            <div className='login__box'>
              <i className='ri-user-3-line login__icon' />
              <div className='login__box-input'>
                <input type='email' required className='login__input' placeholder=' ' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor className='login__label'>CorreoElectrónico</label>
              </div>
            </div>
            <div className='login__box'>
              <i className='ri-lock-2-line login__icon' />
              <div className='login__box-input'>
                <input type='password' required className='login__input' id='login-pass' placeholder=' ' onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor className='login__label'>Contraseña</label>
                <i className='ri-eye-off-line login__eye' id='login-eye' />
              </div>
            </div>
          </div>
          <div className='login__check'>
            <div className='login__check-group'>
              <input type='checkbox' className='login__check-input' />
              <label htmlFor className='login__check-label'>Remember me</label>
            </div>
            <a href='#' className='login__forgot' onClick={(e) => handleLogout(e)}>Forgot Password?</a>
          </div>
          <button className='login__button' onClick={(e) => handleLogin(e)}>Login</button>
        </form>
      </div>
      {/* =============== MAIN JS =============== */}
    </div>
  )
}

export default FormsFirebase
