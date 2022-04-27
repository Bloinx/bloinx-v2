import supabase from "../../supabase";
import config from "../../config.sg.web3";

import getAdmin from "../../utils/getAdmin";
import getAddressOrderList from "../../utils/getAddressOrderList";

export const getRoundsList = async () => {
  const user = supabase.auth.user();
  //user.id
  const { data, error } = await supabase
    .from("Rounds")
    // .select("*, positions(name, registrationDate)")
    .select()
    .eq("create_by_user", 'FIaC1UftjpRNZsGoNj3qcEEscSx2')
   // .order("created_at", { ascending: true });

  console.log({ data, error });
//contrato con ronda: 0x92f7AC475276Cc12546F54Cb9687B9714ca32e2d
  return new Promise((resolve, reject) => {
    let dataProcessed = [];
    let count = data.length - 1;

    if (error) {
      reject(error);
    }

    data.forEach(async (round) => {
      const { methods } = config(round.contract);

      const admin = await getAdmin(methods);
      const orderList = await getAddressOrderList(methods);

      const isAdmin = admin === localStorage.getItem("currentWallet");
      const isRegistered = !!orderList.find(
        ({ address }) =>
          address.toLowerCase() ===
          localStorage.getItem("currentWallet")
          // localStorage.getItem("currentWallet").toLowerCase()
      );

      dataProcessed = [...dataProcessed, { ...round, isRegistered, isAdmin }];

      if (count === 0) {
        resolve(dataProcessed);
      } else {
        count = count - 1;
      }
    });
  });
};
