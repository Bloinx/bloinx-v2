import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Input,
    Button,
    Space,
    IconKey,
    IconMail,
    IconUser,
    IconLock,
    IconArchive,
    Select,
    IconPhone
} from '@supabase/ui';
import supabase from "../../supabase";

import { AuthContext } from "./authContext";
import { data } from "browserslist";



export default function SignupForm() {
    const { switchToSignin } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstname, setNombre] = useState('');
    const [lastname, setApellido] = useState('');
    const [alias, setAlias] = useState('');
    const [gender, setGender] = useState('');

    const navigate = useNavigate();
    const OnChangeInput = (e) => {
        switch (e.target.name) {
            case "alias":
                setAlias(e.target.value)
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "password2":
                setPassword2(e.target.value);
                break;
            case "firstname":
                setNombre(e.target.value);
                break;
            case "lastname":
                setApellido(e.target.value);
                break;
            case "gender":
                setGender(e.target.value);

               break; 
            default:
                break;
        }
    }
    const handleSignup = async () => {
        try {
            const { user, error } = await supabase.auth.signUp(
                {
                    "email": email,
                    "password": password
                },
                {
                    data:{
                        "firstname": firstname,
                        "lastname": lastname,
                        "alias": alias,
                        "gender":gender
    
                    }
                }
                    
            )

            if (user) {
                console.log("Usuario creado con exito ");
                navigate("/register");
                //go to dashboard
            }
            if (error) {
                
                //setErrorData({ status: true, data: error.message });\
                console.log("");
            }
        }
        catch (error) {
            console.error(error.message);

    };
}



    return (
        <>



            <Space size={6} direction={'vertical'}>
                <Space size={2} direction={'horizontal'}>
                    <Input
                        label="Correo"
                        size="tiny"
                        name="email"
                        value={email}
                        autoComplete="email"
                        onChange={OnChangeInput}
                        icon={<IconMail size={21} stroke={'#666666'} />}
                    />
                    <Input
                        label="Alias"
                        size="tiny"
                        name="alias"
                        value={alias}
                        autoComplete="alias"
                        onChange={OnChangeInput}
                        icon={<IconUser size={21} stroke={'#666666'} />}

                    />
                </Space>
                <Space size={2} direction={'horizontal'}>
                    <Input
                        label="Contraseña"
                        size="tiny"
                        name="password"
                        value={password}
                        type="password"
                        onChange={OnChangeInput}
                        autoComplete="current-password"
                        icon={<IconKey size={21} stroke={'#666666'} />}
                    />
                    <Input
                        label="Repetir Contraseña"
                        size="tiny"
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={OnChangeInput}
                        autoComplete="current-password"
                        icon={<IconKey size={21} stroke={'#666666'} />}
                    />

                </Space>
                <Space size={2} direction={'horizontal'}>
                    <Input
                        label="Nombre"
                        name="firstname"
                        value={firstname}
                        size="tiny"
                        onChange={OnChangeInput}
                        icon={<IconArchive size={21} stroke={'#666666'} />}
                    />
                    <Input
                        label="Apellido"
                        size="tiny"
                        name="lastname"
                        value={lastname}
                        onChange={OnChangeInput}
                        icon={<IconArchive size={21} stroke={'#666666'} />}
                    />
                </Space>
                <Space size={2} direction={'horizontal'}>
                    <Input
                        label="Name"
                        layout="vertical"
                        placeholder="Type text here ..."
                        step="12"
                        type="date"
                    />
                    <Select label="Genero"
                        name="gender"
                        value={gender}
                        icon={<IconUser />}>
                        <Select.Option>Masculino</Select.Option>
                        <Select.Option>Femenino</Select.Option>
                        <Select.Option>Prefiero no especficar

                        </Select.Option>
                    </Select>
                </Space>
                <Space size={1} direction={'vertical'}>
                    <Button
                        htmlType="Button"
                        type="primary"
                        onClick={handleSignup}
                        style={{ "backgroundColor": "#f58f98", width: "100%" }} q
                        icon={<IconLock size={21} />}
                    >
                        Registrar
                    </Button>
                </Space>
                <Space size={1} direction={'vertical'}>
                    <Button
                        htmlType="Button"
                        type="link"
                        size="tiny"
                        onClick={switchToSignin}
                        style={{ "color": "#f58f98" }}
                    >
                        ¿Ya tienes una cuenta?
                    </Button>

                </Space>
            </Space>
        </>
    );
};


