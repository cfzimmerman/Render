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
  contentlastupdated?: string | null,
  contenttype?: string | null,
  createdAt: string,
  deleteddate?: string | null,
  posttext?: string | null,
  publicpost?: boolean | null,
  publicpostdate?: string | null,
  sizeinbytes?: number | null,
  thumbnailkey?: string | null,
  type?: string | null,
  usersID: string,
  gamesID?: string | null,
  Users?: Users | null,
  Games?: Games | null,
  Comments?: ModelCommentsConnection | null,
  Notifications?: ModelNotificationsConnection | null,
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
  updatedAt?: string | null,
  cognitosub?: string | null,
  disablednotifications?: string | null,
  displayname?: string | null,
  email?: string | null,
  emailconfirmed?: boolean | null,
  firstvaultupload?: boolean | null,
  fullyauthenticated?: boolean | null,
  fullyonboarded?: boolean | null,
  gamertag?: string | null,
  mostrecentpublicpost?: string | null,
  pfp?: string | null,
  setpassword?: boolean | null,
  storagesizeinbytes?: number | null,
  type?: string | null,
  Comments?: ModelCommentsConnection | null,
  UserNotifications?: ModelUserNotificationsConnection | null,
  UserGames?: ModelUserGamesConnection | null,
  Posts?: ModelPostsConnection | null,
  PostViewTrackers?: ModelPostViewTrackerConnection | null,
  SenderRelationships?: ModelUserRelationshipsConnection | null,
  ReceiverRelationships?: ModelUserRelationshipsConnection | null,
  createdAt: string,
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

export type ModelUserNotificationsConnection = {
  __typename: "ModelUserNotificationsConnection",
  items:  Array<UserNotifications | null >,
  nextToken?: string | null,
};

export type UserNotifications = {
  __typename: "UserNotifications",
  id: string,
  createdAt: string,
  notificationsID?: string | null,
  usersID?: string | null,
  Notifications?: Notifications | null,
  Users?: Users | null,
  updatedAt: string,
};

export type Notifications = {
  __typename: "Notifications",
  id: string,
  createdAt: string,
  code?: number | null,
  payload?: string | null,
  postsID?: string | null,
  Posts?: Posts | null,
  UserNotifications?: ModelUserNotificationsConnection | null,
  updatedAt: string,
};

export type ModelUserGamesConnection = {
  __typename: "ModelUserGamesConnection",
  items:  Array<UserGames | null >,
  nextToken?: string | null,
};

export type UserGames = {
  __typename: "UserGames",
  id: string,
  createdAt: string,
  usersID: string,
  gamesID: string,
  Users?: Users | null,
  Games?: Games | null,
  updatedAt: string,
};

export type Games = {
  __typename: "Games",
  id: string,
  createdAt: string,
  updatedAt?: string | null,
  igdbID?: number | null,
  title?: string | null,
  releaseDate?: string | null,
  series?: string | null,
  genre?: string | null,
  theme?: string | null,
  coverID?: string | null,
  backgroundID?: string | null,
  steamID?: string | null,
  microsoftID?: string | null,
  xboxMarketplaceID?: string | null,
  gogID?: string | null,
  egsID?: string | null,
  twitchID?: string | null,
  oculusID?: string | null,
  playstationID?: string | null,
  numUserGames?: number | null,
  type?: string | null,
  UserGames?: ModelUserGamesConnection | null,
  Posts?: ModelPostsConnection | null,
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
  senderID?: string | null,
  SenderUser?: Users | null,
  receiverID?: string | null,
  ReceiverUser?: Users | null,
  updatedAt: string,
};

export type ModelNotificationsConnection = {
  __typename: "ModelNotificationsConnection",
  items:  Array<Notifications | null >,
  nextToken?: string | null,
};

export type UpdatePostViewTrackerInput = {
  id: string,
  postsID?: string | null,
  viewerID?: string | null,
};

export type DeletePostViewTrackerInput = {
  id: string,
};

export type CreateGlobalDataInput = {
  id?: string | null,
  createdAt?: string | null,
  usecase?: string | null,
  key?: string | null,
  strA?: string | null,
  strB?: string | null,
  numA?: number | null,
  numB?: number | null,
};

export type ModelGlobalDataConditionInput = {
  createdAt?: ModelStringInput | null,
  usecase?: ModelStringInput | null,
  key?: ModelStringInput | null,
  strA?: ModelStringInput | null,
  strB?: ModelStringInput | null,
  numA?: ModelFloatInput | null,
  numB?: ModelFloatInput | null,
  and?: Array< ModelGlobalDataConditionInput | null > | null,
  or?: Array< ModelGlobalDataConditionInput | null > | null,
  not?: ModelGlobalDataConditionInput | null,
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

export type GlobalData = {
  __typename: "GlobalData",
  id: string,
  createdAt: string,
  usecase?: string | null,
  key?: string | null,
  strA?: string | null,
  strB?: string | null,
  numA?: number | null,
  numB?: number | null,
  updatedAt: string,
};

export type UpdateGlobalDataInput = {
  id: string,
  createdAt?: string | null,
  usecase?: string | null,
  key?: string | null,
  strA?: string | null,
  strB?: string | null,
  numA?: number | null,
  numB?: number | null,
};

export type DeleteGlobalDataInput = {
  id: string,
};

export type CreateGamesInput = {
  id?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  igdbID?: number | null,
  title?: string | null,
  releaseDate?: string | null,
  series?: string | null,
  genre?: string | null,
  theme?: string | null,
  coverID?: string | null,
  backgroundID?: string | null,
  steamID?: string | null,
  microsoftID?: string | null,
  xboxMarketplaceID?: string | null,
  gogID?: string | null,
  egsID?: string | null,
  twitchID?: string | null,
  oculusID?: string | null,
  playstationID?: string | null,
  numUserGames?: number | null,
  type?: string | null,
};

export type ModelGamesConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  igdbID?: ModelIntInput | null,
  title?: ModelStringInput | null,
  releaseDate?: ModelStringInput | null,
  series?: ModelStringInput | null,
  genre?: ModelStringInput | null,
  theme?: ModelStringInput | null,
  coverID?: ModelStringInput | null,
  backgroundID?: ModelStringInput | null,
  steamID?: ModelStringInput | null,
  microsoftID?: ModelStringInput | null,
  xboxMarketplaceID?: ModelStringInput | null,
  gogID?: ModelStringInput | null,
  egsID?: ModelStringInput | null,
  twitchID?: ModelStringInput | null,
  oculusID?: ModelStringInput | null,
  playstationID?: ModelStringInput | null,
  numUserGames?: ModelIntInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelGamesConditionInput | null > | null,
  or?: Array< ModelGamesConditionInput | null > | null,
  not?: ModelGamesConditionInput | null,
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

export type UpdateGamesInput = {
  id: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  igdbID?: number | null,
  title?: string | null,
  releaseDate?: string | null,
  series?: string | null,
  genre?: string | null,
  theme?: string | null,
  coverID?: string | null,
  backgroundID?: string | null,
  steamID?: string | null,
  microsoftID?: string | null,
  xboxMarketplaceID?: string | null,
  gogID?: string | null,
  egsID?: string | null,
  twitchID?: string | null,
  oculusID?: string | null,
  playstationID?: string | null,
  numUserGames?: number | null,
  type?: string | null,
};

export type DeleteGamesInput = {
  id: string,
};

export type CreateUserGamesInput = {
  id?: string | null,
  createdAt?: string | null,
  usersID: string,
  gamesID: string,
};

export type ModelUserGamesConditionInput = {
  createdAt?: ModelStringInput | null,
  usersID?: ModelIDInput | null,
  gamesID?: ModelIDInput | null,
  and?: Array< ModelUserGamesConditionInput | null > | null,
  or?: Array< ModelUserGamesConditionInput | null > | null,
  not?: ModelUserGamesConditionInput | null,
};

export type UpdateUserGamesInput = {
  id: string,
  createdAt?: string | null,
  usersID?: string | null,
  gamesID?: string | null,
};

export type DeleteUserGamesInput = {
  id: string,
};

export type CreateNotificationsInput = {
  id?: string | null,
  createdAt?: string | null,
  code?: number | null,
  payload?: string | null,
  postsID?: string | null,
};

export type ModelNotificationsConditionInput = {
  createdAt?: ModelStringInput | null,
  code?: ModelIntInput | null,
  payload?: ModelStringInput | null,
  postsID?: ModelIDInput | null,
  and?: Array< ModelNotificationsConditionInput | null > | null,
  or?: Array< ModelNotificationsConditionInput | null > | null,
  not?: ModelNotificationsConditionInput | null,
};

export type UpdateNotificationsInput = {
  id: string,
  createdAt?: string | null,
  code?: number | null,
  payload?: string | null,
  postsID?: string | null,
};

export type DeleteNotificationsInput = {
  id: string,
};

export type CreateUserNotificationsInput = {
  id?: string | null,
  createdAt?: string | null,
  notificationsID?: string | null,
  usersID?: string | null,
};

export type ModelUserNotificationsConditionInput = {
  createdAt?: ModelStringInput | null,
  notificationsID?: ModelIDInput | null,
  usersID?: ModelIDInput | null,
  and?: Array< ModelUserNotificationsConditionInput | null > | null,
  or?: Array< ModelUserNotificationsConditionInput | null > | null,
  not?: ModelUserNotificationsConditionInput | null,
};

export type UpdateUserNotificationsInput = {
  id: string,
  createdAt?: string | null,
  notificationsID?: string | null,
  usersID?: string | null,
};

export type DeleteUserNotificationsInput = {
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

export type CreateUserRelationshipsInput = {
  id?: string | null,
  createdAt?: string | null,
  senderID?: string | null,
  receiverID?: string | null,
};

export type ModelUserRelationshipsConditionInput = {
  createdAt?: ModelStringInput | null,
  senderID?: ModelIDInput | null,
  receiverID?: ModelIDInput | null,
  and?: Array< ModelUserRelationshipsConditionInput | null > | null,
  or?: Array< ModelUserRelationshipsConditionInput | null > | null,
  not?: ModelUserRelationshipsConditionInput | null,
};

export type UpdateUserRelationshipsInput = {
  id: string,
  createdAt?: string | null,
  senderID?: string | null,
  receiverID?: string | null,
};

export type DeleteUserRelationshipsInput = {
  id: string,
};

export type CreatePostsInput = {
  id?: string | null,
  aspectratio?: number | null,
  cognitosub: string,
  contentdate?: string | null,
  contentkey?: string | null,
  contentlastupdated?: string | null,
  contenttype?: string | null,
  createdAt?: string | null,
  deleteddate?: string | null,
  posttext?: string | null,
  publicpost?: boolean | null,
  publicpostdate?: string | null,
  sizeinbytes?: number | null,
  thumbnailkey?: string | null,
  type?: string | null,
  usersID: string,
  gamesID?: string | null,
};

export type ModelPostsConditionInput = {
  aspectratio?: ModelFloatInput | null,
  cognitosub?: ModelStringInput | null,
  contentdate?: ModelStringInput | null,
  contentkey?: ModelStringInput | null,
  contentlastupdated?: ModelStringInput | null,
  contenttype?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  deleteddate?: ModelStringInput | null,
  posttext?: ModelStringInput | null,
  publicpost?: ModelBooleanInput | null,
  publicpostdate?: ModelStringInput | null,
  sizeinbytes?: ModelIntInput | null,
  thumbnailkey?: ModelStringInput | null,
  type?: ModelStringInput | null,
  usersID?: ModelIDInput | null,
  gamesID?: ModelIDInput | null,
  and?: Array< ModelPostsConditionInput | null > | null,
  or?: Array< ModelPostsConditionInput | null > | null,
  not?: ModelPostsConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePostsInput = {
  id: string,
  aspectratio?: number | null,
  cognitosub?: string | null,
  contentdate?: string | null,
  contentkey?: string | null,
  contentlastupdated?: string | null,
  contenttype?: string | null,
  createdAt?: string | null,
  deleteddate?: string | null,
  posttext?: string | null,
  publicpost?: boolean | null,
  publicpostdate?: string | null,
  sizeinbytes?: number | null,
  thumbnailkey?: string | null,
  type?: string | null,
  usersID?: string | null,
  gamesID?: string | null,
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
  updatedAt?: string | null,
  cognitosub?: string | null,
  disablednotifications?: string | null,
  displayname?: string | null,
  email?: string | null,
  emailconfirmed?: boolean | null,
  firstvaultupload?: boolean | null,
  fullyauthenticated?: boolean | null,
  fullyonboarded?: boolean | null,
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
  updatedAt?: ModelStringInput | null,
  cognitosub?: ModelStringInput | null,
  disablednotifications?: ModelStringInput | null,
  displayname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  emailconfirmed?: ModelBooleanInput | null,
  firstvaultupload?: ModelBooleanInput | null,
  fullyauthenticated?: ModelBooleanInput | null,
  fullyonboarded?: ModelBooleanInput | null,
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
  updatedAt?: string | null,
  cognitosub?: string | null,
  disablednotifications?: string | null,
  displayname?: string | null,
  email?: string | null,
  emailconfirmed?: boolean | null,
  firstvaultupload?: boolean | null,
  fullyauthenticated?: boolean | null,
  fullyonboarded?: boolean | null,
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


export type ModelGlobalDataFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  usecase?: ModelStringInput | null,
  key?: ModelStringInput | null,
  strA?: ModelStringInput | null,
  strB?: ModelStringInput | null,
  numA?: ModelFloatInput | null,
  numB?: ModelFloatInput | null,
  and?: Array< ModelGlobalDataFilterInput | null > | null,
  or?: Array< ModelGlobalDataFilterInput | null > | null,
  not?: ModelGlobalDataFilterInput | null,
};

export type ModelGlobalDataConnection = {
  __typename: "ModelGlobalDataConnection",
  items:  Array<GlobalData | null >,
  nextToken?: string | null,
};

export type ModelGamesFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  igdbID?: ModelIntInput | null,
  title?: ModelStringInput | null,
  releaseDate?: ModelStringInput | null,
  series?: ModelStringInput | null,
  genre?: ModelStringInput | null,
  theme?: ModelStringInput | null,
  coverID?: ModelStringInput | null,
  backgroundID?: ModelStringInput | null,
  steamID?: ModelStringInput | null,
  microsoftID?: ModelStringInput | null,
  xboxMarketplaceID?: ModelStringInput | null,
  gogID?: ModelStringInput | null,
  egsID?: ModelStringInput | null,
  twitchID?: ModelStringInput | null,
  oculusID?: ModelStringInput | null,
  playstationID?: ModelStringInput | null,
  numUserGames?: ModelIntInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelGamesFilterInput | null > | null,
  or?: Array< ModelGamesFilterInput | null > | null,
  not?: ModelGamesFilterInput | null,
};

export type ModelGamesConnection = {
  __typename: "ModelGamesConnection",
  items:  Array<Games | null >,
  nextToken?: string | null,
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

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type SearchableGamesFilterInput = {
  id?: SearchableIDFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  igdbID?: SearchableIntFilterInput | null,
  title?: SearchableStringFilterInput | null,
  releaseDate?: SearchableStringFilterInput | null,
  series?: SearchableStringFilterInput | null,
  genre?: SearchableStringFilterInput | null,
  theme?: SearchableStringFilterInput | null,
  coverID?: SearchableStringFilterInput | null,
  backgroundID?: SearchableStringFilterInput | null,
  steamID?: SearchableStringFilterInput | null,
  microsoftID?: SearchableStringFilterInput | null,
  xboxMarketplaceID?: SearchableStringFilterInput | null,
  gogID?: SearchableStringFilterInput | null,
  egsID?: SearchableStringFilterInput | null,
  twitchID?: SearchableStringFilterInput | null,
  oculusID?: SearchableStringFilterInput | null,
  playstationID?: SearchableStringFilterInput | null,
  numUserGames?: SearchableIntFilterInput | null,
  type?: SearchableStringFilterInput | null,
  and?: Array< SearchableGamesFilterInput | null > | null,
  or?: Array< SearchableGamesFilterInput | null > | null,
  not?: SearchableGamesFilterInput | null,
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

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableGamesSortInput = {
  field?: SearchableGamesSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableGamesSortableFields {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  igdbID = "igdbID",
  title = "title",
  releaseDate = "releaseDate",
  series = "series",
  genre = "genre",
  theme = "theme",
  coverID = "coverID",
  backgroundID = "backgroundID",
  steamID = "steamID",
  microsoftID = "microsoftID",
  xboxMarketplaceID = "xboxMarketplaceID",
  gogID = "gogID",
  egsID = "egsID",
  twitchID = "twitchID",
  oculusID = "oculusID",
  playstationID = "playstationID",
  numUserGames = "numUserGames",
  type = "type",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableGamesAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableGamesAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchableGamesAggregateField {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  igdbID = "igdbID",
  title = "title",
  releaseDate = "releaseDate",
  series = "series",
  genre = "genre",
  theme = "theme",
  coverID = "coverID",
  backgroundID = "backgroundID",
  steamID = "steamID",
  microsoftID = "microsoftID",
  xboxMarketplaceID = "xboxMarketplaceID",
  gogID = "gogID",
  egsID = "egsID",
  twitchID = "twitchID",
  oculusID = "oculusID",
  playstationID = "playstationID",
  numUserGames = "numUserGames",
  type = "type",
}


export type SearchableGamesConnection = {
  __typename: "SearchableGamesConnection",
  items:  Array<Games | null >,
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

export type ModelUserGamesFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  usersID?: ModelIDInput | null,
  gamesID?: ModelIDInput | null,
  and?: Array< ModelUserGamesFilterInput | null > | null,
  or?: Array< ModelUserGamesFilterInput | null > | null,
  not?: ModelUserGamesFilterInput | null,
};

export type ModelNotificationsFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  code?: ModelIntInput | null,
  payload?: ModelStringInput | null,
  postsID?: ModelIDInput | null,
  and?: Array< ModelNotificationsFilterInput | null > | null,
  or?: Array< ModelNotificationsFilterInput | null > | null,
  not?: ModelNotificationsFilterInput | null,
};

export type ModelNotificationsByPostsCompositeKeyConditionInput = {
  eq?: ModelNotificationsByPostsCompositeKeyInput | null,
  le?: ModelNotificationsByPostsCompositeKeyInput | null,
  lt?: ModelNotificationsByPostsCompositeKeyInput | null,
  ge?: ModelNotificationsByPostsCompositeKeyInput | null,
  gt?: ModelNotificationsByPostsCompositeKeyInput | null,
  between?: Array< ModelNotificationsByPostsCompositeKeyInput | null > | null,
  beginsWith?: ModelNotificationsByPostsCompositeKeyInput | null,
};

export type ModelNotificationsByPostsCompositeKeyInput = {
  code?: number | null,
  createdAt?: string | null,
};

export type ModelUserNotificationsFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  notificationsID?: ModelIDInput | null,
  usersID?: ModelIDInput | null,
  and?: Array< ModelUserNotificationsFilterInput | null > | null,
  or?: Array< ModelUserNotificationsFilterInput | null > | null,
  not?: ModelUserNotificationsFilterInput | null,
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

export type ModelUserRelationshipsFilterInput = {
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  senderID?: ModelIDInput | null,
  receiverID?: ModelIDInput | null,
  and?: Array< ModelUserRelationshipsFilterInput | null > | null,
  or?: Array< ModelUserRelationshipsFilterInput | null > | null,
  not?: ModelUserRelationshipsFilterInput | null,
};

export type ModelPostsFilterInput = {
  id?: ModelIDInput | null,
  aspectratio?: ModelFloatInput | null,
  cognitosub?: ModelStringInput | null,
  contentdate?: ModelStringInput | null,
  contentkey?: ModelStringInput | null,
  contentlastupdated?: ModelStringInput | null,
  contenttype?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  deleteddate?: ModelStringInput | null,
  posttext?: ModelStringInput | null,
  publicpost?: ModelBooleanInput | null,
  publicpostdate?: ModelStringInput | null,
  sizeinbytes?: ModelIntInput | null,
  thumbnailkey?: ModelStringInput | null,
  type?: ModelStringInput | null,
  usersID?: ModelIDInput | null,
  gamesID?: ModelIDInput | null,
  and?: Array< ModelPostsFilterInput | null > | null,
  or?: Array< ModelPostsFilterInput | null > | null,
  not?: ModelPostsFilterInput | null,
};

export type ModelPostsPostsByUserGamesCompositeKeyConditionInput = {
  eq?: ModelPostsPostsByUserGamesCompositeKeyInput | null,
  le?: ModelPostsPostsByUserGamesCompositeKeyInput | null,
  lt?: ModelPostsPostsByUserGamesCompositeKeyInput | null,
  ge?: ModelPostsPostsByUserGamesCompositeKeyInput | null,
  gt?: ModelPostsPostsByUserGamesCompositeKeyInput | null,
  between?: Array< ModelPostsPostsByUserGamesCompositeKeyInput | null > | null,
  beginsWith?: ModelPostsPostsByUserGamesCompositeKeyInput | null,
};

export type ModelPostsPostsByUserGamesCompositeKeyInput = {
  gamesID?: string | null,
  contentdate?: string | null,
};

export type SearchablePostsFilterInput = {
  id?: SearchableIDFilterInput | null,
  aspectratio?: SearchableFloatFilterInput | null,
  cognitosub?: SearchableStringFilterInput | null,
  contentdate?: SearchableStringFilterInput | null,
  contentkey?: SearchableStringFilterInput | null,
  contentlastupdated?: SearchableStringFilterInput | null,
  contenttype?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  deleteddate?: SearchableStringFilterInput | null,
  posttext?: SearchableStringFilterInput | null,
  publicpost?: SearchableBooleanFilterInput | null,
  publicpostdate?: SearchableStringFilterInput | null,
  sizeinbytes?: SearchableIntFilterInput | null,
  thumbnailkey?: SearchableStringFilterInput | null,
  type?: SearchableStringFilterInput | null,
  usersID?: SearchableIDFilterInput | null,
  gamesID?: SearchableIDFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchablePostsFilterInput | null > | null,
  or?: Array< SearchablePostsFilterInput | null > | null,
  not?: SearchablePostsFilterInput | null,
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

export type SearchableBooleanFilterInput = {
  eq?: boolean | null,
  ne?: boolean | null,
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
  contentlastupdated = "contentlastupdated",
  contenttype = "contenttype",
  createdAt = "createdAt",
  deleteddate = "deleteddate",
  posttext = "posttext",
  publicpost = "publicpost",
  publicpostdate = "publicpostdate",
  sizeinbytes = "sizeinbytes",
  thumbnailkey = "thumbnailkey",
  type = "type",
  usersID = "usersID",
  gamesID = "gamesID",
  updatedAt = "updatedAt",
}


export type SearchablePostsAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchablePostsAggregateField,
};

export enum SearchablePostsAggregateField {
  id = "id",
  aspectratio = "aspectratio",
  cognitosub = "cognitosub",
  contentdate = "contentdate",
  contentkey = "contentkey",
  contentlastupdated = "contentlastupdated",
  contenttype = "contenttype",
  createdAt = "createdAt",
  deleteddate = "deleteddate",
  posttext = "posttext",
  publicpost = "publicpost",
  publicpostdate = "publicpostdate",
  sizeinbytes = "sizeinbytes",
  thumbnailkey = "thumbnailkey",
  type = "type",
  usersID = "usersID",
  gamesID = "gamesID",
  updatedAt = "updatedAt",
}


export type SearchablePostsConnection = {
  __typename: "SearchablePostsConnection",
  items:  Array<Posts | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelUsersFilterInput = {
  id?: ModelIDInput | null,
  acceptedtos?: ModelBooleanInput | null,
  addedcount?: ModelIntInput | null,
  addedmecount?: ModelIntInput | null,
  birthday?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  cognitosub?: ModelStringInput | null,
  disablednotifications?: ModelStringInput | null,
  displayname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  emailconfirmed?: ModelBooleanInput | null,
  firstvaultupload?: ModelBooleanInput | null,
  fullyauthenticated?: ModelBooleanInput | null,
  fullyonboarded?: ModelBooleanInput | null,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGlobalDataMutationVariables = {
  input: CreateGlobalDataInput,
  condition?: ModelGlobalDataConditionInput | null,
};

export type CreateGlobalDataMutation = {
  createGlobalData?:  {
    __typename: "GlobalData",
    id: string,
    createdAt: string,
    usecase?: string | null,
    key?: string | null,
    strA?: string | null,
    strB?: string | null,
    numA?: number | null,
    numB?: number | null,
    updatedAt: string,
  } | null,
};

export type UpdateGlobalDataMutationVariables = {
  input: UpdateGlobalDataInput,
  condition?: ModelGlobalDataConditionInput | null,
};

export type UpdateGlobalDataMutation = {
  updateGlobalData?:  {
    __typename: "GlobalData",
    id: string,
    createdAt: string,
    usecase?: string | null,
    key?: string | null,
    strA?: string | null,
    strB?: string | null,
    numA?: number | null,
    numB?: number | null,
    updatedAt: string,
  } | null,
};

export type DeleteGlobalDataMutationVariables = {
  input: DeleteGlobalDataInput,
  condition?: ModelGlobalDataConditionInput | null,
};

export type DeleteGlobalDataMutation = {
  deleteGlobalData?:  {
    __typename: "GlobalData",
    id: string,
    createdAt: string,
    usecase?: string | null,
    key?: string | null,
    strA?: string | null,
    strB?: string | null,
    numA?: number | null,
    numB?: number | null,
    updatedAt: string,
  } | null,
};

export type CreateGamesMutationVariables = {
  input: CreateGamesInput,
  condition?: ModelGamesConditionInput | null,
};

export type CreateGamesMutation = {
  createGames?:  {
    __typename: "Games",
    id: string,
    createdAt: string,
    updatedAt?: string | null,
    igdbID?: number | null,
    title?: string | null,
    releaseDate?: string | null,
    series?: string | null,
    genre?: string | null,
    theme?: string | null,
    coverID?: string | null,
    backgroundID?: string | null,
    steamID?: string | null,
    microsoftID?: string | null,
    xboxMarketplaceID?: string | null,
    gogID?: string | null,
    egsID?: string | null,
    twitchID?: string | null,
    oculusID?: string | null,
    playstationID?: string | null,
    numUserGames?: number | null,
    type?: string | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateGamesMutationVariables = {
  input: UpdateGamesInput,
  condition?: ModelGamesConditionInput | null,
};

export type UpdateGamesMutation = {
  updateGames?:  {
    __typename: "Games",
    id: string,
    createdAt: string,
    updatedAt?: string | null,
    igdbID?: number | null,
    title?: string | null,
    releaseDate?: string | null,
    series?: string | null,
    genre?: string | null,
    theme?: string | null,
    coverID?: string | null,
    backgroundID?: string | null,
    steamID?: string | null,
    microsoftID?: string | null,
    xboxMarketplaceID?: string | null,
    gogID?: string | null,
    egsID?: string | null,
    twitchID?: string | null,
    oculusID?: string | null,
    playstationID?: string | null,
    numUserGames?: number | null,
    type?: string | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteGamesMutationVariables = {
  input: DeleteGamesInput,
  condition?: ModelGamesConditionInput | null,
};

export type DeleteGamesMutation = {
  deleteGames?:  {
    __typename: "Games",
    id: string,
    createdAt: string,
    updatedAt?: string | null,
    igdbID?: number | null,
    title?: string | null,
    releaseDate?: string | null,
    series?: string | null,
    genre?: string | null,
    theme?: string | null,
    coverID?: string | null,
    backgroundID?: string | null,
    steamID?: string | null,
    microsoftID?: string | null,
    xboxMarketplaceID?: string | null,
    gogID?: string | null,
    egsID?: string | null,
    twitchID?: string | null,
    oculusID?: string | null,
    playstationID?: string | null,
    numUserGames?: number | null,
    type?: string | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateUserGamesMutationVariables = {
  input: CreateUserGamesInput,
  condition?: ModelUserGamesConditionInput | null,
};

export type CreateUserGamesMutation = {
  createUserGames?:  {
    __typename: "UserGames",
    id: string,
    createdAt: string,
    usersID: string,
    gamesID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserGamesMutationVariables = {
  input: UpdateUserGamesInput,
  condition?: ModelUserGamesConditionInput | null,
};

export type UpdateUserGamesMutation = {
  updateUserGames?:  {
    __typename: "UserGames",
    id: string,
    createdAt: string,
    usersID: string,
    gamesID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserGamesMutationVariables = {
  input: DeleteUserGamesInput,
  condition?: ModelUserGamesConditionInput | null,
};

export type DeleteUserGamesMutation = {
  deleteUserGames?:  {
    __typename: "UserGames",
    id: string,
    createdAt: string,
    usersID: string,
    gamesID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateNotificationsMutationVariables = {
  input: CreateNotificationsInput,
  condition?: ModelNotificationsConditionInput | null,
};

export type CreateNotificationsMutation = {
  createNotifications?:  {
    __typename: "Notifications",
    id: string,
    createdAt: string,
    code?: number | null,
    payload?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null,
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateNotificationsMutationVariables = {
  input: UpdateNotificationsInput,
  condition?: ModelNotificationsConditionInput | null,
};

export type UpdateNotificationsMutation = {
  updateNotifications?:  {
    __typename: "Notifications",
    id: string,
    createdAt: string,
    code?: number | null,
    payload?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null,
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteNotificationsMutationVariables = {
  input: DeleteNotificationsInput,
  condition?: ModelNotificationsConditionInput | null,
};

export type DeleteNotificationsMutation = {
  deleteNotifications?:  {
    __typename: "Notifications",
    id: string,
    createdAt: string,
    code?: number | null,
    payload?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null,
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateUserNotificationsMutationVariables = {
  input: CreateUserNotificationsInput,
  condition?: ModelUserNotificationsConditionInput | null,
};

export type CreateUserNotificationsMutation = {
  createUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    createdAt: string,
    notificationsID?: string | null,
    usersID?: string | null,
    Notifications?:  {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserNotificationsMutationVariables = {
  input: UpdateUserNotificationsInput,
  condition?: ModelUserNotificationsConditionInput | null,
};

export type UpdateUserNotificationsMutation = {
  updateUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    createdAt: string,
    notificationsID?: string | null,
    usersID?: string | null,
    Notifications?:  {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserNotificationsMutationVariables = {
  input: DeleteUserNotificationsInput,
  condition?: ModelUserNotificationsConditionInput | null,
};

export type DeleteUserNotificationsMutation = {
  deleteUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    createdAt: string,
    notificationsID?: string | null,
    usersID?: string | null,
    Notifications?:  {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
    senderID?: string | null,
    SenderUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    receiverID?: string | null,
    ReceiverUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
    senderID?: string | null,
    SenderUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    receiverID?: string | null,
    ReceiverUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
    senderID?: string | null,
    SenderUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    receiverID?: string | null,
    ReceiverUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
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
    contentlastupdated?: string | null,
    contenttype?: string | null,
    createdAt: string,
    deleteddate?: string | null,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    gamesID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationsConnection",
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
    contentlastupdated?: string | null,
    contenttype?: string | null,
    createdAt: string,
    deleteddate?: string | null,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    gamesID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationsConnection",
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
    contentlastupdated?: string | null,
    contenttype?: string | null,
    createdAt: string,
    deleteddate?: string | null,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    gamesID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationsConnection",
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
    updatedAt?: string | null,
    cognitosub?: string | null,
    disablednotifications?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    fullyonboarded?: boolean | null,
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
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
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
    SenderRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    ReceiverRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
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
    updatedAt?: string | null,
    cognitosub?: string | null,
    disablednotifications?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    fullyonboarded?: boolean | null,
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
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
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
    SenderRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    ReceiverRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
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
    updatedAt?: string | null,
    cognitosub?: string | null,
    disablednotifications?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    fullyonboarded?: boolean | null,
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
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
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
    SenderRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    ReceiverRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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

export type GetGlobalDataQueryVariables = {
  id: string,
};

export type GetGlobalDataQuery = {
  getGlobalData?:  {
    __typename: "GlobalData",
    id: string,
    createdAt: string,
    usecase?: string | null,
    key?: string | null,
    strA?: string | null,
    strB?: string | null,
    numA?: number | null,
    numB?: number | null,
    updatedAt: string,
  } | null,
};

export type ListGlobalDataQueryVariables = {
  filter?: ModelGlobalDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGlobalDataQuery = {
  listGlobalData?:  {
    __typename: "ModelGlobalDataConnection",
    items:  Array< {
      __typename: "GlobalData",
      id: string,
      createdAt: string,
      usecase?: string | null,
      key?: string | null,
      strA?: string | null,
      strB?: string | null,
      numA?: number | null,
      numB?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GDByUsecaseQueryVariables = {
  usecase: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGlobalDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GDByUsecaseQuery = {
  GDByUsecase?:  {
    __typename: "ModelGlobalDataConnection",
    items:  Array< {
      __typename: "GlobalData",
      id: string,
      createdAt: string,
      usecase?: string | null,
      key?: string | null,
      strA?: string | null,
      strB?: string | null,
      numA?: number | null,
      numB?: number | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGamesQueryVariables = {
  id: string,
};

export type GetGamesQuery = {
  getGames?:  {
    __typename: "Games",
    id: string,
    createdAt: string,
    updatedAt?: string | null,
    igdbID?: number | null,
    title?: string | null,
    releaseDate?: string | null,
    series?: string | null,
    genre?: string | null,
    theme?: string | null,
    coverID?: string | null,
    backgroundID?: string | null,
    steamID?: string | null,
    microsoftID?: string | null,
    xboxMarketplaceID?: string | null,
    gogID?: string | null,
    egsID?: string | null,
    twitchID?: string | null,
    oculusID?: string | null,
    playstationID?: string | null,
    numUserGames?: number | null,
    type?: string | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListGamesQueryVariables = {
  filter?: ModelGamesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGamesQuery = {
  listGames?:  {
    __typename: "ModelGamesConnection",
    items:  Array< {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GamesByTitleQueryVariables = {
  title: string,
  releaseDate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGamesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GamesByTitleQuery = {
  gamesByTitle?:  {
    __typename: "ModelGamesConnection",
    items:  Array< {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GamesByNumUserGamesQueryVariables = {
  type: string,
  numUserGames?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGamesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GamesByNumUserGamesQuery = {
  gamesByNumUserGames?:  {
    __typename: "ModelGamesConnection",
    items:  Array< {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchGamesQueryVariables = {
  filter?: SearchableGamesFilterInput | null,
  sort?: Array< SearchableGamesSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableGamesAggregationInput | null > | null,
};

export type SearchGamesQuery = {
  searchGames?:  {
    __typename: "SearchableGamesConnection",
    items:  Array< {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
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

export type GetUserGamesQueryVariables = {
  id: string,
};

export type GetUserGamesQuery = {
  getUserGames?:  {
    __typename: "UserGames",
    id: string,
    createdAt: string,
    usersID: string,
    gamesID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListUserGamesQueryVariables = {
  filter?: ModelUserGamesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserGamesQuery = {
  listUserGames?:  {
    __typename: "ModelUserGamesConnection",
    items:  Array< {
      __typename: "UserGames",
      id: string,
      createdAt: string,
      usersID: string,
      gamesID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserGamesByUsersQueryVariables = {
  usersID: string,
  gamesID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserGamesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserGamesByUsersQuery = {
  userGamesByUsers?:  {
    __typename: "ModelUserGamesConnection",
    items:  Array< {
      __typename: "UserGames",
      id: string,
      createdAt: string,
      usersID: string,
      gamesID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserGamesByGamesQueryVariables = {
  gamesID: string,
  usersID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserGamesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserGamesByGamesQuery = {
  userGamesByGames?:  {
    __typename: "ModelUserGamesConnection",
    items:  Array< {
      __typename: "UserGames",
      id: string,
      createdAt: string,
      usersID: string,
      gamesID: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationsQueryVariables = {
  id: string,
};

export type GetNotificationsQuery = {
  getNotifications?:  {
    __typename: "Notifications",
    id: string,
    createdAt: string,
    code?: number | null,
    payload?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null,
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationsConnection",
    items:  Array< {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotificationsByCodeDateQueryVariables = {
  postsID: string,
  codeCreatedAt?: ModelNotificationsByPostsCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByCodeDateQuery = {
  notificationsByCodeDate?:  {
    __typename: "ModelNotificationsConnection",
    items:  Array< {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotificationsByCodeQueryVariables = {
  postsID: string,
  code?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByCodeQuery = {
  notificationsByCode?:  {
    __typename: "ModelNotificationsConnection",
    items:  Array< {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotificationsByPostsIDQueryVariables = {
  postsID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByPostsIDQuery = {
  notificationsByPostsID?:  {
    __typename: "ModelNotificationsConnection",
    items:  Array< {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserNotificationsQueryVariables = {
  id: string,
};

export type GetUserNotificationsQuery = {
  getUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    createdAt: string,
    notificationsID?: string | null,
    usersID?: string | null,
    Notifications?:  {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListUserNotificationsQueryVariables = {
  filter?: ModelUserNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserNotificationsQuery = {
  listUserNotifications?:  {
    __typename: "ModelUserNotificationsConnection",
    items:  Array< {
      __typename: "UserNotifications",
      id: string,
      createdAt: string,
      notificationsID?: string | null,
      usersID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserNotificationsByNotificationsQueryVariables = {
  notificationsID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserNotificationsByNotificationsQuery = {
  userNotificationsByNotifications?:  {
    __typename: "ModelUserNotificationsConnection",
    items:  Array< {
      __typename: "UserNotifications",
      id: string,
      createdAt: string,
      notificationsID?: string | null,
      usersID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserNotificationsByUsersQueryVariables = {
  usersID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserNotificationsByUsersQuery = {
  userNotificationsByUsers?:  {
    __typename: "ModelUserNotificationsConnection",
    items:  Array< {
      __typename: "UserNotifications",
      id: string,
      createdAt: string,
      notificationsID?: string | null,
      usersID?: string | null,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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

export type CommentsByUsersIDQueryVariables = {
  usersID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByUsersIDQuery = {
  commentsByUsersID?:  {
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

export type GetUserRelationshipsQueryVariables = {
  id: string,
};

export type GetUserRelationshipsQuery = {
  getUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    senderID?: string | null,
    SenderUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    receiverID?: string | null,
    ReceiverUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      senderID?: string | null,
      receiverID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SenderRelationshipsByDateQueryVariables = {
  senderID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SenderRelationshipsByDateQuery = {
  senderRelationshipsByDate?:  {
    __typename: "ModelUserRelationshipsConnection",
    items:  Array< {
      __typename: "UserRelationships",
      id: string,
      createdAt: string,
      senderID?: string | null,
      receiverID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AddedByCurrentUserQueryVariables = {
  senderID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AddedByCurrentUserQuery = {
  addedByCurrentUser?:  {
    __typename: "ModelUserRelationshipsConnection",
    items:  Array< {
      __typename: "UserRelationships",
      id: string,
      createdAt: string,
      senderID?: string | null,
      receiverID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CheckAddedUserQueryVariables = {
  senderID: string,
  receiverID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CheckAddedUserQuery = {
  checkAddedUser?:  {
    __typename: "ModelUserRelationshipsConnection",
    items:  Array< {
      __typename: "UserRelationships",
      id: string,
      createdAt: string,
      senderID?: string | null,
      receiverID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReceiverRelationshipsByDateQueryVariables = {
  receiverID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserRelationshipsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReceiverRelationshipsByDateQuery = {
  receiverRelationshipsByDate?:  {
    __typename: "ModelUserRelationshipsConnection",
    items:  Array< {
      __typename: "UserRelationships",
      id: string,
      createdAt: string,
      senderID?: string | null,
      receiverID?: string | null,
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
    contentlastupdated?: string | null,
    contenttype?: string | null,
    createdAt: string,
    deleteddate?: string | null,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    gamesID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationsConnection",
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByUsersQueryVariables = {
  usersID: string,
  contentdate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByUsersQuery = {
  postsByUsers?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByDeletedDateQueryVariables = {
  usersID: string,
  deleteddate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByDeletedDateQuery = {
  postsByDeletedDate?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByUserGamesQueryVariables = {
  usersID: string,
  gamesIDContentdate?: ModelPostsPostsByUserGamesCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByUserGamesQuery = {
  postsByUserGames?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByGamesQueryVariables = {
  gamesID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByGamesQuery = {
  postsByGames?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PublicPostsByGamesQueryVariables = {
  gamesID: string,
  publicpostdate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PublicPostsByGamesQuery = {
  publicPostsByGames?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
    updatedAt?: string | null,
    cognitosub?: string | null,
    disablednotifications?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    fullyonboarded?: boolean | null,
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
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
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
    SenderRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    ReceiverRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGlobalDataSubscription = {
  onCreateGlobalData?:  {
    __typename: "GlobalData",
    id: string,
    createdAt: string,
    usecase?: string | null,
    key?: string | null,
    strA?: string | null,
    strB?: string | null,
    numA?: number | null,
    numB?: number | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateGlobalDataSubscription = {
  onUpdateGlobalData?:  {
    __typename: "GlobalData",
    id: string,
    createdAt: string,
    usecase?: string | null,
    key?: string | null,
    strA?: string | null,
    strB?: string | null,
    numA?: number | null,
    numB?: number | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteGlobalDataSubscription = {
  onDeleteGlobalData?:  {
    __typename: "GlobalData",
    id: string,
    createdAt: string,
    usecase?: string | null,
    key?: string | null,
    strA?: string | null,
    strB?: string | null,
    numA?: number | null,
    numB?: number | null,
    updatedAt: string,
  } | null,
};

export type OnCreateGamesSubscription = {
  onCreateGames?:  {
    __typename: "Games",
    id: string,
    createdAt: string,
    updatedAt?: string | null,
    igdbID?: number | null,
    title?: string | null,
    releaseDate?: string | null,
    series?: string | null,
    genre?: string | null,
    theme?: string | null,
    coverID?: string | null,
    backgroundID?: string | null,
    steamID?: string | null,
    microsoftID?: string | null,
    xboxMarketplaceID?: string | null,
    gogID?: string | null,
    egsID?: string | null,
    twitchID?: string | null,
    oculusID?: string | null,
    playstationID?: string | null,
    numUserGames?: number | null,
    type?: string | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateGamesSubscription = {
  onUpdateGames?:  {
    __typename: "Games",
    id: string,
    createdAt: string,
    updatedAt?: string | null,
    igdbID?: number | null,
    title?: string | null,
    releaseDate?: string | null,
    series?: string | null,
    genre?: string | null,
    theme?: string | null,
    coverID?: string | null,
    backgroundID?: string | null,
    steamID?: string | null,
    microsoftID?: string | null,
    xboxMarketplaceID?: string | null,
    gogID?: string | null,
    egsID?: string | null,
    twitchID?: string | null,
    oculusID?: string | null,
    playstationID?: string | null,
    numUserGames?: number | null,
    type?: string | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteGamesSubscription = {
  onDeleteGames?:  {
    __typename: "Games",
    id: string,
    createdAt: string,
    updatedAt?: string | null,
    igdbID?: number | null,
    title?: string | null,
    releaseDate?: string | null,
    series?: string | null,
    genre?: string | null,
    theme?: string | null,
    coverID?: string | null,
    backgroundID?: string | null,
    steamID?: string | null,
    microsoftID?: string | null,
    xboxMarketplaceID?: string | null,
    gogID?: string | null,
    egsID?: string | null,
    twitchID?: string | null,
    oculusID?: string | null,
    playstationID?: string | null,
    numUserGames?: number | null,
    type?: string | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
      nextToken?: string | null,
    } | null,
    Posts?:  {
      __typename: "ModelPostsConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateUserGamesSubscription = {
  onCreateUserGames?:  {
    __typename: "UserGames",
    id: string,
    createdAt: string,
    usersID: string,
    gamesID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserGamesSubscription = {
  onUpdateUserGames?:  {
    __typename: "UserGames",
    id: string,
    createdAt: string,
    usersID: string,
    gamesID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserGamesSubscription = {
  onDeleteUserGames?:  {
    __typename: "UserGames",
    id: string,
    createdAt: string,
    usersID: string,
    gamesID: string,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateNotificationsSubscription = {
  onCreateNotifications?:  {
    __typename: "Notifications",
    id: string,
    createdAt: string,
    code?: number | null,
    payload?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null,
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotificationsSubscription = {
  onUpdateNotifications?:  {
    __typename: "Notifications",
    id: string,
    createdAt: string,
    code?: number | null,
    payload?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null,
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotificationsSubscription = {
  onDeleteNotifications?:  {
    __typename: "Notifications",
    id: string,
    createdAt: string,
    code?: number | null,
    payload?: string | null,
    postsID?: string | null,
    Posts?:  {
      __typename: "Posts",
      id: string,
      aspectratio?: number | null,
      cognitosub: string,
      contentdate?: string | null,
      contentkey?: string | null,
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
      updatedAt: string,
    } | null,
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateUserNotificationsSubscription = {
  onCreateUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    createdAt: string,
    notificationsID?: string | null,
    usersID?: string | null,
    Notifications?:  {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserNotificationsSubscription = {
  onUpdateUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    createdAt: string,
    notificationsID?: string | null,
    usersID?: string | null,
    Notifications?:  {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserNotificationsSubscription = {
  onDeleteUserNotifications?:  {
    __typename: "UserNotifications",
    id: string,
    createdAt: string,
    notificationsID?: string | null,
    usersID?: string | null,
    Notifications?:  {
      __typename: "Notifications",
      id: string,
      createdAt: string,
      code?: number | null,
      payload?: string | null,
      postsID?: string | null,
      updatedAt: string,
    } | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
      contentlastupdated?: string | null,
      contenttype?: string | null,
      createdAt: string,
      deleteddate?: string | null,
      posttext?: string | null,
      publicpost?: boolean | null,
      publicpostdate?: string | null,
      sizeinbytes?: number | null,
      thumbnailkey?: string | null,
      type?: string | null,
      usersID: string,
      gamesID?: string | null,
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
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
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
    senderID?: string | null,
    SenderUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    receiverID?: string | null,
    ReceiverUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserRelationshipsSubscription = {
  onUpdateUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    senderID?: string | null,
    SenderUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    receiverID?: string | null,
    ReceiverUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserRelationshipsSubscription = {
  onDeleteUserRelationships?:  {
    __typename: "UserRelationships",
    id: string,
    createdAt: string,
    senderID?: string | null,
    SenderUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    receiverID?: string | null,
    ReceiverUser?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
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
    contentlastupdated?: string | null,
    contenttype?: string | null,
    createdAt: string,
    deleteddate?: string | null,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    gamesID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationsConnection",
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
    contentlastupdated?: string | null,
    contenttype?: string | null,
    createdAt: string,
    deleteddate?: string | null,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    gamesID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationsConnection",
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
    contentlastupdated?: string | null,
    contenttype?: string | null,
    createdAt: string,
    deleteddate?: string | null,
    posttext?: string | null,
    publicpost?: boolean | null,
    publicpostdate?: string | null,
    sizeinbytes?: number | null,
    thumbnailkey?: string | null,
    type?: string | null,
    usersID: string,
    gamesID?: string | null,
    Users?:  {
      __typename: "Users",
      id: string,
      acceptedtos?: boolean | null,
      addedcount?: number | null,
      addedmecount?: number | null,
      birthday?: string | null,
      updatedAt?: string | null,
      cognitosub?: string | null,
      disablednotifications?: string | null,
      displayname?: string | null,
      email?: string | null,
      emailconfirmed?: boolean | null,
      firstvaultupload?: boolean | null,
      fullyauthenticated?: boolean | null,
      fullyonboarded?: boolean | null,
      gamertag?: string | null,
      mostrecentpublicpost?: string | null,
      pfp?: string | null,
      setpassword?: boolean | null,
      storagesizeinbytes?: number | null,
      type?: string | null,
      createdAt: string,
    } | null,
    Games?:  {
      __typename: "Games",
      id: string,
      createdAt: string,
      updatedAt?: string | null,
      igdbID?: number | null,
      title?: string | null,
      releaseDate?: string | null,
      series?: string | null,
      genre?: string | null,
      theme?: string | null,
      coverID?: string | null,
      backgroundID?: string | null,
      steamID?: string | null,
      microsoftID?: string | null,
      xboxMarketplaceID?: string | null,
      gogID?: string | null,
      egsID?: string | null,
      twitchID?: string | null,
      oculusID?: string | null,
      playstationID?: string | null,
      numUserGames?: number | null,
      type?: string | null,
    } | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
    } | null,
    Notifications?:  {
      __typename: "ModelNotificationsConnection",
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
    updatedAt?: string | null,
    cognitosub?: string | null,
    disablednotifications?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    fullyonboarded?: boolean | null,
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
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
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
    SenderRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    ReceiverRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
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
    updatedAt?: string | null,
    cognitosub?: string | null,
    disablednotifications?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    fullyonboarded?: boolean | null,
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
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
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
    SenderRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    ReceiverRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
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
    updatedAt?: string | null,
    cognitosub?: string | null,
    disablednotifications?: string | null,
    displayname?: string | null,
    email?: string | null,
    emailconfirmed?: boolean | null,
    firstvaultupload?: boolean | null,
    fullyauthenticated?: boolean | null,
    fullyonboarded?: boolean | null,
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
    UserNotifications?:  {
      __typename: "ModelUserNotificationsConnection",
      nextToken?: string | null,
    } | null,
    UserGames?:  {
      __typename: "ModelUserGamesConnection",
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
    SenderRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    ReceiverRelationships?:  {
      __typename: "ModelUserRelationshipsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};
