import React, { useState } from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import constants from "../constants";
import styles from "../styles";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View``;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.Text`
  margin: 5px 0px;
`;
const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });
  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount((l) => l - 1);
    } else {
      setLikeCount((l) => l + 1);
    }
    setIsLiked((p) => !p);
    try {
      await toggleLikeMutaton();
    } catch (e) {}
  };
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            source={{ uri: user.avatar }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper
        loop
        style={{ height: constants.height / 2.5 }}
        dotColor={styles.darkGreyColor}
        activeDotColor="white"
      >
        {files.map((file) => (
          <Image
            source={{ uri: file.url }}
            key={file.id}
            style={{ width: constants.width, height: constants.height / 2.5 }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={30}
                color={isLiked ? styles.redColor : styles.blackColor}
                name={
                  Platform.OS === "ios"
                    ? isLiked
                      ? "ios-heart"
                      : "ios-heart-outline"
                    : isLiked
                    ? "md-heart"
                    : "md-heart-outline"
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                color={styles.blackColor}
                size={30}
                name={
                  Platform.OS === "ios"
                    ? "ios-chatbubbles-outline"
                    : "md-chatbubbles-outline"
                }
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>
            {likeCount <= 1 ? `${likeCount} like` : `${likeCount} likes`}
          </Bold>
        </Touchable>
        <Container
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Touchable>
            <Bold>{user.username}</Bold>
          </Touchable>
          <Caption> {caption}</Caption>
        </Container>
        <Touchable>
          <CommentCount>
            See all{" "}
            {comments.length <= 1
              ? `${comments.length} comment`
              : `${comments.length} comments`}
          </CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
