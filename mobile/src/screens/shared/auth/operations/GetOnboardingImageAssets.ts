import { Storage } from "aws-amplify";
import { setOnboardingImages } from "../../../../redux/shared/onboarding";

async function GetOnboardingImageAsets({ dispatch }) {
  const assetNames = {
    squarelogo: "CompanyStock/whitesquarelogo.png",
    onboardinglanding: "CompanyStock/onboardingvalheim.png",
    signup: "CompanyStock/onboardingcherrytree.png",
    displayname: "CompanyStock/onboardingrdr2.png",
    gamertag: "CompanyStock/onboardingforza.png",
    birthday: "CompanyStock/onboardingmcbirch.png",
    tos: "CompanyStock/onboardingmcwaterfall.png",
  };

  const [
    squareLogoURL,
    onboardingLandingURL,
    signUpURL,
    displayNameURL,
    gamertagURL,
    birthdayURL,
    tosURL,
  ] = await Promise.all([
    Storage.get(assetNames.squarelogo, { expires: 86400 }),
    Storage.get(assetNames.onboardinglanding, { expires: 86400 }),
    Storage.get(assetNames.signup, { expires: 86400 }),
    Storage.get(assetNames.displayname, { expires: 86400 }),
    Storage.get(assetNames.gamertag, { expires: 86400 }),
    Storage.get(assetNames.birthday, { expires: 86400 }),
    Storage.get(assetNames.tos, { expires: 86400 }),
  ]);

  const assetObject = {
    squarelogo: squareLogoURL,
    onboardinglanding: onboardingLandingURL,
    signup: signUpURL,
    displayname: displayNameURL,
    gamertag: gamertagURL,
    birthday: birthdayURL,
    tos: tosURL,
  };

  dispatch(setOnboardingImages(assetObject));
}

export default GetOnboardingImageAsets;
