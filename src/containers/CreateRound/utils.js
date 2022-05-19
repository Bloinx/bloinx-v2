import supabase from "../../supabase";
import config, {
  MAIN_FACTORY_ALFAJORES,
  MAIN_FACTORY_CELO_MAINNET,
} from "../../config.main.web3";

const setCreateRound = async ({
  warranty,
  saving,
  groupSize,
  payTime,
  isPublic,
  walletAddress,
}) =>
  new Promise((resolve, reject) => {
    const m = config().contract;

    m.methods
      .createRound(
        warranty,
        saving,
        groupSize,
        payTime,
        MAIN_FACTORY_CELO_MAINNET
      )
      .send({
        from: walletAddress,
        to: MAIN_FACTORY_ALFAJORES,
      })
      .once("receipt", async (receipt) => {
        const contract =
          receipt?.events?.RoundCreated?.returnValues?.childRound;
        const admin = receipt.from;
        const folio = receipt.transactionHash;

        const session = supabase.auth.session();
        const { data, error } = await supabase.from("rounds").insert([
          {
            createByUser: session.user.id,
            createByWallet: admin,
            contract,
            folio,
            isPublic,
            createTime: new Date().getTime(),
          },
        ]);

        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      })
      .on("error", async (error) => {
        reject(error);
      });
  });

export default setCreateRound;
