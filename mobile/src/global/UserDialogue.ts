/* ERROR CODES

1: ONBOARDINGLANDING.JS - Auth.signUp() failed
2: ONBOARDINGLANDING.JS - Add user to DataStore failed
3: ONBOARDINGLANDING.JS - Auth.resendSignUp() on Onboarding failed
4: SIGNUPCODE.JS - Auth.confirmSignUp() failed
5: SIGNUPCODE.JS - Auth.signIn() failed
11: SIGNUPCODE.JS - Auth.resendSignUp() failed
6: LOGINCODE.JS - Auth.signIn() failed
7: DISPLAYNAME.JS - Add DisplayName to DataStore failed
8: GAMERTAG.JS  - Add Gamertag to DataStore failed
9: BIRTHDAY.JS - Add Birthday to DataStore failed
10: TOS.JS - Add (acceptedtos = true) to DataStore failed
11: ForgotPassword.TSX - Auth.forgotPassword(username) failed - username is the user's email
12: ForgotPassword.TSX - Auth.forgotPasswordSubmit(username, code, new_password) failed OR API.graphql(graphqlOperation(updateUsers, { input: { id, setpassword: true } })) failed
13: GameCoverTile.TSX - Add game id to post failed either in a GraphQL operation or a Redux update
*/

// Add Sign up welcome!
// Add Login welcome back

/* SYSTEMMESSAGE USAGE

RESENDCODESUCCESS = [
    SignupCode.js,
    LoginCode.js,
]
INCORRECTCODE = [
    SignupCode.js,
    LoginCode.js,
]
IMPROPERNAMEFORMAT = [
    DisplayName.js,
    Gamertag.js,
]
NAMEALREADYTAKEN = [
    Gamertag.js,
]
USERTOOYOUNG = [
    Birthday.js,
]

*/

export interface UserDialogueType {
  header: string;
  title: string;
  description: string;
}

const UserDialogue = (prop?: string) => {
  const UserDialogue = {
    errormessage: {
      systemerror: {
        header: "🥲",
        title: "*muffled screeches",
        description: `Error #${prop} has occurred. Call in backup:`,
      },
    },
    systemmessage: {
      resendcodesuccess: {
        header: "💌",
        title: "New code sent",
        description: "Your old code has been… vaporized.",
      },
      incorrectcode: {
        header: "👓",
        title: "Incorrect code",
        description: "Learn to read and try again.",
      },
      impropernameformat: {
        header: "✋",
        title: "n o",
        description: "Name must be 2 to 20 characters.",
      },
      namealreadytaken: {
        header: "🧊",
        title: "That name = taken",
        description: "Pick something cooler.",
      },
      usertooyoung: {
        header: "👶",
        title: "Sorry kiddo",
        description: "Must be 13+ to use Render.",
      },
      postsuccess: {
        header: "🦈",
        title: "Posted!",
        description: "Rando shark approves.",
      },
      searchconstruction: {
        header: "🚧 👷‍♂️ 🚧",
        title: "Under construction",
        description: "Game tagging and search coming soon.",
      },
      shareconstruction: {
        header: "🏗 👷‍♀️ 🏗",
        title: "Construction zone",
        description: "Profile link-share coming soon.",
      },
      webuploadconstruction: {
        header: "🧰 👷‍♂️ 🦺",
        title: "Working on it",
        description: "Web upload coming soon.",
      },
      failedthumbnail: {
        header: "Upload failed",
        title: "Unable to read file",
        description:
          "Please ensure your screen capture software is fully up to date.",
      },
      forgotpasswordsent: {
        header: "📨",
        title: "Code sent",
        description: "This tape will self destruct in 5 seconds.",
      },
      newpasswordsaved: {
        header: "🪩",
        title: "New password saved",
        description: "What can't you do!",
      },
      incorrectpasswordcode: {
        header: "🤨",
        title: "Incorrect code",
        description: "Please request a new code and try again.",
      },
      postNotFound: {
        header: "🥺",
        title: "Post not found",
        description: "Its owner sent it to a farm upstate.",
      },
      noGameTagged: {
        header: "🏷",
        title: "No game tag",
        description: "Tbh it's probably Minecraft.",
      },
      copiedPostLink: {
        header: "🖨",
        title: "Copied link",
        description: "Go forth! Don't leave it waiting.",
      },
    },
  };

  return UserDialogue;
};

export default UserDialogue;
