const admin = require('firebase-admin')
let create = async (req, res) => {
   try {
      const { displayName, password, email, role } = req.body
      if (!displayName || !password || !email || !role) {
         return res.status(400).send({
            message: 'Missing field'
         })
      }
      const { uid } = await admin.auth().createUser({
         displayName,
         password,
         email
      })
      await admin.auth().setCustomUserClaims(uid, { role })
      return res.status(201).send({ uid })
   } catch (err) {

   }

}
let all = async (req, res) => {
   try {
      const listUsers = await admin.auth().listUsers()
      const users = listUsers.users.map(user => {
         const customClaims = user.customClaims || { role: '' }
         const role = customClaims.role ? customClaims.role : ''
         return {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            role,
            lastSignInTime: user.metadata.lastSignInTime,
            creationTime: user.metadata.creationTime
         }
      })
      return res.status(200).send(users)
   } catch (err) {
      return handleError(res, err)
   }
}
let handleError = (res, err) => {
   return res.status(500).send({
      message: `${err.code} - ${err.message}`
   })
}
module.exports = {
   create, all
}