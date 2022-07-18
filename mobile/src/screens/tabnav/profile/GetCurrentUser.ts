import * as SplashScreen from "expo-splash-screen";

import { setCurrentUser } from "../../../redux/profile/profilemain";
import { setUserAuthenticated } from "../../../redux/system/appstart";
import { batch } from "react-redux";

import { API, graphqlOperation, Auth } from "aws-amplify";

import GetOnboardingImageAsets from "../../masterstack/auth/GetOnboardingImageAssets";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { GetUsersQuery } from "../../../API";
import { CurrentUserType } from "../../../resources/CommonTypes";

async function GetCurrentUser({ dispatch, navigation }) {
  try {
    const userinfo = await Auth.currentUserInfo();

    if (
      userinfo === null ||
      typeof userinfo === "undefined" ||
      typeof userinfo.attributes === "undefined"
    ) {
      await SplashScreen.hideAsync();
      GetOnboardingImageAsets({ dispatch });
      navigation.navigate("OnboardingLanding");
    } else {
      const userid: string = userinfo.attributes["custom:userID"];

      const result = (await API.graphql(
        graphqlOperation(`
                query GetUser {
                    getUsers (
                        id: "${userid}"
                    ) {
                        id
                        email
                        gamertag
                        displayname
                        pfp
                        fullyauthenticated
                        firstvaultupload
                        cognitosub
                        createdAt
                        addedmecount
                        addedcount
                        storagesizeinbytes
                        emailconfirmed
                        acceptedtos
                        setpassword
                    }
                }
            `)
      )) as GraphQLResult<GetUsersQuery>;

      const user = result.data.getUsers;

      if (
        user.fullyauthenticated === false &&
        typeof navigation != "undefined"
      ) {
        if (typeof user.displayname != "string") {
          navigation.navigate("DisplayName");
        } else if (typeof user.gamertag != "string") {
          navigation.navigate("Gamertag");
        } else if (user.birthday === null) {
          navigation.navigate("Birthday");
        } else if (user.acceptedtos != true) {
          navigation.navigate("TOS");
        } else {
          console.log(
            "Uncaught Error. User not fully authenticated but all fields are complete."
          );
        }

        await SplashScreen.hideAsync();
        GetOnboardingImageAsets({ dispatch });
      } else if (typeof navigation != "undefined") {
        navigation.navigate("HomeVaultLanding");
      }

      const currentuser: CurrentUserType = {
        id: user.id,
        email: user.email,
        gamertag: user.gamertag,
        displayname: user.displayname,
        pfp: user.pfp,
        fullyauthenticated: user.fullyauthenticated,
        firstvaultupload: user.firstvaultupload,
        cognitosub: user.cognitosub,
        createdAt: user.createdAt,
        addedmecount: user.addedmecount,
        addedcount: user.addedcount,
        setpassword: user.setpassword,
        storagesizeinbytes: user.storagesizeinbytes,
      };

      batch(() => {
        dispatch(setCurrentUser(currentuser));
        dispatch(setUserAuthenticated());
      });
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

export default GetCurrentUser;
