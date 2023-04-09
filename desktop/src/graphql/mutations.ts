/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPostViewTracker = /* GraphQL */ `
  mutation CreatePostViewTracker(
    $input: CreatePostViewTrackerInput!
    $condition: ModelPostViewTrackerConditionInput
  ) {
    createPostViewTracker(input: $input, condition: $condition) {
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
export const updatePostViewTracker = /* GraphQL */ `
  mutation UpdatePostViewTracker(
    $input: UpdatePostViewTrackerInput!
    $condition: ModelPostViewTrackerConditionInput
  ) {
    updatePostViewTracker(input: $input, condition: $condition) {
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
export const deletePostViewTracker = /* GraphQL */ `
  mutation DeletePostViewTracker(
    $input: DeletePostViewTrackerInput!
    $condition: ModelPostViewTrackerConditionInput
  ) {
    deletePostViewTracker(input: $input, condition: $condition) {
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
export const createGlobalData = /* GraphQL */ `
  mutation CreateGlobalData(
    $input: CreateGlobalDataInput!
    $condition: ModelGlobalDataConditionInput
  ) {
    createGlobalData(input: $input, condition: $condition) {
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
export const updateGlobalData = /* GraphQL */ `
  mutation UpdateGlobalData(
    $input: UpdateGlobalDataInput!
    $condition: ModelGlobalDataConditionInput
  ) {
    updateGlobalData(input: $input, condition: $condition) {
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
export const deleteGlobalData = /* GraphQL */ `
  mutation DeleteGlobalData(
    $input: DeleteGlobalDataInput!
    $condition: ModelGlobalDataConditionInput
  ) {
    deleteGlobalData(input: $input, condition: $condition) {
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
export const createGames = /* GraphQL */ `
  mutation CreateGames(
    $input: CreateGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    createGames(input: $input, condition: $condition) {
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
export const updateGames = /* GraphQL */ `
  mutation UpdateGames(
    $input: UpdateGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    updateGames(input: $input, condition: $condition) {
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
export const deleteGames = /* GraphQL */ `
  mutation DeleteGames(
    $input: DeleteGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    deleteGames(input: $input, condition: $condition) {
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
export const createUserGames = /* GraphQL */ `
  mutation CreateUserGames(
    $input: CreateUserGamesInput!
    $condition: ModelUserGamesConditionInput
  ) {
    createUserGames(input: $input, condition: $condition) {
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
export const updateUserGames = /* GraphQL */ `
  mutation UpdateUserGames(
    $input: UpdateUserGamesInput!
    $condition: ModelUserGamesConditionInput
  ) {
    updateUserGames(input: $input, condition: $condition) {
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
export const deleteUserGames = /* GraphQL */ `
  mutation DeleteUserGames(
    $input: DeleteUserGamesInput!
    $condition: ModelUserGamesConditionInput
  ) {
    deleteUserGames(input: $input, condition: $condition) {
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
export const createNotifications = /* GraphQL */ `
  mutation CreateNotifications(
    $input: CreateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    createNotifications(input: $input, condition: $condition) {
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
export const updateNotifications = /* GraphQL */ `
  mutation UpdateNotifications(
    $input: UpdateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    updateNotifications(input: $input, condition: $condition) {
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
export const deleteNotifications = /* GraphQL */ `
  mutation DeleteNotifications(
    $input: DeleteNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    deleteNotifications(input: $input, condition: $condition) {
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
export const createUserNotifications = /* GraphQL */ `
  mutation CreateUserNotifications(
    $input: CreateUserNotificationsInput!
    $condition: ModelUserNotificationsConditionInput
  ) {
    createUserNotifications(input: $input, condition: $condition) {
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
export const updateUserNotifications = /* GraphQL */ `
  mutation UpdateUserNotifications(
    $input: UpdateUserNotificationsInput!
    $condition: ModelUserNotificationsConditionInput
  ) {
    updateUserNotifications(input: $input, condition: $condition) {
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
export const deleteUserNotifications = /* GraphQL */ `
  mutation DeleteUserNotifications(
    $input: DeleteUserNotificationsInput!
    $condition: ModelUserNotificationsConditionInput
  ) {
    deleteUserNotifications(input: $input, condition: $condition) {
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
export const createComments = /* GraphQL */ `
  mutation CreateComments(
    $input: CreateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    createComments(input: $input, condition: $condition) {
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
export const updateComments = /* GraphQL */ `
  mutation UpdateComments(
    $input: UpdateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    updateComments(input: $input, condition: $condition) {
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
export const deleteComments = /* GraphQL */ `
  mutation DeleteComments(
    $input: DeleteCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    deleteComments(input: $input, condition: $condition) {
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
export const createUserRelationships = /* GraphQL */ `
  mutation CreateUserRelationships(
    $input: CreateUserRelationshipsInput!
    $condition: ModelUserRelationshipsConditionInput
  ) {
    createUserRelationships(input: $input, condition: $condition) {
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
export const updateUserRelationships = /* GraphQL */ `
  mutation UpdateUserRelationships(
    $input: UpdateUserRelationshipsInput!
    $condition: ModelUserRelationshipsConditionInput
  ) {
    updateUserRelationships(input: $input, condition: $condition) {
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
export const deleteUserRelationships = /* GraphQL */ `
  mutation DeleteUserRelationships(
    $input: DeleteUserRelationshipsInput!
    $condition: ModelUserRelationshipsConditionInput
  ) {
    deleteUserRelationships(input: $input, condition: $condition) {
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
export const createPosts = /* GraphQL */ `
  mutation CreatePosts(
    $input: CreatePostsInput!
    $condition: ModelPostsConditionInput
  ) {
    createPosts(input: $input, condition: $condition) {
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
export const updatePosts = /* GraphQL */ `
  mutation UpdatePosts(
    $input: UpdatePostsInput!
    $condition: ModelPostsConditionInput
  ) {
    updatePosts(input: $input, condition: $condition) {
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
export const deletePosts = /* GraphQL */ `
  mutation DeletePosts(
    $input: DeletePostsInput!
    $condition: ModelPostsConditionInput
  ) {
    deletePosts(input: $input, condition: $condition) {
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
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
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
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
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
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
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
