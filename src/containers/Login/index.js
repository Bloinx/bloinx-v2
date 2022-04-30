import React from "react";
import {Form} from "./Form";
import styles from "./index.module.scss";
import logo from "../../assets/bloinxLogo.png";

const Login =( {props} ) => { 
  return (
    <div className={styles.Login}>
      <div className={styles.Login_Card}>
        <div className={styles.Login_Card_Content}>
          <div className={styles.Login_Card_Content_Header}>
            <img src={logo} alt="logo" className={styles.Login_Icon} />
            <span className={styles.Login_Title}>Iniciar sesión</span>
          </div>
          <div className={styles.Login_Card_Content_Form}>
          <Form/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Login); 