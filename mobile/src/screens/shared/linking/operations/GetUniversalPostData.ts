import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { GetPostsQuery } from "../../../../API";
import {
  addToUniversalPostData,
  clearUniversalPostData,
} from "../../../../redux/shared/universalpost";
import {
  ButtonMessagePropTypes,
  setButtonMessageActive,
  setButtonMessageInactive,
  setSystemMessageActive,
} from "../../../../redux/shared/messagemodal";
import { PostType } from "../../../../global/CommonTypes";
import { UserDialogue } from "../../../../global";

async function GetUniversalPostData({ postID, dispatch, navigation }) {
  try {
    const {
      data: { getPosts: post },
    } = (await API.graphql(
      graphqlOperation(`
        query GetPosts {
            getPosts (
                id: "${postID}"
            ) {
                id
                aspectratio
                cognitosub
                contentdate
                contentkey
                contenttype
                deleteddate
                posttext
                publicpost
                publicpostdate
                thumbnailkey
                Users {
                    id
                    displayname
                    pfp
                }
                Games {
                  id
                  coverID
                  title
                }

            }
        }
        `)
    )) as GraphQLResult<GetPostsQuery>;

    if (typeof post.deleteddate != "string") {
      const universalPost: PostType = {
        id: post.id,
        contenttype: post.contenttype,
        aspectratio: post.aspectratio,
        contentkey: post.contentkey,
        cognitosub: post.cognitosub,
        thumbnailkey: post.thumbnailkey,
        publicpostdate: post.publicpostdate,
        posttext: post.posttext,
        signedurl: null,
        thumbnailurl: null,
        userid: post.Users.id,
        displayname: post.Users.displayname,
        userpfp: post.Users.pfp,
        userpfpurl: null,
        gamesID: post.Games === null ? null : post.Games.id,
        coverID: post.Games === null ? null : post.Games.coverID,
        title: post.Games === null ? null : post.Games.title,
      };

      // contentURL is either a photo or video. If it's a video, also get the thumbnail. If it's a photo, don't bother (the if-else below)
      const contentURL = await Storage.get(post.contentkey, { expires: 86400 });

      if (post.contenttype === "image") {
        const newPost = { ...universalPost, signedurl: contentURL };
        dispatch(addToUniversalPostData(newPost));
      } else if (post.contenttype === "video") {
        const thumbnailURL = await Storage.get(post.thumbnailkey, {
          expires: 86400,
        });
        const newPost = {
          ...universalPost,
          signedurl: contentURL,
          thumbnailurl: thumbnailURL,
        };
        dispatch(addToUniversalPostData(newPost));
      }
    } else {
      dispatch(
        setSystemMessageActive(UserDialogue().systemmessage.postNotFound)
      );
      setTimeout(() => {
        navigation.navigate("HomeVault");
      }, 2000);
    }
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default GetUniversalPostData;
