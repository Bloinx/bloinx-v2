import React, { useContext,  useState } from "react";
import {
    Input,
    Button,
    Space,
    IconMail,
} from '@supabase/ui';
import { AuthContext } from "./authContext";
import supabase from "../../supabase";

export default function  ForgotPasswordForm(props) {    
    const { switchToSignin } = useContext(AuthContext);
    const [email , setEmail ] = useState('');

    const onChangeInput= (e) => {
        switch(e.target.name)
        {
            case 'email':
                setEmail(e.target.value);
             break
        }

   }
    
  

    const handleForgotPassword = async (e) => {
        const { data, error } = await supabase.auth.api.resetPasswordForEmail(e.target.value) 
        if (data) {
            console.log("enviado");
        }
        if (error) {
            console.log("error");
        }


        
    };

    return (
            <Space direction={'vertical'}>
                <Space direction={'vertical'}>
                    <Input
                        label="Correo"
                        size="tiny"
                        autoComplete="email"
                        name="email"
                        value= {email}
                        onChange={onChangeInput}
                        icon={<IconMail size={21} stroke={'#666666'} />}
                    />
                </Space>
                <Space direction={'vertical'}>
                    <Button
                        htmlType="Recuperar contraseña"
                        type="primary"
                        size="tiny"
                        style={{ "backgroundColor": "#f58f98", "width": "100%" }}
                        icon={<IconMail size={21} />}
                        onClick={handleForgotPassword}
                             block
                        >
                        Enviar
                    </Button>
                    <Button
                        htmlType="Cancelar"
                        type="primary"
                        size="tiny"
                        style={{ "backgroundColor": "#f58f98", "width": "100%" }}
                        icon={<IconMail size={21} />}
                        onClick={switchToSignin}
                        block
                    >   

                        Cancelar
                    </Button>
                    
                </Space>
            </Space>
    );
};
// import React, { useContext } from "react";
// import {
//     Input,
