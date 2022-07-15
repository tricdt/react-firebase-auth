import React from 'react'
import { Button } from 'antd';
import { useAuth } from '../../context/AuthContext';
function Admin() {
   const { user, createUser, signIn, signOut } = useAuth()
   const handleLogout = (e) => {
      e.preventDefault()
      signOut()
   }
   return (
      <div>
         <Button type="primary"
            onClick={(e) => handleLogout(e)}
         >
            Log out
         </Button>
      </div>
   )
}

export default Admin