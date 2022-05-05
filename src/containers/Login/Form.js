    /* eslint-disable react/prop-types */
       /* eslint-disable no-unused-vars */
    import React, { useState } from "react";
    import  LoginForm from "./LoginForm";
    import  SignupForm from "./SignupForm";  
    import  ForgotPasswordForm from "./ForgotPasswordForm";
    import { AuthContext } from "./authContext";


    export default function Form(props) {
        
        const {active, setActive} = useState("signin");


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
                    <AuthContext.Provider value={ contextValue }>
                    <LoginForm  />
                    {active === "signin" && <LoginForm  />}          
                    {active === "signup" && <SignupForm  />} 
                    {active === "forgotPassword" && <ForgotPasswordForm  />}
                
                </AuthContext.Provider>
            
        );
    };
