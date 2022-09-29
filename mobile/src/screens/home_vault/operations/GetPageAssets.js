import { Storage } from "aws-amplify";
import { setPageAssets } from "../../../redux/shared/appstart";

async function GetPageAssets({ dispatch }) {
  const whitesquarelogo = await Storage.get(
    "CompanyStock/whitesquarelogo.png",
    { expires: 86400 }
  );

  const pageassets = {
    whitesquarelogo,
  };

  dispatch(setPageAssets(pageassets));
}

export default GetPageAssets;
