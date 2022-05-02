import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import { getRoundsPosition, getRoundsData } from "./utils";
import styles from "./DataList.module.scss";

function RoundsList() {
  const navigate = useNavigate();

  const [roundsList, setRoundsList] = useState([]);

  const getRounds = async() => {
    debugger;
    const datapos = await getRoundsPosition();
    const data = await getRoundsData(datapos);
    roundsList.push(data[0])
    console.log(roundsList)
    // setRoundsList(data);

    // console.log('data', roundsList)
      // .then((data) => {
      //   console.log(data);

      //   getRoundsData(data).then((res)=>{

      //     setRoundsList(res);
          
      //   });
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  };

  useEffect(() => {
    getRounds();
  }, []);

  return (
    <Card variant="outlined" className={styles.DataBorder}>
      <div className={styles.DataList}>
        <div className={styles.DataListHead}>
          <div className={styles.DataListHeader}>Nombre de Ronda</div>
          <div className={styles.DataListHeader}>Próximo Pago</div>
        </div>
        {roundsList?.map((round, index) => (
            <div key={index} className={styles.DataListRow}>
            <div className={styles.DataListItem}>
              {round.id_round_ref}
              {/* {round.isAdmin && !round.isRegistered && "Nueva ronda vacia"}
              {round.isAdmin && round.isRegistered && round.id_round_ref} */}
            </div>
            <div className={styles.DataListItem}>
              {'ghoasdlkasd'}
              {/* {round.isAdmin && !round.isRegistered && "Personaliza"}
              {round.isAdmin && round.isRegistered && "En espera de iniciar"} */}
              <IconButton
                onClick={
                  round
                    ? () => navigate(`/register/${round.id_round}`)
                    : () => navigate(`/round-detail/${round.id_round}`)
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
