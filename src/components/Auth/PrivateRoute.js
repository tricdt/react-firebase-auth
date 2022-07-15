import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute({ children, redirectTo }) {
   const { user, createUser, signIn, signOut, setIsLoading } = useAuth()
   if (Object.keys(user).length === 0) {
      return <Navigate to={redirectTo} />;
   }
   return (
      children
   )
}

PrivateRoute.propTypes = {}

export default PrivateRoute
