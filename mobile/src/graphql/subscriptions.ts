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
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      viewerID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
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
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      viewerID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
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
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      viewerID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
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
      receivercognitosub
      sendercognitosub
      usersID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
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
      receivercognitosub
      sendercognitosub
      usersID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
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
      receivercognitosub
      sendercognitosub
      usersID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
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
      contenttype
      createdAt
      posttext
      publicpost
      publicpostdate
      sizeinbytes
      thumbnailkey
      type
      usersID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
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
      contenttype
      createdAt
      posttext
      publicpost
      publicpostdate
      sizeinbytes
      thumbnailkey
      type
      usersID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
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
      contenttype
      createdAt
      posttext
      publicpost
      publicpostdate
      sizeinbytes
      thumbnailkey
      type
      usersID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
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
      cognitosub
      displayname
      email
      emailconfirmed
      firstvaultupload
      fullyauthenticated
      gamertag
      mostrecentpublicpost
      pfp
      storagesizeinbytes
      type
      Posts {
        nextToken
      }
      PostViewTrackers {
        nextToken
      }
      UserRelationships {
        nextToken
      }
      createdAt
      updatedAt
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
      cognitosub
      displayname
      email
      emailconfirmed
      firstvaultupload
      fullyauthenticated
      gamertag
      mostrecentpublicpost
      pfp
      storagesizeinbytes
      type
      Posts {
        nextToken
      }
      PostViewTrackers {
        nextToken
      }
      UserRelationships {
        nextToken
      }
      createdAt
      updatedAt
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
      cognitosub
      displayname
      email
      emailconfirmed
      firstvaultupload
      fullyauthenticated
      gamertag
      mostrecentpublicpost
      pfp
      storagesizeinbytes
      type
      Posts {
        nextToken
      }
      PostViewTrackers {
        nextToken
      }
      UserRelationships {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
