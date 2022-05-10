import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import { getRoundsPosition, getRoundsData } from "./utils";
import styles from "./DataList.module.scss";
import supabase from "../../supabase";

function RoundsList() {
  const navigate = useNavigate();

  const [roundsList, setRoundsList] = useState([]);

  const getRounds = async() => {
 
    const datapos = await getRoundsPosition();
   //const data = await getRoundsData(datapos);
    setRoundsList(datapos)
    console.log(roundsList)
    // setRoundsList(data);
  };

  useEffect(() => {
    getRounds();
  }, []);

  const isAdminRound = () => {
    // const user = supabase.auth.user();
    // if(user.id == getCreateByUser()){

    // }
    return true
  }

  const getCreateByUser = async () =>{
    const data = await getRoundsData(roundsList);
  }

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
              {round.alias}
              {/* {round.isAdmin && !round.isRegistered && "Nueva ronda vacia"}
              {round.isAdmin && round.isRegistered && round.id_round_ref} */}
            </div>
            <div className={styles.DataListItem}>
              {'Next Payment:'}
              <IconButton
                onClick={
                  isAdminRound()
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

export default React.memo(RoundsList);
