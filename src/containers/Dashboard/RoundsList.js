import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import { getRoundsList } from "./utils";
import styles from "./DataList.module.scss";

function RoundsList() {
  const navigate = useNavigate();

  const [roundsList, setRoundsList] = useState([]);

  const getRounds = () => {
    getRoundsList()
      .then((data) => {
        console.log(data);
        setRoundsList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRounds();
  }, [
  ]);

  return (
    <Card variant="outlined" className={styles.DataBorder}>
      <div className={styles.DataList}>
        <div className={styles.DataListHead}>
          <div className={styles.DataListHeader}>Nombre de Ronda</div>
          <div className={styles.DataListHeader}>Próximo Pago</div>
        </div>
        {roundsList.map((round, index) => (
          <div key={index} className={styles.DataListRow}>
            <div className={styles.DataListItem}>
              {round.isAdmin && !round.isRegistered && "Nueva ronda vacia"}
              {round.isAdmin && round.isRegistered && round.positions[0]?.name}
            </div>
            <div className={styles.DataListItem}>
              {round.isAdmin && !round.isRegistered && "Personaliza"}
              {round.isAdmin && round.isRegistered && "En espera de iniciar"}
              <IconButton
                onClick={
                  !round.isRegistered
                    ? () => navigate(`/register/${round.id}`)
                    : () => navigate(`/round-detail/${round.id}`)
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

export default React.memo(RoundsList);
