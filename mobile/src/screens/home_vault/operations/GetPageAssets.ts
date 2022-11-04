import { Storage } from "aws-amplify";
import { setPageAssets } from "../../../redux/shared/appstart";

export interface PageAssetsType {
  whitesquarelogo: Object;
}

async function GetPageAssets({ dispatch }) {
  const whitesquarelogo = await Storage.get(
    "CompanyStock/whitesquarelogo.png",
    { expires: 86400 }
  );

  const pageassets: PageAssetsType = {
    whitesquarelogo,
  };

  dispatch(setPageAssets(pageassets));
}

export default GetPageAssets;
