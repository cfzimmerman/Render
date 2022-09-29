import { Storage, Auth, API, graphqlOperation } from "aws-amplify";
import { batch } from "react-redux";
import { Users, Posts } from "../../../models";
import { clearVaultPostData } from "../../../../redux/shared/vaultpostdata";
import { onCreatePosts, onUpdatePosts } from "../../../graphql/subscriptions";

async function ObservePostDB({ dispatch }) {
  const logintime = [new Date().toISOString()];

  const OnChange = ({ dispatch }) => {
    logintime.push(new Date().toISOString());
    logintime.shift();
    dispatch(clearVaultPostData());
  };

  const userinfo = await Auth.currentUserInfo();

  /*
🧊 Frozen
    if (userinfo != null) {
        const subscription = DataStore.observeQuery(Posts, c => c.cognitosub("eq", userinfo.attributes.sub).updatedAt("gt", logintime[0]) , {
            sort: s => s.contentdate(SortDirection.DESCENDING),
        }).subscribe(snapshot => {
            OnChange({ dispatch })
        })

    }
    */
}

export default ObservePostDB;
