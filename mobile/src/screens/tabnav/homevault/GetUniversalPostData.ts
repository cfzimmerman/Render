import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { GetPostsQuery } from "../../../API";
import { addToUniversalPostData } from "../../../redux/general/universalpost";
import { PostType } from "../../../resources/CommonTypes";

async function GetUniversalPostData({ postID, dispatch }) {
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
                posttext
                publicpost
                publicpostdate
                thumbnailkey
                Users {
                    id
                    displayname
                    pfp
                }

            }
        }
        `)
    )) as GraphQLResult<GetPostsQuery>;

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
  } catch (error) {
    console.log("Error: " + JSON.stringify(error));
  }
}

export default GetUniversalPostData;