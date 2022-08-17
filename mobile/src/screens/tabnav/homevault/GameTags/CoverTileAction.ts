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
        CreatePostGameRelationship({
          gameID: item.id,
          postID: selectedPosts[0],
          userID: currentUserID,
          dispatch,
          searchMode,
          selectedPostsIndex: 0,
        });
      } else if (deleteTag === true) {
        RemovePostGameRelationship({
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
    } else if (selectedPosts.length > 1 && item != null) {
      dispatch(
        setLoadProgressActive({
          title: deleteTag === true ? "Deleting tags" : "Adding tags",
          description: ``,
        })
      );
      dispatch(setPercentComplete(`0 / ${selectedPosts.length}`));
      // Add backend relationship
      for await (const [index, postID] of selectedPosts.entries()) {
        const result = await CreatePostGameRelationship({
          gameID: item.id,
          postID,
          searchMode,
          dispatch,
          userID: currentUserID,
          selectedPostsIndex: index,
        });
        dispatch(setPercentComplete(`${index} / ${selectedPosts.length}`));
      }
    }
    HomeVaultFullRefresh({
      dispatch,
      cognitosub: currentUserCognitoSub,
      syncPreference,
      localLibrary,
    });
    dispatch(setLoadProgressInactive());
    dispatch(deactivateMultiSelect());
    navigation.goBack();
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
