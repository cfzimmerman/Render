/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPostViewTracker = /* GraphQL */ `
  query GetPostViewTracker($id: ID!) {
    getPostViewTracker(id: $id) {
      id
      postsID
      Posts {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      viewerID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPostViewTrackers = /* GraphQL */ `
  query ListPostViewTrackers(
    $filter: ModelPostViewTrackerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostViewTrackers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postsID
        viewerID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postViewByPostID = /* GraphQL */ `
  query PostViewByPostID(
    $postsID: ID!
    $viewerID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostViewTrackerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postViewByPostID(
      postsID: $postsID
      viewerID: $viewerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postsID
        viewerID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGlobalData = /* GraphQL */ `
  query GetGlobalData($id: ID!) {
    getGlobalData(id: $id) {
      id
      createdAt
      usecase
      key
      strA
      strB
      numA
      numB
      updatedAt
    }
  }
`;
export const listGlobalData = /* GraphQL */ `
  query ListGlobalData(
    $filter: ModelGlobalDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGlobalData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        usecase
        key
        strA
        strB
        numA
        numB
        updatedAt
      }
      nextToken
    }
  }
`;
export const gDByUsecase = /* GraphQL */ `
  query GDByUsecase(
    $usecase: String!
    $sortDirection: ModelSortDirection
    $filter: ModelGlobalDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    GDByUsecase(
      usecase: $usecase
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        usecase
        key
        strA
        strB
        numA
        numB
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGames = /* GraphQL */ `
  query GetGames($id: ID!) {
    getGames(id: $id) {
      id
      createdAt
      updatedAt
      igdbID
      title
      releaseDate
      series
      genre
      theme
      coverID
      backgroundID
      steamID
      microsoftID
      xboxMarketplaceID
      gogID
      egsID
      twitchID
      oculusID
      playstationID
      numUserGames
      type
      UserGames {
        nextToken
      }
      Posts {
        nextToken
      }
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        igdbID
        title
        releaseDate
        series
        genre
        theme
        coverID
        backgroundID
        steamID
        microsoftID
        xboxMarketplaceID
        gogID
        egsID
        twitchID
        oculusID
        playstationID
        numUserGames
        type
      }
      nextToken
    }
  }
`;
export const gamesByTitle = /* GraphQL */ `
  query GamesByTitle(
    $title: String!
    $releaseDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gamesByTitle(
      title: $title
      releaseDate: $releaseDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
        igdbID
        title
        releaseDate
        series
        genre
        theme
        coverID
        backgroundID
        steamID
        microsoftID
        xboxMarketplaceID
        gogID
        egsID
        twitchID
        oculusID
        playstationID
        numUserGames
        type
      }
      nextToken
    }
  }
`;
export const gamesByNumUserGames = /* GraphQL */ `
  query GamesByNumUserGames(
    $type: String!
    $numUserGames: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gamesByNumUserGames(
      type: $type
      numUserGames: $numUserGames
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
        igdbID
        title
        releaseDate
        series
        genre
        theme
        coverID
        backgroundID
        steamID
        microsoftID
        xboxMarketplaceID
        gogID
        egsID
        twitchID
        oculusID
        playstationID
        numUserGames
        type
      }
      nextToken
    }
  }
`;
export const searchGames = /* GraphQL */ `
  query SearchGames(
    $filter: SearchableGamesFilterInput
    $sort: [SearchableGamesSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableGamesAggregationInput]
  ) {
    searchGames(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        createdAt
        updatedAt
        igdbID
        title
        releaseDate
        series
        genre
        theme
        coverID
        backgroundID
        steamID
        microsoftID
        xboxMarketplaceID
        gogID
        egsID
        twitchID
        oculusID
        playstationID
        numUserGames
        type
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getUserGames = /* GraphQL */ `
  query GetUserGames($id: ID!) {
    getUserGames(id: $id) {
      id
      createdAt
      usersID
      gamesID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      Games {
        id
        createdAt
        updatedAt
        igdbID
        title
        releaseDate
        series
        genre
        theme
        coverID
        backgroundID
        steamID
        microsoftID
        xboxMarketplaceID
        gogID
        egsID
        twitchID
        oculusID
        playstationID
        numUserGames
        type
      }
      updatedAt
    }
  }
`;
export const listUserGames = /* GraphQL */ `
  query ListUserGames(
    $filter: ModelUserGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const userGamesByUsers = /* GraphQL */ `
  query UserGamesByUsers(
    $usersID: ID!
    $gamesID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGamesByUsers(
      usersID: $usersID
      gamesID: $gamesID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const userGamesByGames = /* GraphQL */ `
  query UserGamesByGames(
    $gamesID: ID!
    $usersID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userGamesByGames(
      gamesID: $gamesID
      usersID: $usersID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotifications = /* GraphQL */ `
  query GetNotifications($id: ID!) {
    getNotifications(id: $id) {
      id
      createdAt
      code
      payload
      postsID
      Posts {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      UserNotifications {
        nextToken
      }
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        code
        payload
        postsID
        updatedAt
      }
      nextToken
    }
  }
`;
export const notificationsByCodeDate = /* GraphQL */ `
  query NotificationsByCodeDate(
    $postsID: ID!
    $codeCreatedAt: ModelNotificationsByPostsCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByCodeDate(
      postsID: $postsID
      codeCreatedAt: $codeCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        code
        payload
        postsID
        updatedAt
      }
      nextToken
    }
  }
`;
export const notificationsByCode = /* GraphQL */ `
  query NotificationsByCode(
    $postsID: ID!
    $code: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByCode(
      postsID: $postsID
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        code
        payload
        postsID
        updatedAt
      }
      nextToken
    }
  }
`;
export const notificationsByPostsID = /* GraphQL */ `
  query NotificationsByPostsID(
    $postsID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByPostsID(
      postsID: $postsID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        code
        payload
        postsID
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserNotifications = /* GraphQL */ `
  query GetUserNotifications($id: ID!) {
    getUserNotifications(id: $id) {
      id
      createdAt
      notificationsID
      usersID
      Notifications {
        id
        createdAt
        code
        payload
        postsID
        updatedAt
      }
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      updatedAt
    }
  }
`;
export const listUserNotifications = /* GraphQL */ `
  query ListUserNotifications(
    $filter: ModelUserNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        notificationsID
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const userNotificationsByNotifications = /* GraphQL */ `
  query UserNotificationsByNotifications(
    $notificationsID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userNotificationsByNotifications(
      notificationsID: $notificationsID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        notificationsID
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const userNotificationsByUsers = /* GraphQL */ `
  query UserNotificationsByUsers(
    $usersID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userNotificationsByUsers(
      usersID: $usersID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        notificationsID
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComments = /* GraphQL */ `
  query GetComments($id: ID!) {
    getComments(id: $id) {
      id
      commenttext
      postsID
      Posts {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      usersID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        commenttext
        postsID
        usersID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByCreatedDate = /* GraphQL */ `
  query CommentsByCreatedDate(
    $postsID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByCreatedDate(
      postsID: $postsID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        commenttext
        postsID
        usersID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByUsersID = /* GraphQL */ `
  query CommentsByUsersID(
    $usersID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByUsersID(
      usersID: $usersID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        commenttext
        postsID
        usersID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserRelationships = /* GraphQL */ `
  query GetUserRelationships($id: ID!) {
    getUserRelationships(id: $id) {
      id
      createdAt
      senderID
      SenderUser {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      receiverID
      ReceiverUser {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      updatedAt
    }
  }
`;
export const listUserRelationships = /* GraphQL */ `
  query ListUserRelationships(
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserRelationships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        senderID
        receiverID
        updatedAt
      }
      nextToken
    }
  }
`;
export const senderRelationshipsByDate = /* GraphQL */ `
  query SenderRelationshipsByDate(
    $senderID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    senderRelationshipsByDate(
      senderID: $senderID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        senderID
        receiverID
        updatedAt
      }
      nextToken
    }
  }
`;
export const addedByCurrentUser = /* GraphQL */ `
  query AddedByCurrentUser(
    $senderID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    addedByCurrentUser(
      senderID: $senderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        senderID
        receiverID
        updatedAt
      }
      nextToken
    }
  }
`;
export const checkAddedUser = /* GraphQL */ `
  query CheckAddedUser(
    $senderID: ID!
    $receiverID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    checkAddedUser(
      senderID: $senderID
      receiverID: $receiverID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        senderID
        receiverID
        updatedAt
      }
      nextToken
    }
  }
`;
export const receiverRelationshipsByDate = /* GraphQL */ `
  query ReceiverRelationshipsByDate(
    $receiverID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    receiverRelationshipsByDate(
      receiverID: $receiverID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        senderID
        receiverID
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPosts = /* GraphQL */ `
  query GetPosts($id: ID!) {
    getPosts(id: $id) {
      id
      aspectratio
      cognitosub
      contentdate
      contentkey
      contentlastupdated
      contenttype
      createdAt
      deleteddate
      posttext
      publicpost
      publicpostdate
      sizeinbytes
      thumbnailkey
      type
      usersID
      gamesID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      Games {
        id
        createdAt
        updatedAt
        igdbID
        title
        releaseDate
        series
        genre
        theme
        coverID
        backgroundID
        steamID
        microsoftID
        xboxMarketplaceID
        gogID
        egsID
        twitchID
        oculusID
        playstationID
        numUserGames
        type
      }
      Comments {
        nextToken
      }
      Notifications {
        nextToken
      }
      PostViewTrackers {
        nextToken
      }
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByCreatedDate = /* GraphQL */ `
  query PostsByCreatedDate(
    $cognitosub: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByCreatedDate(
      cognitosub: $cognitosub
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByPostedDate = /* GraphQL */ `
  query PostsByPostedDate(
    $cognitosub: String!
    $publicpostdate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByPostedDate(
      cognitosub: $cognitosub
      publicpostdate: $publicpostdate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByContentDate = /* GraphQL */ `
  query PostsByContentDate(
    $cognitosub: String!
    $contentdate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByContentDate(
      cognitosub: $cognitosub
      contentdate: $contentdate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByContentKey = /* GraphQL */ `
  query PostsByContentKey(
    $contentkey: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByContentKey(
      contentkey: $contentkey
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByPublicDate = /* GraphQL */ `
  query PostsByPublicDate(
    $type: String!
    $publicpostdate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByPublicDate(
      type: $type
      publicpostdate: $publicpostdate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByUsers = /* GraphQL */ `
  query PostsByUsers(
    $usersID: ID!
    $contentdate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUsers(
      usersID: $usersID
      contentdate: $contentdate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByDeletedDate = /* GraphQL */ `
  query PostsByDeletedDate(
    $usersID: ID!
    $deleteddate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByDeletedDate(
      usersID: $usersID
      deleteddate: $deleteddate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByUserGames = /* GraphQL */ `
  query PostsByUserGames(
    $usersID: ID!
    $gamesIDContentdate: ModelPostsPostsByUserGamesCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUserGames(
      usersID: $usersID
      gamesIDContentdate: $gamesIDContentdate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByGames = /* GraphQL */ `
  query PostsByGames(
    $gamesID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByGames(
      gamesID: $gamesID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const publicPostsByGames = /* GraphQL */ `
  query PublicPostsByGames(
    $gamesID: ID!
    $publicpostdate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    publicPostsByGames(
      gamesID: $gamesID
      publicpostdate: $publicpostdate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchPosts = /* GraphQL */ `
  query SearchPosts(
    $filter: SearchablePostsFilterInput
    $sort: [SearchablePostsSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablePostsAggregationInput]
  ) {
    searchPosts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contentlastupdated
        contenttype
        createdAt
        deleteddate
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        gamesID
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      acceptedtos
      addedcount
      addedmecount
      birthday
      updatedAt
      cognitosub
      disablednotifications
      displayname
      email
      emailconfirmed
      firstvaultupload
      fullyauthenticated
      fullyonboarded
      gamertag
      mostrecentpublicpost
      pfp
      setpassword
      storagesizeinbytes
      type
      Comments {
        nextToken
      }
      UserNotifications {
        nextToken
      }
      UserGames {
        nextToken
      }
      Posts {
        nextToken
      }
      PostViewTrackers {
        nextToken
      }
      SenderRelationships {
        nextToken
      }
      ReceiverRelationships {
        nextToken
      }
      createdAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      nextToken
    }
  }
`;
export const userByCognitosub = /* GraphQL */ `
  query UserByCognitosub(
    $cognitosub: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByCognitosub(
      cognitosub: $cognitosub
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      nextToken
    }
  }
`;
export const userByGamertag = /* GraphQL */ `
  query UserByGamertag(
    $gamertag: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByGamertag(
      gamertag: $gamertag
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      nextToken
    }
  }
`;
export const searchByGamertag = /* GraphQL */ `
  query SearchByGamertag(
    $type: String!
    $gamertag: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    searchByGamertag(
      type: $type
      gamertag: $gamertag
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        updatedAt
        cognitosub
        disablednotifications
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        fullyonboarded
        gamertag
        mostrecentpublicpost
        pfp
        setpassword
        storagesizeinbytes
        type
        createdAt
      }
      nextToken
    }
  }
`;
