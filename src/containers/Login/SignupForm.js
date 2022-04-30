import React, { useContext } from "react";
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

import { AccountContext } from "./accountContext";



export function SignupForm(props)  {
    const { switchToSignin } = useContext(AccountContext);

    return (
        <>
           


                <Space size={6} direction={'vertical'}>
                    <Space size={2} direction={'horizontal'}>
                        <Input
                            label="Correo"
                            size="tiny"
                            autoComplete="email"
                            icon={<IconMail size={21} stroke={'#666666'} />}
                        />
                        <Input
                            label="alias"
                            size="tiny"
                            icon={<IconUser size={21} stroke={'#666666'} />}

                        />
                    </Space>
                    <Space size={2} direction={'horizontal'}>
                        <Input
                            label="Contraseña"
                            size="tiny"
                            type="password"
                            autoComplete="current-password"
                            icon={<IconKey size={21} stroke={'#666666'} />}
                        />
                        <Input
                            label="Repetir Contraseña"
                            size="tiny"
                            type="password"
                            autoComplete="current-password"
                            icon={<IconKey size={21} stroke={'#666666'} />}
                        />

                    </Space>
                    <Space size={2} direction={'horizontal'}>
                        <Input
                            label="firstname"
                            size="tiny"
                            icon={<IconArchive size={21} stroke={'#666666'} />}
                        />
                        <Input
                            label="lastname"
                            size="tiny"
                            icon={<IconArchive size={21} stroke={'#666666'} />}
                        />
                    </Space>
                    <Space size={2} direction={'horizontal'}>
                        <Input
                            label="phone"
                            size="tiny"
                            icon={<IconPhone size={21} stroke={'#666666'} />}
                        />
                        <Select label="Genero" icon={<IconUser />}>
                            <Select.Option>Masculino</Select.Option>
                            <Select.Option>Femenino</Select.Option>
                        </Select>
                    </Space>    
                        <Space size={1} direction={'vertical'}>
                            <Button
                                htmlType="Button"
                                type="primary"
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
