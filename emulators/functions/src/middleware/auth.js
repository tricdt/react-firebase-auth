const admin = require('firebase-admin')
const isAuthenticated = () => {
   return async (req, res, next) => {
      const { authorization } = req.headers
      console.log(authorization);
      if (!authorization)
         return res.status(401).send({ message: 'Unauthorized because not authorization' });

      if (!authorization.startsWith('Bearer'))
         return res.status(401).send({ message: 'Unauthorized because not start with Bearer' });

      const split = authorization.split('Bearer ')
      if (split.length !== 2)
         return res.status(401).send({ message: 'Unauthorized because not split.length !==2' });

      const token = split[1]
      console.log('Token ', token);
      try {
         const decodedToken = await admin.auth().verifyIdToken(token)
         console.log("decodedToken", JSON.stringify(decodedToken))
         res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
         return next();
      }
      catch (err) {
         console.error(`${err.code} -  ${err.message}`)
         return res.status(401).send({ message: 'Unauthorized because not decodedToken' });
      }
   }
}
const isAuthorized = (opts) => {
   return (req, res, next) => {
      const { role, email, uid } = res.locals
      const { id } = req.query
      if (opts.allowSameUser && id && uid === id) {
         return next()
      }
      if (!role) {
         return res.status(403).send({ message: `Don't have role` })
      }
      if (opts.hasRole.includes(role)) {
         return next()
      }
      return res.status(403).send({ message: `Don't have role && allowSameUser` })
   }
}
module.exports = {
   isAuthenticated,
   isAuthorized
}