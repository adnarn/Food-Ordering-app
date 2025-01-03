import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../stores/auth/authSlice'


const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector((selectIsLoggedIn))

    if (isLoggedIn) {
        return children
    }
  return null
}

export const ShowOnLogOut = ({children}) => {
    const isLoggedIn = useSelector((selectIsLoggedIn))

    if (!isLoggedIn) {
        return children
    }
  return null
}

export default ShowOnLogin