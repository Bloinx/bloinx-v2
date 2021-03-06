import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import { getRoundsPosition, getRoundsData } from "./utils";
import styles from "./DataList.module.scss";

function WalletList() {
  const navigate = useNavigate();

  const [WalletList, setWalletList] = useState([]);

  const getWallet = () => {
    getRoundsPosition()
      .then((data) => {
        console.log(data);
        setWalletList(data);
        getRoundsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <Card variant="outlined" className={styles.DataBorder}>
      <div className={styles.DataList}>
        <div className={styles.DataListHead}>
          <div className={styles.DataListHeader}>Moneda digital</div>
          <div className={styles.DataListHeader}>Balance</div>
        </div>
        {WalletList.map((round, index) => (
          <div key={index} className={styles.DataListRow}>
            <div className={styles.DataListItem}>
              {round.id_round_ref}
            </div>
            <div className={styles.DataListItem}>
              {round.id}
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

export default React.memo(WalletList);
