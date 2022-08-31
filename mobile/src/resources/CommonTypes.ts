import {
  RootStateType,
  DispatchType,
  useAppDispatchType,
} from "../redux/store";
import { AddedMeUsersType } from "../screens/tabnav/profile/AddToAddedMeUsers";

export interface CurrentUserType {
  id: string | null;
  email: string | null;
  gamertag: string | null;
  displayname: string | null;
  pfp: string | null;
  fullyauthenticated: boolean | null;
  firstvaultupload: boolean | null;
  fullyonboarded?: boolean;
  setpassword: boolean | null | "unknown";
  cognitosub: string | null;
  createdAt: string | null;
  addedmecount: number | null;
  addedcount: number | null;
  storagesizeinbytes: number | null;
}

// When these fields are made imperative in schema.graphql, remove the optional (?) nature of associated fields
export interface PostType {
  id: string;
  aspectratio?: number;
  // hascomments: boolean;
  contentdate?: string;
  contentkey?: string | null;
  contenttype?: string;
  cognitosub?: string;
  displayname?: string;
  header?: boolean;
  posttext?: string | null;
  publicpost?: boolean | null;
  publicpostdate?: string | null;
  signedurl?: string | null;
  thumbnailkey?: string;
  thumbnailurl?: string | null;
  userid?: string | null;
  userpfp?: string;
  userpfpurl?: string;
  gamesID: string | null;
  coverID: string | null;
  title: string | null;
}

interface PostSubHeader {
  title: string;
  post: PostType;
}

export interface PostHeaderType {
  header: PostSubHeader;
  data: PostType[];
}

export interface CommentType {
  id: string;
  commenttext: string;
  postsID: string;
  usersID: string;
  createdAt: string;
  displayname: string;
}
