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
export const createUserRelationships = /* GraphQL */ `
  mutation CreateUserRelationships(
    $input: CreateUserRelationshipsInput!
    $condition: ModelUserRelationshipsConditionInput
  ) {
    createUserRelationships(input: $input, condition: $condition) {
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
export const updateUserRelationships = /* GraphQL */ `
  mutation UpdateUserRelationships(
    $input: UpdateUserRelationshipsInput!
    $condition: ModelUserRelationshipsConditionInput
  ) {
    updateUserRelationships(input: $input, condition: $condition) {
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
export const deleteUserRelationships = /* GraphQL */ `
  mutation DeleteUserRelationships(
    $input: DeleteUserRelationshipsInput!
    $condition: ModelUserRelationshipsConditionInput
  ) {
    deleteUserRelationships(input: $input, condition: $condition) {
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
