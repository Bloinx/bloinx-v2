import React, { useContext, useState } from "react";
import {
    Input,
    Button,
    Space,
    IconMail,
} from '@supabase/ui';
import { AccountContext } from "./accountContext";
import supabase from "../../supabase";

export function ForgotPasswordForm(props) {
    const { switchToSignin } = useContext(AccountContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')

   const onChange = (e) => {

        setEmail(e.target.value) ;
    }

    const handleForgotPassword = async () => {
        setLoading(true)
        
        const { data, error } = await supabase.api.resetPasswordForEmail(email);
        if (error) {
            setError(error.message)
        }
        setLoading(false);
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
                        onChange={onChange}
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
                        onClick={handleForgotPassword}
                        block
                        >
                        
                        Enviar
                        </Button>
                </Space>
            </Space>
        </>
    );
};

