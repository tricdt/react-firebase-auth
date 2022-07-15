import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import firebase, { auth } from './../../firebase/config'
import './Signin.css'
import { useAuth } from '../../context/AuthContext';
function Signin() {
   const { user, createUser, signIn, signOut } = useAuth()
   const navigate = useNavigate();
   const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string()
         .required('Password is required')
         .min(6, 'Password must be at least 6 characters')
   })
   const { register, handleSubmit, watch, formState: { errors } } = useForm({
      mode: 'all',
      reValidateMode: 'onChange',
      resolver: yupResolver(validationSchema)
   });
   const watchPassword = watch("password", '');
   const [isShowPassword, setIsShowPassword] = useState(false)
   const onSubmit = async data => {
      await signIn(data.username, data.password)
      // if (role === 'manager') {
      //    navigate('/manager')
      // }
      // if (role === 'user') {
      //    navigate('/user')
      // }
   }
   const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const handleSocialLogin = (social) => {
      if (social === 'facebook') {
         auth.signInWithPopup(facebookAuthProvider)
      }
      else if (social === 'google') {
         auth.signInWithPopup(googleProvider)
      }

   }
   // const handleOnClickLogin = (e) => {
   //    e.preventDefault()
   //    const sayHello = firebase.functions().httpsCallable('sayHello');
   //    // call the function and pass data
   //    sayHello({ name: 'Shaun' }).then(result => {
   //       console.log(result.data);
   //    });
   // }
   return (
      <div className="limiter">
         <div className="container-login100" style={{
            backgroundImage: `url('images/bg-01.jpg')`
         }}>
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
               <form className="login100-form validate-form"
                  onSubmit={handleSubmit(onSubmit)}
               >
                  <span className="login100-form-title p-b-49">
                     Login
                  </span>
                  <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
                     <span className="label-input100">Username</span>
                     <input className="input100"
                        type="text"
                        {...register("username")}
                        placeholder="Type your username"
                     />
                     <span className="focus-input100" data-symbol="&#xf206;"></span>
                     <span style={{ color: "red" }}>{errors.username?.message}</span>
                  </div>
                  <div className="wrap-input100 validate-input" data-validate="Password is required">

                     <span className="label-input100">Password</span>

                     <input className="input100"
                        type={isShowPassword ? 'text' : 'password'}
                        {...register("password")}
                        placeholder="Type your password"
                     />
                     <span className="focus-input100" data-symbol="&#xf190;"></span>
                     <span className='eye'
                        onClick={() => setIsShowPassword(!isShowPassword)}
                     >
                        {!watchPassword ? '' : !isShowPassword ?
                           <i className="fas fa-eye"></i>
                           :
                           <i className="fas fa-eye-slash"></i>
                        }
                     </span>
                     <span style={{ color: "red" }}>{errors.password?.message}</span>
                  </div>

                  <div className="text-right p-t-8 p-b-31">
                     <a href="#">
                        Forgot password?
                     </a>
                  </div>

                  <div className="container-login100-form-btn">
                     <div className="wrap-login100-form-btn">
                        <div className="login100-form-bgbtn"></div>
                        <button className="login100-form-btn"
                        >
                           Login
                        </button>
                     </div>
                  </div>

                  <div className="txt1 text-center p-t-54 p-b-20">
                     <span>
                        Or Sign Up Using
                     </span>
                  </div>

                  <div className="flex-c-m">
                     <span
                        className="login100-social-item bg1"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSocialLogin('facebook')}
                     >
                        <i className="fab fa-facebook-f facebook"></i>
                     </span>

                     <span className="login100-social-item bg2"
                        style={{ cursor: 'pointer' }}
                     >
                        <i className="fab fa-twitter"></i>
                     </span>

                     <span className="login100-social-item bg3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSocialLogin('google')}
                     >
                        <i className="fab fa-google-plus-g google"></i>
                     </span>
                  </div>

                  <div className="flex-col-c p-t-55">
                     <span className="txt1 p-b-17" >
                        Don't have an account?
                     </span>

                     <a href="/register" className="txt2">
                        Sign Up
                     </a>
                  </div>
               </form>
            </div>
         </div>

      </div >
   )
}

export default Signin