import { Spin } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config';

export const AuthContext = createContext()

function AuthProvider({ children }) {
   const [user, setUser] = useState({});

   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate()

   const createUser = (email, password) => {
      return auth.createUserWithEmailAndPassword(email, password)
   }

   const signIn = (email, password) => {
      return auth.signInWithEmailAndPassword(email, password)
   }

   const signOut = () => {
      return auth.signOut()
   }

   const resetPassword = (email) => {
      return auth.sendPasswordResetEmail(email)
   }

   const updateEmail = (email) => {
      return user.updateEmail(email)
   }

   const updatePassword = (password) => {
      return user.updatePassword(password)
   }
   console.log(user);
   useEffect(() => {

      const unsubcribed = auth.onAuthStateChanged((userAuth) => {
         setIsLoading(false)
         if (userAuth) {
            auth.currentUser.getIdTokenResult().then(({ claims }) => {
               setUser(claims)
               console.log(user);
               if (claims.role === 'admin') {
                  navigate('./admin')
               }
               if (claims.role === 'manager') {
                  navigate('./manager')
               }
            })
         } else {
            setUser({})
         }

      })
      return unsubcribed
   }, [])

   const value = {
      user,
      signIn,
      signOut,
      createUser,
      resetPassword,
      updateEmail,
      updatePassword,
      setIsLoading
   }
   return (
      <AuthContext.Provider value={value}>
         <Spin tip="Loading..."
            size='large'
            style={{ position: 'fixed', inset: 50 }}
            spinning={isLoading}
         >
            {children}
         </Spin>
      </AuthContext.Provider>
   )
}
export default AuthProvider
export const useAuth = () => {
   return useContext(AuthContext)
}