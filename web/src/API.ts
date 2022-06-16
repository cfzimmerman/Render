/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostViewTrackerInput = {
  id?: string | null,
  postsID?: string | null,
  viewerID?: string | null,
};

export type ModelPostViewTrackerConditionInput = {
  postsID?: ModelIDInput | null,
  viewerID?: ModelIDInput | null,
  and?: Array< ModelPostViewTrackerConditionInput | null > | null,
  or?: Array< ModelPostViewTrackerConditionInput | null > | null,
  not?: ModelPostViewTrackerConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type PostViewTracker = {
  __typename: "PostViewTracker",
  id: string,
  postsID?: string | null,
  Posts?: Posts | null,
  viewerID?: string | null,
  Users?: Users | null,
  createdAt: string,
  updatedAt: string,
};

export type Posts = {
  __typename: "Posts",
  id: string,
  aspectratio?: number | null,
  cognitosub: string,
  contentdate?: string | null,
  contentkey?: string | null,
  contenttype?: string | null,
  createdAt: string,
  posttext?: string | null,
  publicpost?: boolean | null,
  publicpostdate?: string | null,
  sizeinbytes?: number | null,
  thumbnailkey?: string | null,
  type?: string | null,
  usersID: string,
  Users?: Users | null,
  Comments?: ModelCommentsConnection | null,
  PostViewTrackers?: ModelPostViewTrackerConnection | null,
  updatedAt: string,
};

export type Users = {
  __typename: "Users",
  id: string,
  acceptedtos?: boolean | null,
  addedcount?: number | null,
  addedmecount?: number | null,
  birthday?: string | null,
  cognitosub?: string | null,
  displayname?: string | null,
  email?: string | null,
  emailconfirmed?: boolean | null,
  firstvaultupload?: boolean | null,
  fullyauthenticated?: boolean | null,
  gamertag?: string | null,
  mostrecentpublicpost?: string | null,
  pfp?: string | null,
  setpassword?: boolean | null,
  storagesizeinbytes?: number | null,
  type?: string | null,
  Comments?: ModelCommentsConnection | null,
  Posts?: ModelPostsConnection | null,
  PostViewTrackers?: ModelPostViewTrackerConnection | null,
  UserRelationships?: ModelUserRelationshipsConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCommentsConnection = {
  __typename: "ModelCommentsConnection",
  items:  Array<Comments | null >,
  nextToken?: string | null,
};

export type Comments = {
  __typename: "Comments",
  id: string,
  commenttext?: string | null,
  postsID?: string | null,
  Posts?: Posts | null,
  usersID?: string | null,
  Users?: Users | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPostsConnection = {
  __typename: "ModelPostsConnection",
  items:  Array<Posts | null >,
  nextToken?: string | null,
};

export type ModelPostViewTrackerConnection = {
  __typename: "ModelPostViewTrackerConnection",
  items:  Array<PostViewTracker | null >,
  nextToken?: string | null,
};

export type ModelUserRelationshipsConnection = {
  __typename: "ModelUserRelationshipsConnection",
  items:  Array<UserRelationships | null >,
  nextToken?: string | null,
};

export type UserRelationships = {
  __typename: "UserRelationships",
  id: string,
  createdAt: string,
  receivercognitosub?: string | null,
  sendercognitosub?: string | null,
  usersID: string,
  Users?: Users | null,
  updatedAt: string,
};

export type UpdatePostViewTrackerInput = {
  id: string,
  postsID?: string | null,
  viewerID?: string | null,
};

export type DeletePostViewTrackerInput = {
  id: string,
};

export type CreateUserRelationshipsInput = {
  id?: string | null,
  createdAt?: string | null,
  receivercognitosub?: string | null,
  sendercognitosub?: string | null,
  usersID: string,
};

export type ModelUserRelationshipsConditionInput = {
  createdAt?: ModelStringInput | null,
  receivercognitosub?: ModelStringInput | null,
  sendercognitosub?: ModelStringInput | null,
  usersID?: ModelIDInput | null,
  and?: Array< ModelUserRelationshipsConditionInput | null > | null,
  or?: Array< ModelUserRelationshipsConditionInput | null > | null,
  not?: ModelUserRelationshipsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateUserRelationshipsInput = {
  id: string,
  createdAt?: string | null,
  receivercognitosub?: string | null,
  sendercognitosub?: string | null,
  usersID?: string | null,
};

export type DeleteUserRelationshipsInput = {
  id: string,
};

export type CreateCommentsInput = {
  id?: string | null,
  commenttext?: string | null,
  postsID?: string | null,
  usersID?: string | null,
  createdAt?: string | null,
};

export type ModelCommentsConditionInput = {
  commenttext?: ModelStringInput | null,
  postsID?: ModelIDInput | null,
  usersID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommentsConditionInput | null > | null,
  or?: Array< ModelCommentsConditionInput | null > | null,
  not?: ModelCommentsConditionInput | null,
};

export type UpdateCommentsInput = {
  id: string,
  commenttext?: string | null,
  postsID?: string | null,
  usersID?: string | null,
  createdAt?: string | null,
};

export type DeleteCommentsInput = {
  id: string,
};

export type CreatePostsInput = {
  id?: string | null,
  aspectratio?: number | null,
  cognitosub: string,
  contentdate?: string | null,
  contentkey?: string | null,
  contenttype?: string | null,
  createdAt?: string | null,
  posttext?: string | null,
  publicpost?: boolean | null,
  publicpostdate?: string | null,
  sizeinbytes?: number | null,
  thumbnailkey?: string | null,
  type?: string | null,
  usersID: string,
};

export type ModelPostsConditionInput = {
  aspectratio?: ModelFloatInput | null,
  cognitosub?: ModelStringInput | null,
  contentdate?: ModelStringInput | null,
  contentkey?: ModelStringInput | null,
  contenttype?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  posttext?: ModelStringInput | null,
  publicpost?: ModelBooleanInput | null,
  publicpostdate?: ModelStringInput | null,
  sizeinbytes?: ModelIntInput | null,
  thumbnailkey?: ModelStringInput | null,
  type?: ModelStringInput | null,
  usersID?: ModelIDInput | null,
  and?: Array< ModelPostsConditionInput | null > | null,
  or?: Array< ModelPostsConditionInput | null > | null,
  not?: ModelPostsConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePostsInput = {
  id: string,
  aspectratio?: number | null,
  cognitosub?: string | null,
  contentdate?: string | null,
  contentkey?: string | null,
  contenttype?: string | null,
  createdAt?: string | null,
  posttext?: string | null,
  publicpost?: boolean | null,
  publicpostdate?: string | null,
  sizeinbytes?: number | null,
  thumbnailkey?: string | null,
  type?: string | null,
  usersID?: string | null,
};

export type DeletePostsInput = {
  id: string,
};

export type CreateUsersInput = {
  id?: string | null,
  acceptedtos?: boolean | null,
  addedcount?: number | null,
  addedmecount?: number | null,
  birthday?: string | null,
  cognitosub?: string | null,
  displayname?: string | null,
  email?: string | null,
  emailconfirmed?: boolean | null,
  firstvaultupload?: boolean | null,
  fullyauthenticated?: boolean | null,
  gamertag?: string | null,
  mostrecentpublicpost?: string | null,
  pfp?: string | null,
  setpassword?: boolean | null,
  storagesizeinbytes?: number | null,
  type?: string | null,
};

export type ModelUsersConditionInput = {
  acceptedtos?: ModelBooleanInput | null,
  addedcount?: ModelIntInput | null,
  addedmecount?: ModelIntInput | null,
  birthday?: ModelStringInput | null,
  cognitosub?: ModelStringInput | null,
  displayname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  emailconfirmed?: ModelBooleanInput | null,
  firstvaultupload?: ModelBooleanInput | null,
  fullyauthenticated?: ModelBooleanInput | null,
  gamertag?: ModelStringInput | null,
  mostrecentpublicpost?: ModelStringInput | null,
  pfp?: ModelStringInput | null,
  setpassword?: ModelBooleanInput | null,
  storagesizeinbytes?: ModelFloatInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelUsersConditionInput | null > | null,
  or?: Array< ModelUsersConditionInput | null > | null,
  not?: ModelUsersConditionInput | null,
};

export type UpdateUsersInput = {
  id: string,
  acceptedtos?: boolean | null,
  addedcount?: number | null,
  addedmecount?: number | null,
  birthday?: string | null,
  cognitosub?: string | null,
  displayname?: string | null,
  email?: string | null,
  emailconfirmed?: boolean | null,
  firstvaultupload?: boolean | null,
  fullyauthenticated?: boolean | null,
  gamertag?: string | null,
  mostrecentpublicpost?: string | null,
  pfp?: string | null,
  setpassword?: boolean | null,
  storagesizeinbytes?: number | null,
  type?: string | null,
};

export type DeleteUsersInput = {
  id: string,
};

export type ModelPostViewTrackerFilterInput = {
  id?: ModelIDInput | null,
  postsID?: ModelIDInput | null,
  viewerID?: ModelIDInput | null,
  and?: Array< ModelPostViewTrackerFilterInput | null > | null,
  or?: Array< ModelPostViewTrackerFilterInput | null > | null,
  not?: ModelPostViewTrackerFilterInput | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserRelationshipsFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  receivercognitosub?: ModelStringInput | null,
  sendercognitosub?: ModelStringInput | null,
  usersID?: ModelIDInput | null,
  and?: Array< ModelUserRelationshipsFilterInput | null > | null,
  or?: Array< ModelUserRelationshipsFilterInput | null > | null,
  not?: ModelUserRelationshipsFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelCommentsFilterInput = {
  id?: ModelIDInput | null,
  commenttext?: ModelStringInput | null,
  postsID?: ModelIDInput | null,
  usersID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommentsFilterInput | null > | null,
  or?: Array< ModelCommentsFilterInput | null > | null,
  not?: ModelCommentsFilterInput | null,
};

export type ModelPostsFilterInput = {
  id?: ModelIDInput | null,
  aspectratio?: ModelFloatInput | null,
  cognitosub?: ModelStringInput | null,
  contentdate?: ModelStringInput | null,
  contentkey?: ModelStringInput | null,
  contenttype?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  posttext?: ModelStringInput | null,
  publicpost?: ModelBooleanInput | null,
  publicpostdate?: ModelStringInput | null,
  sizeinbytes?: ModelIntInput | null,
  thumbnailkey?: ModelStringInput | null,
  type?: ModelStringInput | null,
  usersID?: ModelIDInput | null,
  and?: Array< ModelPostsFilterInput | null > | null,
  or?: Array< ModelPostsFilterInput | null > | null,
  not?: ModelPostsFilterInput | null,
};

export type SearchablePostsFilterInput = {
  id?: SearchableIDFilterInput | null,
  aspectratio?: SearchableFloatFilterInput | null,
  cognitosub?: SearchableStringFilterInput | null,
  contentdate?: SearchableStringFilterInput | null,
  contentkey?: SearchableStringFilterInput | null,
  contenttype?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  posttext?: SearchableStringFilterInput | null,
  publicpost?: SearchableBooleanFilterInput | null,
  publicpostdate?: SearchableStringFilterInput | null,
  sizeinbytes?: SearchableIntFilterInput | null,
  thumbnailkey?: SearchableStringFilterInput | null,
  type?: SearchableStringFilterInput | null,
  usersID?: SearchableIDFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchablePostsFilterInput | null > | null,
  or?: Array< SearchablePostsFilterInput | null > | null,
  not?: SearchablePostsFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableFloatFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableBooleanFilterInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchablePostsSortInput = {
  field?: SearchablePostsSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchablePostsSortableFields {
  id = "id",
  aspectratio = "aspectratio",
  cognitosub = "cognitosub",
  contentdate = "contentdate",
  contentkey = "contentkey",
  contenttype = "contenttype",
  createdAt = "createdAt",
  posttext = "posttext",
  publicpost = "publicpost",
  publicpostdate = "publicpostdate",
  sizeinbytes = "sizeinbytes",
  thumbnailkey = "thumbnailkey",
  type = "type",
  usersID = "usersID",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchablePostsAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchablePostsAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchablePostsAggregateField {
  id = "id",
  aspectratio = "aspectratio",
  cognitosub = "cognitosub",
  contentdate = "contentdate",
  contentkey = "contentkey",
  contenttype = "contenttype",
  createdAt = "createdAt",
  posttext = "posttext",
  publicpost = "publicpost",
  publicpostdate = "publicpostdate",
  sizeinbytes = "sizeinbytes",
  thumbnailkey = "thumbnailkey",
  type = "type",
  usersID = "usersID",
  updatedAt = "updatedAt",
}


export type SearchablePostsConnection = {
  __typename: "SearchablePostsConnection",
  items:  Array<Posts | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type ModelUsersFilterInput = {
  id?: ModelIDInput | null,
  acceptedtos?: ModelBooleanInput | null,
  addedcount?: ModelIntInput | null,
  addedmecount?: ModelIntInput | null,
  birthday?: ModelStringInput | null,
  cognitosub?: ModelStringInput | null,
  displayname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  emailconfirmed?: ModelBooleanInput | null,
  firstvaultupload?: ModelBooleanInput | null,
  fullyauthenticated?: ModelBooleanInput | null,
  gamertag?: ModelStringInput | null,
  mostrecentpublicpost?: ModelStringInput | null,
  pfp?: ModelStringInput | null,
  setpassword?: ModelBooleanInput | null,
  storagesizeinbytes?: ModelFloatInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelUsersFilterInput | null > | null,
  or?: Array< ModelUsersFilterInput | null > | null,
  not?: ModelUsersFilterInput | null,
};

export type ModelUsersConnection = {
  __typename: "ModelUsersConnection",
  items:  Array<Users | null >,
  nextToken?: string | null,
};

export type SearchableUsersFilterInput = {
  id?: SearchableIDFilterInput | null,
  acceptedtos?: SearchableBooleanFilterInput | null,
  addedcount?: SearchableIntFilterInput | null,
  addedmecount?: SearchableIntFilterInput | null,
  birthday?: SearchableStringFilterInput | null,
  cognitosub?: SearchableStringFilterInput | null,
  displayname?: SearchableStringFilterInput | null,
  email?: SearchableStringFilterInput | null,
  emailconfirmed?: SearchableBooleanFilterInput | null,
  firstvaultupload?: SearchableBooleanFilterInput | null,
  fullyauthenticated?: SearchableBooleanFilterInput | null,
  gamertag?: SearchableStringFilterInput | null,
  mostrecentpublicpost?: SearchableStringFilterInput | null,
  pfp?: SearchableStringFilterInput | null,
  setpassword?: SearchableBooleanFilterInput | null,
  storagesizeinbytes?: SearchableFloatFilterInput | null,
  type?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableUsersFilterInput | null > | null,
  or?: Array< SearchableUsersFilterInput | null > | null,
  not?: SearchableUsersFilterInput | null,
};

export type SearchableUsersSortInput = {
  field?: SearchableUsersSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableUsersSortableFields {
  id = "id",
  acceptedtos = "acceptedtos",
  addedcount = "addedcount",
  addedmecount = "addedmecount",
  birthday = "birthday",
  cognitosub = "cognitosub",
  displayname = "displayname",
  email = "email",
  emailconfirmed = "emailconfirmed",
  firstvaultupload = "firstvaultupload",
  fullyauthenticated = "fullyauthenticated",
  gamertag = "gamertag",
  mostrecentpublicpost = "mostrecentpublicpost",
  pfp = "pfp",
  setpassword = "setpassword",
  storagesizeinbytes = "storagesizeinbytes",
  type = "type",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableUsersAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableUsersAggregateField,
};

export enum SearchableUsersAggregateField {
  id = "id",
  acceptedtos = "acceptedtos",
  addedcount = "addedcount",
  addedmecount = "addedmecount",
  birthday = "birthday",
  cognitosub = "cognitosub",
  displayname = "displayname",
  email = "email",
  emailconfirmed = "emailconfirmed",
  firstvaultupload = "firstvaultupload",
  fullyauthenticated = "fullyauthenticated",
  gamertag = "gamertag",
  mostrecentpublicpost = "mostrecentpublicpost",
  pfp = "pfp",
  setpassword = "setpassword",
  storagesizeinbytes = "storagesizeinbytes",
  type = "type",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableUsersConnection = {
  __typename: "SearchableUsersConnection",
  items:  Array<Users | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type CreatePostViewTrackerMutationVariables = {
  input: CreatePostViewTrackerInput,
  condition?: ModelPostViewTrackerConditionInput | null,
};

export type CreatePostViewTrackerMutation = {
  createPostViewTracker?:  {
    __typename: "PostViewTracker",
    id: string,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    viewerID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePostViewTrackerMutationVariables = {
  input: UpdatePostViewTrackerInput,
  condition?: ModelPostViewTrackerConditionInput | null,
};

export type UpdatePostViewTrackerMutation = {
  updatePostViewTracker?:  {
    __typename: "PostViewTracker",
    id: string,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    viewerID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePostViewTrackerMutationVariables = {
  input: DeletePostViewTrackerInput,
  condition?: ModelPostViewTrackerConditionInput | null,
};

export type DeletePostViewTrackerMutation = {
  deletePostViewTracker?:  {
    __typename: "PostViewTracker",
    id: string,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    viewerID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserRelationshipsMutationVariables = {
  input: CreateUserRelationshipsInput,
  condition?: ModelUserRelationshipsConditionInput | null,
};

export type CreateUserRelationshipsMutation = {
  createUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    receivercognitosub?: string | null,
    sendercognitosub?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserRelationshipsMutationVariables = {
  input: UpdateUserRelationshipsInput,
  condition?: ModelUserRelationshipsConditionInput | null,
};

export type UpdateUserRelationshipsMutation = {
  updateUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    receivercognitosub?: string | null,
    sendercognitosub?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserRelationshipsMutationVariables = {
  input: DeleteUserRelationshipsInput,
  condition?: ModelUserRelationshipsConditionInput | null,
};

export type DeleteUserRelationshipsMutation = {
  deleteUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    receivercognitosub?: string | null,
    sendercognitosub?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateCommentsMutationVariables = {
  input: CreateCommentsInput,
  condition?: ModelCommentsConditionInput | null,
};

export type CreateCommentsMutation = {
  createComments?:  {
    __typename: "Comments",
    id: string,
    commenttext?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    usersID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommentsMutationVariables = {
  input: UpdateCommentsInput,
  condition?: ModelCommentsConditionInput | null,
};

export type UpdateCommentsMutation = {
  updateComments?:  {
    __typename: "Comments",
    id: string,
    commenttext?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    usersID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommentsMutationVariables = {
  input: DeleteCommentsInput,
  condition?: ModelCommentsConditionInput | null,
};

export type DeleteCommentsMutation = {
  deleteComments?:  {
    __typename: "Comments",
    id: string,
    commenttext?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    usersID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePostsMutationVariables = {
  input: CreatePostsInput,
  condition?: ModelPostsConditionInput | null,
};

export type CreatePostsMutation = {
  createPosts?:  {
    __typename: "Posts",
    id: string,
    aspectratio?: number | null,
    cognitosub: string,
    contentdate?: string | null,
    contentkey?: string | null,
    contenttype?: string | null,
    createdAt: string,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdatePostsMutationVariables = {
  input: UpdatePostsInput,
  condition?: ModelPostsConditionInput | null,
};

export type UpdatePostsMutation = {
  updatePosts?:  {
    __typename: "Posts",
    id: string,
    aspectratio?: number | null,
    cognitosub: string,
    contentdate?: string | null,
    contentkey?: string | null,
    contenttype?: string | null,
    createdAt: string,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeletePostsMutationVariables = {
  input: DeletePostsInput,
  condition?: ModelPostsConditionInput | null,
};

export type DeletePostsMutation = {
  deletePosts?:  {
    __typename: "Posts",
    id: string,
    aspectratio?: number | null,
    cognitosub: string,
    contentdate?: string | null,
    contentkey?: string | null,
    contenttype?: string | null,
    createdAt: string,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateUsersMutationVariables = {
  input: CreateUsersInput,
  condition?: ModelUsersConditionInput | null,
};

export type CreateUsersMutation = {
  createUsers?:  {
    __typename: "Users",
    id: string,
    acceptedtos?: boolean | null,
    addedcount?: number | null,
    addedmecount?: number | null,
    birthday?: string | null,
    cognitosub?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    gamertag?: string | null,
    mostrecentpublicpost?: string | null,
    pfp?: string | null,
    setpassword?: boolean | null,
    storagesizeinbytes?: number | null,
    type?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    UserRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUsersMutationVariables = {
  input: UpdateUsersInput,
  condition?: ModelUsersConditionInput | null,
};

export type UpdateUsersMutation = {
  updateUsers?:  {
    __typename: "Users",
    id: string,
    acceptedtos?: boolean | null,
    addedcount?: number | null,
    addedmecount?: number | null,
    birthday?: string | null,
    cognitosub?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    gamertag?: string | null,
    mostrecentpublicpost?: string | null,
    pfp?: string | null,
    setpassword?: boolean | null,
    storagesizeinbytes?: number | null,
    type?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    UserRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUsersMutationVariables = {
  input: DeleteUsersInput,
  condition?: ModelUsersConditionInput | null,
};

export type DeleteUsersMutation = {
  deleteUsers?:  {
    __typename: "Users",
    id: string,
    acceptedtos?: boolean | null,
    addedcount?: number | null,
    addedmecount?: number | null,
    birthday?: string | null,
    cognitosub?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    gamertag?: string | null,
    mostrecentpublicpost?: string | null,
    pfp?: string | null,
    setpassword?: boolean | null,
    storagesizeinbytes?: number | null,
    type?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    UserRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPostViewTrackerQueryVariables = {
  id: string,
};

export type GetPostViewTrackerQuery = {
  getPostViewTracker?:  {
    __typename: "PostViewTracker",
    id: string,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    viewerID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPostViewTrackersQueryVariables = {
  filter?: ModelPostViewTrackerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostViewTrackersQuery = {
  listPostViewTrackers?:  {
    __typename: "ModelPostViewTrackerConnection",
    items:  Array< {
      __typename: "PostViewTracker",
      id: string,
      postsID?: string | null,
      viewerID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostViewByPostIDQueryVariables = {
  postsID: string,
  viewerID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostViewTrackerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostViewByPostIDQuery = {
  postViewByPostID?:  {
    __typename: "ModelPostViewTrackerConnection",
    items:  Array< {
      __typename: "PostViewTracker",
      id: string,
      postsID?: string | null,
      viewerID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserRelationshipsQueryVariables = {
  id: string,
};

export type GetUserRelationshipsQuery = {
  getUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    receivercognitosub?: string | null,
    sendercognitosub?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListUserRelationshipsQueryVariables = {
  filter?: ModelUserRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserRelationshipsQuery = {
  listUserRelationships?:  {
    __typename: "ModelUserRelationshipsConnection",
    items:  Array< {
      __typename: "UserRelationships",
      id: string,
      createdAt: string,
      receivercognitosub?: string | null,
      sendercognitosub?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RelationshipsByReceiverDateQueryVariables = {
  receivercognitosub: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RelationshipsByReceiverDateQuery = {
  relationshipsByReceiverDate?:  {
    __typename: "ModelUserRelationshipsConnection",
    items:  Array< {
      __typename: "UserRelationships",
      id: string,
      createdAt: string,
      receivercognitosub?: string | null,
      sendercognitosub?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RelationshipsBySenderDateQueryVariables = {
  sendercognitosub: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RelationshipsBySenderDateQuery = {
  relationshipsBySenderDate?:  {
    __typename: "ModelUserRelationshipsConnection",
    items:  Array< {
      __typename: "UserRelationships",
      id: string,
      createdAt: string,
      receivercognitosub?: string | null,
      sendercognitosub?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type VerifyAddedUserQueryVariables = {
  sendercognitosub: string,
  receivercognitosub?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type VerifyAddedUserQuery = {
  verifyAddedUser?:  {
    __typename: "ModelUserRelationshipsConnection",
    items:  Array< {
      __typename: "UserRelationships",
      id: string,
      createdAt: string,
      receivercognitosub?: string | null,
      sendercognitosub?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AddedUsersByCurrentUserQueryVariables = {
  sendercognitosub: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AddedUsersByCurrentUserQuery = {
  addedUsersByCurrentUser?:  {
    __typename: "ModelUserRelationshipsConnection",
    items:  Array< {
      __typename: "UserRelationships",
      id: string,
      createdAt: string,
      receivercognitosub?: string | null,
      sendercognitosub?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentsQueryVariables = {
  id: string,
};

export type GetCommentsQuery = {
  getComments?:  {
    __typename: "Comments",
    id: string,
    commenttext?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    usersID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string,
      commenttext?: string | null,
      postsID?: string | null,
      usersID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CommentsByCreatedDateQueryVariables = {
  postsID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByCreatedDateQuery = {
  commentsByCreatedDate?:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string,
      commenttext?: string | null,
      postsID?: string | null,
      usersID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostsQueryVariables = {
  id: string,
};

export type GetPostsQuery = {
  getPosts?:  {
    __typename: "Posts",
    id: string,
    aspectratio?: number | null,
    cognitosub: string,
    contentdate?: string | null,
    contentkey?: string | null,
    contenttype?: string | null,
    createdAt: string,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByCreatedDateQueryVariables = {
  cognitosub: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByCreatedDateQuery = {
  postsByCreatedDate?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByPostedDateQueryVariables = {
  cognitosub: string,
  publicpostdate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByPostedDateQuery = {
  postsByPostedDate?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByContentDateQueryVariables = {
  cognitosub: string,
  contentdate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByContentDateQuery = {
  postsByContentDate?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByContentKeyQueryVariables = {
  contentkey: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByContentKeyQuery = {
  postsByContentKey?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByPublicDateQueryVariables = {
  type: string,
  publicpostdate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByPublicDateQuery = {
  postsByPublicDate?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchPostsQueryVariables = {
  filter?: SearchablePostsFilterInput | null,
  sort?: Array< SearchablePostsSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchablePostsAggregationInput | null > | null,
};

export type SearchPostsQuery = {
  searchPosts?:  {
    __typename: "SearchablePostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetUsersQueryVariables = {
  id: string,
};

export type GetUsersQuery = {
  getUsers?:  {
    __typename: "Users",
    id: string,
    acceptedtos?: boolean | null,
    addedcount?: number | null,
    addedmecount?: number | null,
    birthday?: string | null,
    cognitosub?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    gamertag?: string | null,
    mostrecentpublicpost?: string | null,
    pfp?: string | null,
    setpassword?: boolean | null,
    storagesizeinbytes?: number | null,
    type?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    UserRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUsersConnection",
    items:  Array< {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserByCognitosubQueryVariables = {
  cognitosub: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByCognitosubQuery = {
  userByCognitosub?:  {
    __typename: "ModelUsersConnection",
    items:  Array< {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserByEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByEmailQuery = {
  userByEmail?:  {
    __typename: "ModelUsersConnection",
    items:  Array< {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserByGamertagQueryVariables = {
  gamertag: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByGamertagQuery = {
  userByGamertag?:  {
    __typename: "ModelUsersConnection",
    items:  Array< {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchByGamertagQueryVariables = {
  type: string,
  gamertag?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchByGamertagQuery = {
  searchByGamertag?:  {
    __typename: "ModelUsersConnection",
    items:  Array< {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchUsersQueryVariables = {
  filter?: SearchableUsersFilterInput | null,
  sort?: Array< SearchableUsersSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableUsersAggregationInput | null > | null,
};

export type SearchUsersQuery = {
  searchUsers?:  {
    __typename: "SearchableUsersConnection",
    items:  Array< {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type OnCreatePostViewTrackerSubscription = {
  onCreatePostViewTracker?:  {
    __typename: "PostViewTracker",
    id: string,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    viewerID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePostViewTrackerSubscription = {
  onUpdatePostViewTracker?:  {
    __typename: "PostViewTracker",
    id: string,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    viewerID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePostViewTrackerSubscription = {
  onDeletePostViewTracker?:  {
    __typename: "PostViewTracker",
    id: string,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    viewerID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserRelationshipsSubscription = {
  onCreateUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    receivercognitosub?: string | null,
    sendercognitosub?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserRelationshipsSubscription = {
  onUpdateUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    receivercognitosub?: string | null,
    sendercognitosub?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserRelationshipsSubscription = {
  onDeleteUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    receivercognitosub?: string | null,
    sendercognitosub?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateCommentsSubscription = {
  onCreateComments?:  {
    __typename: "Comments",
    id: string,
    commenttext?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    usersID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommentsSubscription = {
  onUpdateComments?:  {
    __typename: "Comments",
    id: string,
    commenttext?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    usersID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommentsSubscription = {
  onDeleteComments?:  {
    __typename: "Comments",
    id: string,
    commenttext?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contenttype?: string | null,
      createdAt: string,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      updatedAt: string,
    } | null,
    usersID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePostsSubscription = {
  onCreatePosts?:  {
    __typename: "Posts",
    id: string,
    aspectratio?: number | null,
    cognitosub: string,
    contentdate?: string | null,
    contentkey?: string | null,
    contenttype?: string | null,
    createdAt: string,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdatePostsSubscription = {
  onUpdatePosts?:  {
    __typename: "Posts",
    id: string,
    aspectratio?: number | null,
    cognitosub: string,
    contentdate?: string | null,
    contentkey?: string | null,
    contenttype?: string | null,
    createdAt: string,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeletePostsSubscription = {
  onDeletePosts?:  {
    __typename: "Posts",
    id: string,
    aspectratio?: number | null,
    cognitosub: string,
    contentdate?: string | null,
    contentkey?: string | null,
    contenttype?: string | null,
    createdAt: string,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      cognitosub?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUsersSubscription = {
  onCreateUsers?:  {
    __typename: "Users",
    id: string,
    acceptedtos?: boolean | null,
    addedcount?: number | null,
    addedmecount?: number | null,
    birthday?: string | null,
    cognitosub?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    gamertag?: string | null,
    mostrecentpublicpost?: string | null,
    pfp?: string | null,
    setpassword?: boolean | null,
    storagesizeinbytes?: number | null,
    type?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    UserRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUsersSubscription = {
  onUpdateUsers?:  {
    __typename: "Users",
    id: string,
    acceptedtos?: boolean | null,
    addedcount?: number | null,
    addedmecount?: number | null,
    birthday?: string | null,
    cognitosub?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    gamertag?: string | null,
    mostrecentpublicpost?: string | null,
    pfp?: string | null,
    setpassword?: boolean | null,
    storagesizeinbytes?: number | null,
    type?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    UserRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUsersSubscription = {
  onDeleteUsers?:  {
    __typename: "Users",
    id: string,
    acceptedtos?: boolean | null,
    addedcount?: number | null,
    addedmecount?: number | null,
    birthday?: string | null,
    cognitosub?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    gamertag?: string | null,
    mostrecentpublicpost?: string | null,
    pfp?: string | null,
    setpassword?: boolean | null,
    storagesizeinbytes?: number | null,
    type?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
    PostViewTrackers?:  {
      __typename: "ModelPostViewTrackerConnection",
      nextToken?: string | null,
    } | null,
    UserRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};