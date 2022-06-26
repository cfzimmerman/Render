import { batch } from "react-redux";
import { Auth } from "aws-amplify";
import * as Updates from "expo-updates";
import LSClearStorage from "./LSClearStorage";
import GetCurrentUser from "./GetCurrentUser";
// import { Restart } from 'fiction-expo-restart';

/*
// Explore
import { clearExplore } from "../../../redux/explore/exploremain";
import { clearOtherUserProfile } from "../../../redux/explore/otheruserprofile";

// General
import { clearPageOptions } from "../../../redux/general/pageoptions";

// Home
import { clearHome } from "../../../redux/home/homemain";

// Plus
import { clearPlus } from "../../../redux/plus/plusmain";

// Profile
import { clearProfile } from "../../../redux/profile/profilemain";
import { clearRelationships } from "../../../redux/profile/relationships";
import { clearUserExtras } from "../../../redux/profile/userextras";

// System
import { clearAppStart } from "../../../redux/system/appstart";
import { clearErrorMessage } from "../../../redux/system/errormessage";
import { clearLoadProgressMessage } from "../../../redux/system/loadprogressmessage";
import { clearSystemMessage } from "../../../redux/system/systemmessage";
import { clearOnboarding } from "../../../redux/system/onboarding";

// Vault
import { clearVaultPostData } from "../../../redux/vault/vaultpostdata";

*/

async function LogOut({ dispatch, navigation }) {
  LSClearStorage({ dispatch });

  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
    return;
  }

  try {
    await Updates.reloadAsync();
  } catch (error) {
    console.log("Error");
  }

  /*
    batch(() => {
        dispatch(clearExplore())
        dispatch(clearOtherUserProfile())
        dispatch(clearPageOptions())
        dispatch(clearHome())
        dispatch(clearPlus())
        dispatch(clearProfile())
        dispatch(clearRelationships())
        dispatch(clearUserExtras())
        dispatch(clearAppStart())
        dispatch(clearErrorMessage())
        dispatch(clearLoadProgressMessage())
        dispatch(clearSystemMessage())
        dispatch(clearOnboarding())
        dispatch(clearVaultPostData())
    })

    // navigation.navigate('Home', { screen: 'HomeLanding' })
    navigation.navigate('OnboardingLanding')

    // GetCurrentUser({ dispatch })

    */
  // Restart();
}

export default LogOut;
