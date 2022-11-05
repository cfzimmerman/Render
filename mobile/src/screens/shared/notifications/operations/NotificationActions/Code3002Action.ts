import { clearUniversalPostData } from "../../../../../redux/shared/universalpost";
import { DispatchType } from "../../../../../redux";
import GetUniversalPostData from "../../../linking/operations/GetUniversalPostData";

interface Code3002ActionPropsType {
  dispatch: DispatchType;
  navigation: any;
  postID: string;
}

async function Code3002Action({
  dispatch,
  navigation,
  postID,
}: Code3002ActionPropsType) {
  dispatch(clearUniversalPostData());

  GetUniversalPostData({
    dispatch,
    postID,
    navigation,
  });

  navigation.navigate("VaultPostFullView", {
    startindex: 0,
    usecase: "universal",
  });
}

export default Code3002Action;
