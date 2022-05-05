import React, { useState } from "react";
//import Form from "./Form";
import styles from "./index.module.scss";
import logo from "../../assets/bloinxLogo.png";
import  LoginForm from "./LoginForm";
import  SignupForm from "./SignupForm";  
import  ForgotPasswordForm from "./ForgotPasswordForm";
import { AuthContext } from "./authContext";

        
const Login =(props) => { 
  const [active,setActive ]= useState("signin");


        const switchToSignin = () => {
            setActive("signin");
        };
        const switchToSignup = () => {
            console.log(active);
            setActive("signup");
        };
        
        const switchToForgotPassword = () => {
            setActive("forgotPassword");
        };

        const contextValue = { switchToSignup, switchToSignin, switchToForgotPassword };


  return (
    <div className={styles.Login}>
      <div className={styles.Login_Card}>
        <div className={styles.Login_Card_Content}>
          <div className={styles.Login_Card_Content_Header}>
            <img src={logo} alt="logo" className={styles.Login_Icon} />
            <span className={styles.Login_Title}>Iniciar sesión</span>
          </div>
          <div className={styles.Login_Card_Content_Form}>
          <AuthContext.Provider value={ contextValue }>
            {active === "signin" && <LoginForm  />}
            {active === "signup" && <SignupForm  />}
            {active === "forgotPassword" && <ForgotPasswordForm  />}
          </AuthContext.Provider>

          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Login); 