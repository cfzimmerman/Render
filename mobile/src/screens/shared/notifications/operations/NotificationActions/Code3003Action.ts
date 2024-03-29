import { clearUniversalPostData } from "../../../../../redux/shared/universalpost";
import { DispatchType } from "../../../../../redux";
import GetUniversalPostData from "../../../linking/operations/GetUniversalPostData";

interface Code3003ActionPropsType {
  dispatch: DispatchType;
  postID: string;
  navigation: any;
}

async function Code3003Action({
  dispatch,
  postID,
  navigation,
}: Code3003ActionPropsType) {
  dispatch(clearUniversalPostData());

  GetUniversalPostData({ dispatch, postID, navigation });

  navigation.navigate("VaultPostFullView", {
    startindex: 0,
    usecase: "universal",
  });
}

export default Code3003Action;
