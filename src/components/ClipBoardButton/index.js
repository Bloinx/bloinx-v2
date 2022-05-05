import React from "react";
import { Button } from "@mui/material";

const CopyToClipboardButton = () => {
  const handleClick = () => navigator.clipboard.writeText(window.location);
  return <Button onClick={handleClick}>Compartir</Button>;
};
export default CopyToClipboardButton;
