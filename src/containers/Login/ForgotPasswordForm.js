import React, { useContext } from "react";
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
    const [loading, setLoading] = useContext(AuthContext);
    
  

    const handleForgotPassword = async (e) => {
        setLoading(true)

        const { data, error } = await supabase.api.resetPasswordForEmail(e.target.value);
        
    };

    return (
        <>
            <Space direction={'vertical'}>
                <Space direction={'vertical'}>
                    <Input
                        label="Correo"
                        size="tiny"
                        autoComplete="email"
                        name="email"
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
                        loading={loading}
                        block
                        >
                        
                        Enviar
                        </Button>
                </Space>
            </Space>
        </>
    );
};
