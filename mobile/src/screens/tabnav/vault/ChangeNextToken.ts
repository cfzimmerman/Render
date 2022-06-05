import { setNextToken } from "../../../redux/vault/vaultpostdata";
import { ChangeNextTokenPropsType } from "./GetVaultData";

const ChangeNextToken = ({ dispatch, nextToken }: ChangeNextTokenPropsType) => {
  dispatch(setNextToken(nextToken));
};

export default ChangeNextToken;
