import React, { useState } from "react";
//import Form from "./Form";

import logo from "../../assets/bloinxLogo.png";
import  LoginForm from "./LoginForm";
import  SignupForm from "./SignupForm";  
import  ForgotPasswordForm from "./ForgotPasswordForm";
import { AuthContext } from "./authContext";
import styles from "./index.module.scss";
import { MpSharp } from "@mui/icons-material";
import {
  Alert
} from '@supabase/ui';
        
function Login(props){ 
  const [active,setActive ]= useState("signin");
  const [msg, setMsg] = useState('');

        const switchToSignin = () => {
            setActive("signin");
        };
        const switchToSignup = () => {
            setActive("signup");
        };
        const switchToForgotPassword = () => {
            setActive("forgotPassword");
        };

       const setMessage=(message, msgType ) =>{
       let messageFormatted = '';

       switch(msgType)
       {
            case 1:
                messageFormatted= '<Alert title="Hecho" withIcon> '+ message +'</Alert>' ;
                break;

            case 2:
                messageFormatted= '<Alert title="Error" variant="danger"> '+ message +'</Alert>' ;
                break;
            default:
                    messageFormatted='';



       }

        setMsg(messageFormatted)
       };
        const contextValue = { switchToSignup, switchToSignin, switchToForgotPassword , setMessage};



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
           { msg.lengt>0 &&  <Alert title="Hecho" withIcon> '+ message +'</Alert>}
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