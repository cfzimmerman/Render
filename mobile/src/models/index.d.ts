import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

type PostViewTrackerMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type UserRelationshipsMetaData = {
  readOnlyFields: "updatedAt";
};

type UsersMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type PostsMetaData = {
  readOnlyFields: "updatedAt";
};

type UserExtrasMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type UserOTPMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

export declare class PostViewTracker {
  readonly id: string;
  readonly postid?: string | null;
  readonly viewercognitosub?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PostViewTracker, PostViewTrackerMetaData>);
  static copyOf(
    source: PostViewTracker,
    mutator: (
      draft: MutableModel<PostViewTracker, PostViewTrackerMetaData>
    ) => MutableModel<PostViewTracker, PostViewTrackerMetaData> | void
  ): PostViewTracker;
}

export declare class UserRelationships {
  readonly id: string;
  readonly sendercognitosub?: string | null;
  readonly receivercognitosub?: string | null;
  readonly createdAt: string;
  readonly Users?: Users | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserRelationships, UserRelationshipsMetaData>);
  static copyOf(
    source: UserRelationships,
    mutator: (
      draft: MutableModel<UserRelationships, UserRelationshipsMetaData>
    ) => MutableModel<UserRelationships, UserRelationshipsMetaData> | void
  ): UserRelationships;
}

export declare class Users {
  readonly id: string;
  readonly email?: string | null;
  readonly password?: string | null;
  readonly gamertag?: string | null;
  readonly displayname?: string | null;
  readonly birthday?: string | null;
  readonly acceptedtos?: boolean | null;
  readonly pfp?: string | null;
  readonly emailconfirmed?: boolean | null;
  readonly fullyauthenticated?: boolean | null;
  readonly cognitosub?: string | null;
  readonly addedcount?: number | null;
  readonly addedmecount?: number | null;
  readonly UserRelationships?: (UserRelationships | null)[] | null;
  readonly Posts?: (Posts | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Users, UsersMetaData>);
  static copyOf(
    source: Users,
    mutator: (
      draft: MutableModel<Users, UsersMetaData>
    ) => MutableModel<Users, UsersMetaData> | void
  ): Users;
}

export declare class Posts {
  readonly id: string;
  readonly contenttype?: string | null;
  readonly aspectratio?: number | null;
  readonly contentkey?: string | null;
  readonly publicpost?: boolean | null;
  readonly cognitosub: string;
  readonly contentdate?: string | null;
  readonly thumbnailkey?: string | null;
  readonly publicpostdate?: string | null;
  readonly createdAt: string;
  readonly Users?: Users | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Posts, PostsMetaData>);
  static copyOf(
    source: Posts,
    mutator: (
      draft: MutableModel<Posts, PostsMetaData>
    ) => MutableModel<Posts, PostsMetaData> | void
  ): Posts;
}

export declare class UserExtras {
  readonly id: string;
  readonly cognitosub?: string | null;
  readonly firstvaultupload?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserExtras, UserExtrasMetaData>);
  static copyOf(
    source: UserExtras,
    mutator: (
      draft: MutableModel<UserExtras, UserExtrasMetaData>
    ) => MutableModel<UserExtras, UserExtrasMetaData> | void
  ): UserExtras;
}

export declare class UserOTP {
  readonly id: string;
  readonly useremail?: string | null;
  readonly currentotp?: string | null;
  readonly userdisplayname?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserOTP, UserOTPMetaData>);
  static copyOf(
    source: UserOTP,
    mutator: (
      draft: MutableModel<UserOTP, UserOTPMetaData>
    ) => MutableModel<UserOTP, UserOTPMetaData> | void
  ): UserOTP;
}
