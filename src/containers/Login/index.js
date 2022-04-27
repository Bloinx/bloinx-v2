import React from "react";
import styles from "./index.module.scss";
import logo from "../../assets/bloinxLogo.png";
import { Auth, Typography, Button } from '@supabase/ui'
import supabase from '../../supabase';

function Container(props) {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  return props.children;
}

const AuthBasic = () => {
  return (                                                    
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth supabaseClient={supabase}  />
      </Container>
    </Auth.UserContextProvider>
  )
}

function Login() {
  return (
    <div className={styles.Login}>
    <div className={styles.LoginTitle}>
        <img src={logo} alt="Logo de bloinx" />
      </div>
      <div className={styles.LoginCard}>
      <AuthBasic/>
      </div>
    </div>
  );
}

export default React.memo(Login);