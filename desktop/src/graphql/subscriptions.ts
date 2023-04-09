/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePostViewTracker = /* GraphQL */ `
  subscription OnCreatePostViewTracker {
    onCreatePostViewTracker {
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
export const onUpdatePostViewTracker = /* GraphQL */ `
  subscription OnUpdatePostViewTracker {
    onUpdatePostViewTracker {
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
export const onDeletePostViewTracker = /* GraphQL */ `
  subscription OnDeletePostViewTracker {
    onDeletePostViewTracker {
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
export const onCreateGlobalData = /* GraphQL */ `
  subscription OnCreateGlobalData {
    onCreateGlobalData {
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
export const onUpdateGlobalData = /* GraphQL */ `
  subscription OnUpdateGlobalData {
    onUpdateGlobalData {
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
export const onDeleteGlobalData = /* GraphQL */ `
  subscription OnDeleteGlobalData {
    onDeleteGlobalData {
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
export const onCreateGames = /* GraphQL */ `
  subscription OnCreateGames {
    onCreateGames {
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
export const onUpdateGames = /* GraphQL */ `
  subscription OnUpdateGames {
    onUpdateGames {
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
export const onDeleteGames = /* GraphQL */ `
  subscription OnDeleteGames {
    onDeleteGames {
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
export const onCreateUserGames = /* GraphQL */ `
  subscription OnCreateUserGames {
    onCreateUserGames {
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
export const onUpdateUserGames = /* GraphQL */ `
  subscription OnUpdateUserGames {
    onUpdateUserGames {
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
export const onDeleteUserGames = /* GraphQL */ `
  subscription OnDeleteUserGames {
    onDeleteUserGames {
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
export const onCreateNotifications = /* GraphQL */ `
  subscription OnCreateNotifications {
    onCreateNotifications {
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
export const onUpdateNotifications = /* GraphQL */ `
  subscription OnUpdateNotifications {
    onUpdateNotifications {
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
export const onDeleteNotifications = /* GraphQL */ `
  subscription OnDeleteNotifications {
    onDeleteNotifications {
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
export const onCreateUserNotifications = /* GraphQL */ `
  subscription OnCreateUserNotifications {
    onCreateUserNotifications {
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
export const onUpdateUserNotifications = /* GraphQL */ `
  subscription OnUpdateUserNotifications {
    onUpdateUserNotifications {
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
export const onDeleteUserNotifications = /* GraphQL */ `
  subscription OnDeleteUserNotifications {
    onDeleteUserNotifications {
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
export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments {
    onCreateComments {
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
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments {
    onUpdateComments {
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
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments {
    onDeleteComments {
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
export const onCreateUserRelationships = /* GraphQL */ `
  subscription OnCreateUserRelationships {
    onCreateUserRelationships {
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
export const onUpdateUserRelationships = /* GraphQL */ `
  subscription OnUpdateUserRelationships {
    onUpdateUserRelationships {
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
export const onDeleteUserRelationships = /* GraphQL */ `
  subscription OnDeleteUserRelationships {
    onDeleteUserRelationships {
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
export const onCreatePosts = /* GraphQL */ `
  subscription OnCreatePosts {
    onCreatePosts {
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
export const onUpdatePosts = /* GraphQL */ `
  subscription OnUpdatePosts {
    onUpdatePosts {
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
export const onDeletePosts = /* GraphQL */ `
  subscription OnDeletePosts {
    onDeletePosts {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers {
    onCreateUsers {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers {
    onUpdateUsers {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers {
    onDeleteUsers {
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
