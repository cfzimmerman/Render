import { deactivateMultiSelect } from "../../../../redux/homevault/homevaultmain";
import { setErrormessageActive } from "../../../../redux/system/errormessage";
import {
  setLoadProgressActive,
  setLoadProgressInactive,
  setPercentComplete,
} from "../../../../redux/system/loadprogressmessage";
import { UserDialogue } from "../../../../resources/project";
import HomeVaultFullRefresh from "../HomeVaultFullRefresh";
import CreatePostGameRelationship from "./CreatePostGameRelationship";
import { GameCoverTileInput } from "./GameCoverTile";
import ModifyPostGame from "./ModifyPostGame";
import RemovePostGameRelationship from "./RemovePostGameRelationship";

async function CoverTileAction({
  item,
  searchMode,
  dispatch,
  navigation,
  selectedPosts,
  currentUserID,
  vaultPostData,
  vaultFeedData,
  currentUserCognitoSub,
  syncPreference,
  localLibrary,
  deleteTag,
}: GameCoverTileInput) {
  try {
    if (selectedPosts.length === 1 && item != null) {
      if (deleteTag === false) {
        await CreatePostGameRelationship({
          gameID: item.id,
          postID: selectedPosts[0],
          userID: currentUserID,
          dispatch,
          searchMode,
          selectedPostsIndex: 0,
        });
      } else if (deleteTag === true) {
        await RemovePostGameRelationship({
          postID: selectedPosts[0],
          currentUserID,
          dispatch,
        });
      }
      ModifyPostGame({
        item,
        vaultPostData,
        vaultFeedData,
        dispatch,
        postID: selectedPosts[0],
      });
      // Update front end data
      navigation.navigate("HomeVault");
    } else if (selectedPosts.length > 1 && item != null) {
      dispatch(
        setLoadProgressActive({
          title: deleteTag === true ? "Deleting tags" : "Adding tags",
          description: ``,
        })
      );
      dispatch(setPercentComplete(`0 / ${selectedPosts.length}`));

      for await (const [index, postID] of selectedPosts.entries()) {
        if (deleteTag === false) {
          const result = await CreatePostGameRelationship({
            gameID: item.id,
            postID,
            searchMode,
            dispatch,
            userID: currentUserID,
            selectedPostsIndex: index,
          });
        } else if (deleteTag === true) {
          // Ik this if-elif stuff in Typescript looks weird, but I'm scared of passing a string or int or something in accidentally and introducing a bug
          const result = await RemovePostGameRelationship({
            postID,
            currentUserID,
            dispatch,
          });
        }
        dispatch(setPercentComplete(`${index} / ${selectedPosts.length}`));
      }
      HomeVaultFullRefresh({
        dispatch,
        cognitosub: currentUserCognitoSub,
        syncPreference,
        localLibrary,
      });
      navigation.navigate("HomeVault");
    }

    dispatch(setLoadProgressInactive());
    dispatch(deactivateMultiSelect());
  } catch (error) {
    console.log(error);
    dispatch(
      setErrormessageActive(UserDialogue("13").errormessage.systemerror)
    );
  }
}

/*

      HomeVaultFullRefresh({
        cognitosub,
        syncPreference,
        localLibrary,
      });

*/

export default CoverTileAction;
