import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
function ProtectedRoute({ roles, element, children, ...rest }) {
   const { user, createUser, signIn, signOut, setIsLoading } = useAuth()
   console.log('User from firebase ', user);
   if (Object.keys(user).length === 0) {
      return <Navigate to='/' />;
   }
   return children
}


export default ProtectedRoute

