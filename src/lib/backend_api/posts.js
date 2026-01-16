import axios from "axios";

export class PostServices {
  static api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 5000,
      withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Set up interceptors (run once)
  // static initializeInterceptors() {
  //   if (this.initialized) return;
  //   this.initialized = true;

  //   this.api.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       if (!error.response) {
  //         alert("Server is down or network error");
  //       } else {
  //         const status = error.response.status;

  //         switch (status) {
  //           case 401:
  //             console.log("Unauthorized! Logging out...");
  //             break;
  //           case 403:
  //             alert("You do not have permission to access this resource");
  //             break;
  //           case 404:
  //             alert("Requested resource not found (404)");
  //             break;
  //           case 500:
  //             alert("Server error (500). Please try again later");
  //             break;
  //           default:
  //             console.log(
  //               `HTTP Error ${status}:`,
  //               error.response.data?.message
  //             );
  //         }
  //       }

  //       return Promise.reject(error);
  //     }
  //   );
  // };

  // GETTING ALL PUBLISHED POSTS...
  static gettingAllPublishedPosts = async ({ pageParam = 1, limit = 2 }) => {
    try {
      const publishedPosts = await this.api.get("/publicPost/", {
        params: {
          page: pageParam,
          limit: limit,
        },
      });

      if (!publishedPosts) throw new Error();
      return publishedPosts.data;
    } catch (error) {
      console.log("problem in getting  published posts" + error);
    }
  };

  //GETTING ALL NOTIFICATIONS...
  static gettingAllNotifications = async ({ pageParam = 1, limit = 10 }) => {
    // this.initializeInterceptors();
    try {
      const notifications = await this.api.get("/notifications/", {
        params: { page: pageParam, limit: limit },
        withCredentials: true,
      });

      if (!notifications) throw new Error();
      console.log(notifications.data.data.notifications);
      return notifications.data;
    } catch (error) {
      console.log("problem in getting notifications:: " + error);
    }
  };

  // UPLOADING IMAGE...
  static uploadingImage = async (file) => {
    // this.initializeInterceptors();
    try {
      console.log(file)
      // Create FormData object
      console.log("we are;;;");
      const formData = new FormData();
      formData.append("image", file);

      const fileInfo = await this.api.post("/post/uploadImage", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Important!
        },
      });

      if (!fileInfo) throw new Error();
      console.log(fileInfo);
      return fileInfo.data.data.image[0];
    } catch (error) {
      console.log("problem in uploading image:: " + error);
      throw error;
    }
  };

  // DELETING IMAGE...
  static deletingImage = async (publicId) => {
    try {
      const isDeleted = await this.api.delete("/post/delete-image/", {
        data: {
          publicId: publicId,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!isDeleted) throw new Error();
      return isDeleted;
    } catch (error) {
      console.log("problem in deleting image:: " + error);
      throw error; // Re-throw so caller knows it failed
    }
  };
  // CREATING BLOG POST...
  static createNewBlogPost = async ({
    coverImage,
    title,
    excerpt,
    tags,
    status,
    content,
  }) => {
    try {
      const fileInfo = await this.uploadingImage(coverImage);
      console.log(fileInfo);

      if (!fileInfo) throw new Error();
      console.log(fileInfo);
      const blogPost = await this.api.post(
        "/post/",
        {
          title: title,
          content: content,
          status: status,
          coverImage: fileInfo.imageUrl,
          publicId: fileInfo.publicKey,
          tags: tags,
          excerpt: excerpt,
        },
        {
          withCredentials: true,
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (!blogPost) throw new Error();
      return blogPost.data.data;
    } catch (error) {
      console.log("problem in creating blog post:: " + error);
    }
  };

  // DELETING BLOG POST...
  static deletingBlogPost = async ({postId}) => {
    try {
      const isBlogPostDeleted = await this.api.delete(`/post/${postId}`, {
        withCredentials: true,
      });
      return true;
    } catch (error) {
      console.log("problem in deleting blog post:: " + error);
    }
  };

  //GETTING ALL DRAFTS POSTS OF CURRENT USER...
  static gettingAllDraftsPosts = async ({ pageParam = 1, limit = 5 }) => {
    try {
      const allDraftsPosts = await this.api.get("/post/my-drafts", {
        params: {
          page: pageParam,
          limit: limit,
        },
        withCredentials: true,
      });

      if (!allDraftsPosts) throw new Error();
      console.log(allDraftsPosts);
      return allDraftsPosts.data;
    } catch (error) {
      console.log("Problem in getting all drafts posts:: " + error);
      throw error;
    }
  };

  // GETTING ALL PUBLISHED POSTS OF CURRENT_USER...
  static gettingAllPublishedPostsByCurrentUser = async ({
    pageParam = 1,
    limit = 2,
  }) => {
    try {
      const allPublishedPostsByCurrentUser = await this.api.get(
        "/post/my-published",
        {
          params: {
            page: pageParam,
            limit: limit,
          },
          withCredentials: true,
        }
      );

      if (!allPublishedPostsByCurrentUser) throw new Error();
      console.log(allPublishedPostsByCurrentUser);
      return allPublishedPostsByCurrentUser.data;
    } catch (error) {
      console.log(
        "problem in getting all published posts of current user:: " + error
      );
      throw error;
    }
  };

  // GETTING POST FOR EDIT...
  static gettingPostForEdit = async (postId) => {
    try {
      const postForEdit = await this.api.get(`/post/${postId}/edit`, {
        withCredentials: true,
      });
      if (!postForEdit) throw new Error();
      return postForEdit.data;
    } catch (error) {
      console.log("problem in getting post for edit:: " + error);
      throw error;
    }
  };

  // UPDATING POST...
  static updatingPost = async ({ updatedField, postId }) => {
    console.log(postId);
    console.log(updatedField);
    try {
      // UPLOADING IMAGE...
      const fileInfo = await this.uploadingImage(updatedField.coverImage);
      console.log(fileInfo);

      if (!fileInfo) throw new Error();

      updatedField.coverImage = fileInfo.imageUrl;
      updatedField.publicId = fileInfo.publicKey;
      console.log(updatedField);
      const updatePost = await this.api.put(
        `/post/${postId}`,
        {
          dataToUpdates: { ...updatedField },
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!updatePost) throw new Error();
      return updatePost.data;
    } catch (error) {
      console.log("problem in updating post:: " + error);
      throw error;
    }
  };

  // DRAFT-POST TO PUBLISHED-POST...
  static updatingPostStatusFromDraftToPublished = async ({postId}) => {
    try {
      const updatingStatus = await this.api.patch(
        `post/${postId}/publish`,
        {},
        {
          withCredentials: true,
        }
      );

      if (!updatingStatus) throw new Error();
      return true;
    } catch (error) {
      console.log("problem in updating post status:: " + error);
      throw error;
    }
  };

  // PUBLISHED-POST TO DRAFT-POST...
  static updatingPostStatusFromPublishedToDraft = async ({postId}) => {
    try {
      const updatingStatus = await this.api.patch(
        `post/${postId}/unpublish`,
        {},
        {
          withCredentials: true,
        }
      );

      if (!updatingStatus) throw new Error();
      return true;
    } catch (error) {
      console.log("problem in updating post status:: " + error);
      throw error;
    }
  };

  // GETTING POST BY SLUG TO VIEW...
  static gettingPostBySlug = async ({ slug }) => {
    try {
      const post = await this.api.get(`/publicPost/${slug}`);
      if (!post) throw new Error();
      return post.data;
    } catch (error) {
      console.log("problem in getting post by slug:: " + error);
      throw error;
    }
  };

  // REACTION...
  static addingLikeToPost = async ({ postId }) => {
    try {
      const reactOnPost = await this.api.post(
        `/reactionPost/${postId}/like`,
        {},
        {
          withCredentials: true,
        }
      );

      if (!reactOnPost) throw new Error();
      return reactOnPost.data;
    } catch (error) {
      console.log("problem in reacting on post..." + error);
      throw error;
    }
  };

  static gettingAllLikesForAPost = async ({ postId }) => {
    try {
      const allLikes = await this.api.get(`/reactionPost/${postId}/likes`, {
        withCredentials: true,
        params: {
          count: true,
        },
      });

      if (!allLikes) throw new Error();
      return allLikes;
    } catch (error) {
      console.log("problem in getting all likes for a post:: " + error);
      throw error;
    }
  };

  static isCurrentUserLikedAPost = async ({ postId }) => {
    try {
      const isLiked = await this.api.get(
        `/reactionPost/${postId}/like-status`,
        {
          withCredentials: true,
        }
      );

      if (!isLiked) throw new Error();

      return isLiked.data;
    } catch (error) {
      console.log(
        "failed to know whether current user liked or unliked post:: " + error
      );
      throw error;
    }
  };

  // BOOKMARK...

  static togglePostBookmark = async ({ postId }) => {
    try {
      const bookmarkOnPost = await this.api.post(
        `/bookmark/${postId}/`,
        {},
        {
          withCredentials: true,
        }
      );

      if (!bookmarkOnPost) throw new Error();
      return bookmarkOnPost.data;
    } catch (error) {
      console.log("problem in bookmarking to post..." + error);
      throw error;
    }
  };

  static isPostBookmarkedByCurrentUser = async ({ postId }) => {
    try {
      const isSaved = await this.api.get(
        `/bookmark/${postId}/bookmark-status`,
        {
          withCredentials: true,
        }
      );
      if (!isSaved) throw new Error();
      return isSaved.data;
    } catch (error) {
      console.log(
        "failed to know whether current user saved or unsaved post:: " + error
      );
      throw error;
    }
  };

  // COMMENTS...
  static commentToAPost = async ({ postId, comment }) => {
    try {
      const newComment = await this.api.post(
        `/comment/${postId}`,
        {
          commentMsg: comment,
        },
        { withCredentials: true }
      );

      if (!newComment) throw new Error();
      return newComment.data;
    } catch (error) {
      console.log("problem in doing comment:: " + error);
    }
  };

  static gettingAllCommentForAPost = async ({
    postId,
    pageParam = 1,
    limit = 10,
  }) => {
    try {
      const allComments = await this.api.get(`/comment/${postId}`, {
        params: {
          page: pageParam,
          limit: limit,
        },
        withCredentials: true,
      });

      if (!allComments) throw new Error();
      return allComments.data;
    } catch (error) {
      console.log("problem in getting all the comments for a post:: " + error);
      throw error;
    }
  };

  static gettingAllSavedPosts = async ({ pageParam = 1, limit = 3 }) => {
    try {
      const allSavedPosts = await this.api.get("/bookmark/", {
        params: {
          page: pageParam,
          limit: limit,
        },
        withCredentials: true,
      });
      if (!allSavedPosts) throw new Error();
      return allSavedPosts.data;
    } catch (error) {
      console.log("problem in getting saved posts:: " + error);
      throw error;
    }
  };
}
