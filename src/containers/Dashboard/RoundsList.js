import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import { getRoundsPosition } from "./utils";
import styles from "./DataList.module.scss";
import supabase from "../../supabase";
import config from "../../config.sg.web3";


function RoundsList() {
  const navigate = useNavigate();

  const [roundsList, setRoundsList] = useState([]);
  const [roundsListData, setRoundsListData] = useState([]);
  const [nextPaymentDate, setNextPaymentDate] = useState([]);

  const getRounds = async() => {
    const datapos = await getRoundsPosition();
    setRoundsList(datapos)
    // getDataContract(datapos);
    getRoundsData(datapos);
  };

  const getDataContract = (datapos) => {
    getRoundsData(datapos);
    //setRoundsListData(roundsData);
  };


  useEffect(() => {
    getRounds();
  }, []);


  const isAdminRound = (roundsListDataProp) => {
   // console.log(roundsListDataProp);
    // const user = supabase.auth.user();
    // if(user.id == getCreateByUser()){

    // }
    return true
  }

  const getRoundsData =  (dataRoundPosition) => {

    dataRoundPosition.forEach( (positionRound, index) => {
        getAll(positionRound).then((res)=>{
          getNextPayment(dataRoundPosition[index], res)
          setRoundsListData((oldArray) => [...oldArray, res]);
        });

    });
  };


  const getAll = async (positionRound) =>{
    const { data } = await supabase
    .from("Rounds")
    .select()
    .eq("id_round_ref", positionRound.id_round_ref);

  return  data[0]
  }

  const addSeconds = (numOfSeconds, date = new Date()) => {
    date.setSeconds(date.getSeconds() + numOfSeconds);
  
    return date;
  }

  const getNextPayment = async (userPositionRound, roundsData) => {
  
    const { methods } = config(roundsData.contract);
   // console.log(methods);
    const res = await methods.payTime().call();
    const date = new Date(roundsData.created_at);
    const realPayTime = parseInt(res);
    const realPosition = parseInt(userPositionRound.position);
    const realTime = realPayTime*realPosition;
    const nextPayment = addSeconds(realTime, date);
    let day = nextPayment.getDate()
    let month = nextPayment.getMonth() + 1
    let year = nextPayment.getFullYear()

    if(month < 10){
      setNextPaymentDate((oldArray) => [...oldArray, `${day}-0${month}-${year}`]);
    }else{
      setNextPaymentDate((oldArray) => [...oldArray, `${day}-${month}-${year}`]);
    }
  
  return roundsData;
  
  };

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
            </div>
            <div className={styles.DataListItem}>
              {nextPaymentDate[index]?.toString()}
              <IconButton
                onClick={
                  isAdminRound(roundsListData[index]?.created_by_user)
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
