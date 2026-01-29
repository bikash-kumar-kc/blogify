import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import {
  AuthorHeader,
  BlogContent,
  ActionBar,
  CommentsModal,
  Loader,
} from "../../components/index";
import { useNavigate, useParams } from "react-router";
import { PostQuery } from "../../lib/tanstack_query/post";
import { useAuthContext } from "../../context/AuthContext";

const MotionNav = motion.create("nav");

const BlogPost = () => {
  const { slug } = useParams();
  const { user, isLoading, socket } = useAuthContext();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [newLikeCount, setNewLikeCount] = useState(null);
  const [liked, setLiked] = useState();
  const [saved, setSaved] = useState();
  const [joinedPostRoom, setJoinPostRoom] = useState(false);

  // ------------------------QUERY------------------------------
  // CREATING BLOG POST...
  const { data: post, isLoading: gettingPost } = PostQuery.useGettingPostBySlug(
    { slug }
  );

  // DELETING BLOG POST...
  const { mutateAsync: deletePost, isPending: deletingPost } =
    PostQuery.useDeleteBlogPost();

  // LIKE UNLIKE A POST...
  const { mutateAsync: likeUnlikePost, isPending: isReacting } =
    PostQuery.useAddingLikeToPost();

  const { data: reactionType} =
    PostQuery.useIsCurrentUserLikedAPost({ postId: post?.postId });

  // BOOK MARK UNMARK...
  const { mutateAsync: toogleBookMark} =
    PostQuery.useTogglePostBookmark();

  const {
    data: postBookMarkedByCurrentUser,
    isLoading: isPostBookMarkedByCurrentUser,
  } = PostQuery.useIsPostBookmarkedByCurrentUser({ postId: post?.postId });

  // COMMENT TO POST...
  const { mutateAsync: commentToAPost, isPending: isCommenting } =
    PostQuery.useCommentToAPost();

  const {
    data: allComments,
    hasNextPage,
    fetchNextPage,
  } = PostQuery.useGettingAllCommentForAPost({ postId: post?.postId });
  console.log(allComments);

  // CHECK CURRENT USER AND POST AUTHOR
  const isCurrentUser = (postUserId) => {
    if (postUserId === user?.id) return true;
    return false;
  };

  // DELETE POST...
  const handleDeletePost = async () => {
    console.log(post.postId)
    const isDeleted = await deletePost({postId:post?.postId});
    if (!isDeleted) {
      console.log("failed to deleted post");
      return;
    }
    console.log("post deleted successfully");
    navigate("/");
  };

  // EDIT POST...
  const handleEditPost = () => {
    navigate(`/edit-post/${post?.postId}`);
  };

  // REACT ON POST...
  const handleLikeUnlikePost = async () => {
    const isLikedUnliked = await likeUnlikePost({ postId: post?.postId });
    if (!isLikedUnliked) {
      console.log("problem in reacting post...");
      return;
    }
    socket.emit(
      "reaction:create",
      {
        postId: post.postId,
        content: isLikedUnliked?.isLiked ? "Liked" : "remove liked",
        authorId: post?.author?._id,
        title: post?.title,
      },
      handleCallBack
    );
    const totalLikes = isLikedUnliked.likeCount;
    setLiked(isLikedUnliked.isLiked);
    setNewLikeCount(totalLikes);
    return totalLikes;
  };

  // COMMENT ON POST...
  const handleComment = async (comment) => {
    const isCommented = await commentToAPost({
      postId: post?.postId,
      comment: comment,
    });
    if (!isCommented) {
      console.log("problem to do comment");
      return;
    }
    socket.emit(
      "comment:create",
      {
        postId: post?.postId,
        content: comment,
        authorId: post.author?._id,
        title: post.title,
      },
      handleCallBack
    );
    console.log(isCommented);
    setComments((prevs) => [...prevs, isCommented.data.comment]);
    return;
  };

  const handleToggleBookMark = async () => {
    const saveToggle = await toogleBookMark({ postId: post?.postId });
    if (!saveToggle) {
      console.log("problem in saving/unsaving post:: ");
      return;
    }

    setSaved(saveToggle.data.bookmarked);
    return;
  };

  const handleCallBack = (value) => {
    console.log("Server responded:: ", value);
  };

  useEffect(() => {
    if (reactionType) {
      console.log(reactionType);
      setLiked(reactionType.data.liked);
      setNewLikeCount(reactionType.data.likeCount);
      return;
    }
  }, [reactionType]);

  useEffect(() => {
    if (postBookMarkedByCurrentUser) {
      setSaved(postBookMarkedByCurrentUser.isBookmarked);
      return;
    }
  }, [postBookMarkedByCurrentUser]);

  useEffect(() => {
    if (allComments) {
      const allCommentsForAPost = allComments.pages.flatMap(
        (index) => index.data.comments
      );
      setComments(allCommentsForAPost);
    }
  }, [allComments]);

  useEffect(() => {
    if (post) {
      if (socket) {
        socket.emit("post:join", post?.postId);

        // Only subscribe to author's room if YOU are the author!
        if (post?.author._id === user.id) {
          socket.emit("user:subscribe", post?.author?._id);
        }

        setJoinPostRoom(true);
      }
    }

    return () => {
      if (joinedPostRoom) {
        socket.emit("post:leave", post?.postId);
        setJoinPostRoom(false);
      }
    };
  }, [post, socket, user.id]);

  if (gettingPost || isLoading || isPostBookMarkedByCurrentUser) {
    return (
      <Box as="div" minH={"100vh"} className="flex justify-center items-center">
        <Loader />
      </Box>
    );
  }

  return (
    <Box
      ml={{ base: 0, lg: "280px" }}
      mr={{ base: 0, lg: "300px" }}
      pt={{ base: "70px", lg: 0 }}
      pb={{ base: "80px", lg: 0 }}
      minH="100vh"
      bg="bg.default"
    >
      {/* Navigation */}
      <MotionNav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Box
          bg="bg.default/80"
          borderBottom="1px solid"
          borderColor="border.default"
        >
          <Container maxW="3xl" px="6" py="4">
            <Flex align="center" justify="space-between">
              <Text fontSize="xl" fontWeight="bold" color="white">
                Blog Post
              </Text>
            </Flex>
          </Container>
        </Box>
      </MotionNav>

      {/* Main Content */}
      <Box as="main" maxW="3xl" mx="auto" px="6" pb="32">
        <AuthorHeader
          author={post.author}
          publishedAt={post.createdAt}
          isCurrentUser={isCurrentUser(post.author._id)}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          isDeleting={deletingPost}
          postId={post.postId}
          status={post.status}
        />

        <BlogContent post={post} />

        <ActionBar
          initialLikes={newLikeCount}
          initialComments={comments.length}
          onCommentClick={() => setIsCommentsOpen(true)}
          handleReaction={handleLikeUnlikePost}
          isLiked={liked}
          isReacting={isReacting}
          saved={saved}
          handleSave={handleToggleBookMark}
        />
      </Box>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        comments={comments}
        isLoggedIn={user ? true : false}
        onSubmitComment={handleComment}
        nextPage={hasNextPage}
        fetchingNextPage={fetchNextPage}
      />
    </Box>
  );
};

export default BlogPost;
