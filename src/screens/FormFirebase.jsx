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
    auth.login(email, password)
    navigate('/administration')
  }
  const handleLogout = (e) => {
    e.preventDefault()
    auth.logout()
  }
  const usuario = () => {
    console.log(auth.user.email)
  }

  return (
    <div className='auth'>
      <div className='auth__header'>
        <div className='auth__logo'>
          <img height='90' src='https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/083/full/EGH_VueJS_Final.png' alt='' />
        </div>
      </div>
      <div className='auth__body'>
        <form className='auth__form' autoComplete='off'>
          <div className='auth__form_body'>
            <h3 className='auth__form_title'>Sign in</h3>
            <div>
              <div className='form-group'>
                <label className='text-uppercase small'>Email</label>
                <input type='email' className='form-control' onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
              </div>
              <div className='form-group'>
                <label className='text-uppercase small'>Password</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' />
              </div>
            </div>
          </div>
          <div className='auth__form_actions'>
            <button className='btn btn-primary btn-lg btn-block' onClick={(e) => handleLogin(e)}>
              LOGIN
            </button>
            <div className='mt-2'>
              <a href='#' className='small text-uppercase' onClick={() => usuario()}>
                Forgot password
              </a>
            </div>
            <div className='mt-2'>
              <button className='btn btn-primary btn-lg btn-block' onClick={(e) => handleLogout(e)}>
                logout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormsFirebase
