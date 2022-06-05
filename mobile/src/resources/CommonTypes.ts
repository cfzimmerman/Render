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
  cognitosub: string | null;
  createdAt: string | null;
  addedmecount: number | null;
  addedcount: number | null;
}

export interface PostType {
  id: string;
  aspectratio: number;
  contentdate: string;
  contentkey: string | null;
  contenttype: string;
  header: boolean;
  posttext: string | null;
  publicpost: boolean | null;
  signedurl: string | null;
  thumbnailkey?: string;
  thumbnailurl: string | null;
}

interface PostSubHeader {
  title: string;
  post: PostType;
}

export interface PostHeaderType {
  header: PostSubHeader;
  data: PostType[];
}
