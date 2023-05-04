import { useState, useEffect, createContext, useContext } from 'react'
import { auth } from '../firebase/firebase.ts'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) {
    console.log('error creating auth context')
  }
  return context
}

export function AuthProvider ({ children }) {
  const [user, setUser] = useState('')
  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log('no hay usuario suscrito')
        setUser('')
      } else {
        setUser(currentUser)
      }
    })
    return () => subscribed()
  }, [])

  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    console.log(response)
  }

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    // window.location.href = '/administration'
    console.log(response)
  }

  const logout = async () => {
    const response = await signOut(auth)
    console.log(response)
  }
  return (
    <authContext.Provider
      value={{
        register,
        login,
        logout,
        user
      }}
    >
      {children}
    </authContext.Provider>
  )
}
