import supabase from "../../supabase";
import config from "../../config.sg.web3";

import getAdmin from "../../utils/getAdmin";
import getAddressOrderList from "../../utils/getAddressOrderList";
import { data } from "browserslist";

export const getRoundsPosition = async () => {
  const ac = new AbortController()

  const user = supabase.auth.user();
  //user.id
  const { data, error } = await supabase
    .from("position_by_round")
    // .select("*, positions(name, registrationDate)")
    .select()
    .eq("uid", "FIaC1UftjpRNZsGoNj3qcEEscSx2")

  // .order("created_at", { ascending: true });

  //console.log({ data, error });

  return data

  // return new Promise((resolve, reject) => {


  //   if (data != []) {
  //     resolve(data);
  //   }else{
  //     if(error){
  //       reject(error)
  //     }
  //   }

    // data.forEach(async (round) => {
    //   const { methods } = config(round.contract);

    //   const admin = await getAdmin(methods);
    //   const orderList = await getAddressOrderList(methods);

    //   const isAdmin = admin === localStorage.getItem("currentWallet");
    //   const isRegistered = !!orderList.find(
    //     ({ address }) =>
    //       address.toLowerCase() ===
    //       localStorage.getItem("currentWallet")
    //       // localStorage.getItem("currentWallet").toLowerCase()
    //   );

    //   dataProcessed = [...dataProcessed, { ...round, isRegistered, isAdmin }];

    //   if (count === 0) {
    //     resolve(dataProcessed);
    //   } else {
    //     count = count - 1;
    //   }
    // });
  //});
};


// export const getRoundsData =  (dataRoundPosition) => {

//   let allData = [];
//   let err;
//   dataRoundPosition.forEach( (positionRound) => {
//       getAll(positionRound).then((res)=>{
//         console.log(res.contract);
//         getNextPayment(dataRoundPosition, res)
//         allData.push(res);
        
//       });

//   });

//   return allData;
// };

export const getRoundsData =  (dataRoundPosition) => {

  dataRoundPosition.forEach( (positionRound) => {
      getAll(positionRound).then((res)=>{
       // getNextPayment(dataRoundPosition, res)
        return res;
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

