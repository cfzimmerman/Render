import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { Environment, GlobalStyles, Colors } from "../../../resources/project";
import { CommentType, CurrentUserType } from "../../../resources/CommonTypes";
import { setDeleteComment } from "../../../redux/social/socialmain";
import { formatDistanceToNowStrict } from "date-fns";
import { DispatchType } from "../../../redux/store";
var GraphemeSplitter = require("grapheme-splitter");

var splitter = new GraphemeSplitter();

const ActivateDeleteComment = ({ dispatch, commentID }) => {
  dispatch(setDeleteComment({ active: true, commentID }));
};

const DeleteOtherUserComment = ({
  userID,
  postOwnerID,
  commentID,
  dispatch,
}) => {
  if (userID === postOwnerID) {
    ActivateDeleteComment({ dispatch, commentID });
  }
};

const MainText = ({
  commentItem,
  isCurrentUser,
}: {
  commentItem: CommentType;
  isCurrentUser: boolean;
}) => {
  if (splitter.splitGraphemes(commentItem.commenttext).length < 3) {
    return (
      <Text
        style={[
          GlobalStyles.irregularshadow,
          GlobalStyles.h2text,
          styles.textstylevariant,
          {
            color: isCurrentUser ? Colors.Primary : Colors.AccentOn,
          },
        ]}
      >
        {commentItem.commenttext}
      </Text>
    );
  } else {
    return (
      <Text
        style={[
          GlobalStyles.irregularshadow,
          GlobalStyles.p1text,
          {
            color: isCurrentUser ? Colors.Primary : Colors.AccentOn,
          },
        ]}
      >
        {commentItem.commenttext}
      </Text>
    );
  }
};

interface CommentBodyPropsType {
  commentItem: CommentType;
  currentuser: CurrentUserType;
  dispatch: DispatchType;
  postOwnerID: string | null;
}

const AreEqual = (
  previousProps: CommentBodyPropsType,
  nextProps: CommentBodyPropsType
) => {
  if (previousProps.commentItem.id === nextProps.commentItem.id) {
    return true;
  }
  return false;
};

const CommentBody = ({
  commentItem,
  currentuser,
  dispatch,
  postOwnerID,
}: CommentBodyPropsType) => {
  const formattedDate = formatDistanceToNowStrict(
    new Date(commentItem.createdAt)
  );
  if (currentuser.id != commentItem.usersID) {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          DeleteOtherUserComment({
            userID: currentuser.id,
            postOwnerID,
            commentID: commentItem.id,
            dispatch,
          })
        }
      >
        <View style={styles.marginwrapper}>
          <View style={[GlobalStyles.irregularshadow, styles.container]}>
            <BlurView tint="dark" intensity={60} style={styles.blurviewwrapper}>
              <Text style={[GlobalStyles.p1text, styles.otheruserdisplayname]}>
                {commentItem.displayname}
              </Text>

              <MainText commentItem={commentItem} isCurrentUser={false} />
            </BlurView>
          </View>
          <Text
            style={[
              GlobalStyles.irregularshadow,
              GlobalStyles.p2text,
              styles.datelabel,
            ]}
          >
            {formattedDate}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableOpacity
      style={styles.marginwrapper}
      onPress={() => {
        ActivateDeleteComment({ dispatch, commentID: commentItem.id });
      }}
    >
      <View style={[GlobalStyles.irregularshadow, styles.currentusercontainer]}>
        <Text
          style={[
            GlobalStyles.p1text,
            GlobalStyles.irregularshadow,
            styles.currentuserdisplayname,
          ]}
        >
          {commentItem.displayname}
        </Text>

        <MainText commentItem={commentItem} isCurrentUser={true} />
      </View>
      <Text
        style={[
          GlobalStyles.irregularshadow,
          GlobalStyles.p2text,
          styles.datelabel,
        ]}
      >
        {formattedDate}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  marginwrapper: {
    marginBottom: Environment.StandardPadding,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  blurviewwrapper: {
    borderRadius: Environment.StandardRadius,
    overflow: "hidden",
    padding: Environment.StandardPadding,
  },
  textstylevariant: {
    textAlign: "center",
  },
  datelabel: {
    textAlign: "right",
    marginTop: Environment.SmallPadding,
    marginRight: Environment.StandardPadding,
    color: Colors.AccentOff,
  },
  currentusercontainer: {
    justifyContent: "center",
    borderRadius: Environment.StandardRadius,
    padding: Environment.StandardPadding,
    backgroundColor: Colors.Accent90,
  },
  currentuserdisplayname: {
    color: Colors.Primary90,
    textAlign: "right",
  },
  otheruserdisplayname: {
    textAlign: "right",
    color: Colors.AccentPartial,
  },
});

// export default CommentBody;
export default React.memo(CommentBody, AreEqual);
