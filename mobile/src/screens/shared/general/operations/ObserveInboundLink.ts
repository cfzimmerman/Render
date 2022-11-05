import * as Linking from "expo-linking";
import {
  setDelayedLinkData,
  setInitialLinkData,
} from "../../redux/general/universalpost";
import { DispatchType } from "../../redux/store";
import GetUniversalPostData from "../../screens/tabnav/homevault/GetUniversalPostData";

interface InputTypes {
  dispatch: DispatchType;
  navigation: any;
}

async function InboundPostLinkAction({
  dispatch,
  navigation,
  postID,
}: {
  dispatch: DispatchType;
  navigation: any;
  postID: string;
}) {
  try {
    GetUniversalPostData({
      dispatch,
      postID,
      navigation,
    });

    navigation.navigate("VaultPostFullView", {
      startindex: 0,
      usecase: "universal",
    });
  } catch (error) {
    console.log(error);
  }
}

// const inboundLink = null;
// "https://app.render.game/view/493e5d87-cd76-4cb2-998c-47fb2c72798a";

async function ObserveInboundLink({ dispatch, navigation }: InputTypes) {
  const DelayedLinkEventHandler = ({
    url,
    event,
  }: {
    url: string;
    event: Object;
  }) => {
    if (typeof url === "string") {
      const splitLink = url.split("/");
      if (url.includes("view")) {
        InboundPostLinkAction({
          dispatch,
          navigation,
          postID: splitLink[splitLink.length - 1],
        });
        dispatch(
          setDelayedLinkData({ postID: splitLink[splitLink.length - 1] })
        );
      }
    }
  };

  try {
    const inboundLink = await Linking.getInitialURL();

    if (typeof inboundLink === "string") {
      const splitLink = inboundLink.split(":");
      if (inboundLink.includes("view")) {
        dispatch(
          setInitialLinkData({ postID: splitLink[splitLink.length - 1] })
        );
      }
    }

    Linking.addEventListener("url", DelayedLinkEventHandler);
  } catch (error) {
    console.log(error);
  }
}

export default ObserveInboundLink;
