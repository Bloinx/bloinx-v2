import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import PageHeader from "../../components/PageHeader";
import TextField from "../../components/TextField";
import Select from "../../components/Select";
import InputParticipantSelect from "../../components/InputParticipantSelect/InputParticipantSelect";

import { validations } from "./validations";
import { getRegisterDetail } from "./utils";
import {
  Box,
  Chip,
  Grid,
  Icon,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowBackIosOutlined,
  ContentCopy,
  ContentPaste,
  Facebook,
  Telegram,
  WhatsApp,
} from "@mui/icons-material";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";

function Invite({ setDataForm }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [mailList, setMailList] = useState([]);

  console.log(email);
  console.log(mailList);
  /*   const handleSendEmails = () => {
    APISetSaveInvitations(mailList, roundId)
      .then((status) => {
        console.log(status);
        Modal.success({
          title: "Invitaciones enviadas correctamente",
          content: "Por favor verifica.",
        });
        history.push(`/round-details?roundId=${roundId}`);
      })
      .catch((err) => {
        console.log(err);
        Modal.error({
          title: "Error al enviar las invitaciones",
          content: "Por favor verifica.",
        });
      });
  }; */
  const handleDelete = (mailList) => () => {
    setMailList((email) => email.filter((email) => email.key !== mailList.key));
  };

  const handleClick = (e) => {
    setMailList([...mailList, { email }]);
  };
  /*   const { data, error } = await supabase
  .from('Rounds')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ]) */

  return (
    <Box>
      <PageHeader title={t("createRound.titleConfirm")} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2b2d33",
          padding: "10px 20px",
          boxSizing: "border-box",
          borderRadius: "5px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <Typography>Liga de la ronda</Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography>Numero de ronda</Typography>
          <ContentCopy />
        </Box>
        <Typography>Comparte por las redes sociales</Typography>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Facebook />
          <Telegram />
          <WhatsApp />
        </Box>
        <Typography>Agrega los correos de los participantes</Typography>
        <TextField
          label={"Ingresa el correo de tus amigos"}
          placeHolder={"Correo"}
          variant="outlined"
          sx={{ backgroundColor: "gray" }}
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <Button
          onClick={(e) => {
            handleClick();
          }}
        >
          Agregar Email
        </Button>
        {mailList.map((data) => {
          return (
            <Stack spacing={3}>
              <Chip
                sx={{ color: "white" }}
                variant="outlined"
                label={data.email}
                onDelete={handleDelete}
              ></Chip>
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
}

export default React.memo(Invite);
