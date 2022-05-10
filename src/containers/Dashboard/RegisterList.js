import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import { getRoundsPosition, getRoundsData } from "./utils";
import styles from "./DataList.module.scss";

function RegisterList() {
  const navigate = useNavigate();

  const [RegisterList, setRegisterList] = useState([]);

  const getRegister = () => {
    getRoundsPosition()
      .then((data) => {
        console.log(data);
        setRegisterList(data);
        getRoundsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRegister();
  }, []);

  return (
    <Card variant="outlined" className={styles.DataBorder}>
      <div className={styles.DataList}>
        <div className={styles.DataListHead}>
          <div className={styles.DataListHeader}>Nombre de Ronda</div>
          <div className={styles.DataListHeader}>Creada por:</div>
        </div>
        {RegisterList.map((round, index) => (
          <div key={index} className={styles.DataListRow}>
            <div className={styles.DataListItem}>
              {round.alias}

            </div>
            <div className={styles.DataListItem}>
              {round.id_round_ref}
              <IconButton
                onClick={
                  !round.isRegistered
                    ? () => navigate(`/register/${round.id_round_ref}`)
                    : () => navigate(`/round-detail/${round.id_round_ref}`)
                }
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default React.memo(RegisterList);
