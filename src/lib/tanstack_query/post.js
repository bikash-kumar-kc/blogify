import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERIES_KEY } from "./Queries_Key";
import { PostServices } from "../backend_api/posts";

export class PostQuery {
  // GETTING ALL PUBLISHED POSTS USING PAGINATION...
  static useGetAllPublishedPost = (limit = 2) => {
    return useInfiniteQuery({
      queryKey: [QUERIES_KEY.GET_ALL_PUBLISHED_POST, limit],
      queryFn: ({ pageParam }) =>
        PostServices.gettingAllPublishedPosts({ pageParam, limit }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
       if(lastPage){
         const { page, totalPages } = lastPage?.data.pagination;
        return page < totalPages ? `${parseInt(page) + 1}` : undefined;
       }
       return undefined
      },
    });
  };

  static useGetAllNotifications = (limit = 10) => {
    return useInfiniteQuery({
      queryKey: [QUERIES_KEY.GET_ALL_NOTIFICATIONS, limit],
      queryFn: ({ pageParam }) =>
        PostServices.gettingAllNotifications({ pageParam, limit }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        console.log(lastPage);
        if(lastPage){
          const { page, totalPages } = lastPage?.data?.pagination;
        return page < totalPages ? `${parseInt(page) + 1}` : undefined;
        }
        return undefined;
      },
    });
  };

  // QUERY FOR UPLOADING IMAGE...
  static useUploadImage = () => {
    return useMutation({
      mutationFn: (file) => PostServices.uploadingImage(file),
    });
  };

  // QUERY FOR DELETEING IMAGE...
  static useDeleteImage = () => {
    return useMutation({
      mutationFn: (publicId) => PostServices.deletingImage(publicId),
    });
  };

  //QUERY FOR CREATING BLOG POST...
  static useCreateNewBlogPost = () => {
    return useMutation({
      mutationFn: ({ coverImage, title, excerpt, tags, status, content }) =>
        PostServices.createNewBlogPost({
          coverImage,
          title,
          excerpt,
          tags,
          status,
          content,
        }),
    });
  };

  // QUERY FOR DELETING BLOG POST...
  static useDeleteBlogPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({postId}) => PostServices.deletingBlogPost({postId}),
      onSuccess: () => {
        queryClient.invalidateQueries([
          QUERIES_KEY.GET_ALL_PUBLISHED_POST,
          QUERIES_KEY.GET_ALL_DRAFTS_POSTS_CURRENT_USER,
          QUERIES_KEY.GET_ALL_PUBLISHED_POSTS_CURRENT_USER,
        ]);
      },
    });
  };

  //QUERY FOR GETTING ALL DRAFTS POSTS OF CURRENT USER...
  static useGettingAllDraftsPosts = (limit) => {
    return useInfiniteQuery({
      queryKey: [QUERIES_KEY.GET_ALL_DRAFTS_POSTS_CURRENT_USER, limit],
      queryFn: ({ pageParams }) =>
        PostServices.gettingAllDraftsPosts({ pageParams, limit }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.data.pagination;
        return page < totalPages ? `${parseInt(page) + 1}` : undefined;
      },
    });
  };

  // QUERY FOR GETTING ALL PUBLISHED POSTS OF CURRENT_USER...
  static useGettingAllPublishedPostsOFCurrentUser = (limit) => {
    return useInfiniteQuery({
      queryKey: [QUERIES_KEY.GET_ALL_PUBLISHED_POSTS_CURRENT_USER, limit],
      queryFn: ({ pageParam }) =>
        PostServices.gettingAllPublishedPostsByCurrentUser({
          pageParam,
          limit,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        console.log(lastPage)
        const { page, totalPages } = lastPage.data.pagination;
        return page < totalPages ? `${parseInt(page) + 1}` : undefined;
      },
    });
  };

  // QUERY FOR GETTING POST FOR EDIT...
  static useGettingPostForEdit = (postId)=>{
    return useQuery({
      queryFn:()=>PostServices.gettingPostForEdit(postId),
      enabled:!!postId,
    })
  };

  // QUERY FOR UPDATING POST...
  static useUpdatingPost = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn:({updatedField,postId})=>PostServices.updatingPost({updatedField,postId}),
      onSuccess:()=>{
        queryClient.invalidateQueries([
          QUERIES_KEY.GET_ALL_PUBLISHED_POST,
          QUERIES_KEY.GET_ALL_DRAFTS_POSTS_CURRENT_USER,
          QUERIES_KEY.GET_ALL_PUBLISHED_POSTS_CURRENT_USER,
          QUERIES_KEY.GET_POSTS_BY_SLUG
        ])
      }
    })
  };

  // QUERY FOR  DRAFT-POST TO PUBLISHED-POST...
  static useDraftToPublished = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn:({postId})=>PostServices.updatingPostStatusFromDraftToPublished({postId}),
      onSuccess:()=>{
         queryClient.invalidateQueries([
          QUERIES_KEY.GET_ALL_PUBLISHED_POST,
          QUERIES_KEY.GET_ALL_DRAFTS_POSTS_CURRENT_USER,
          QUERIES_KEY.GET_ALL_PUBLISHED_POSTS_CURRENT_USER,
          QUERIES_KEY.GET_POSTS_BY_SLUG,
        ])
      }
    })
  };

  // QUERY FOR  PUBLISHED-POST TO DRAFT-POST...
   static usePublishedToDraft =  ()=>{
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn:(postId)=>PostServices.updatingPostStatusFromPublishedToDraft(postId),
      onSuccess:()=>{
         queryClient.invalidateQueries([
          QUERIES_KEY.GET_ALL_PUBLISHED_POST,
          QUERIES_KEY.GET_ALL_DRAFTS_POSTS_CURRENT_USER,
          QUERIES_KEY.GET_ALL_PUBLISHED_POSTS_CURRENT_USER,
          QUERIES_KEY.GET_POSTS_BY_SLUG
        ])
      }
    })
  };

  // QUERY FOR GETTING POST BY SLUG...
  static useGettingPostBySlug = ({slug})=>{
   return useQuery({
      queryKey:[QUERIES_KEY.GET_POSTS_BY_SLUG,slug],
      queryFn:()=>PostServices.gettingPostBySlug({slug}),
      enabled:!!slug,
      select:(data)=>{
        const response = data.data.post;
        return {
          author:response.author,
          content:response.content,
          coverImage:response.coverImage,
          createdAt:response.createdAt,
          excerpt:response.excerpt,
          tags:response.tags,
          title:response.title,
          views:response.views,
          readingTime:response.readingTime,
          postId:response._id,
          status:response.status,
        }
      }
    });
  };

  // REACTION...
  static useAddingLikeToPost= ()=>{
    return useMutation({
      mutationFn:({postId})=> PostServices.addingLikeToPost({postId}),
    })
  };

  static useGettingAllLikesForAPost=({postId})=>{
    return useQuery({
      queryKey:[QUERIES_KEY.GET_ALL_LIKES_FOR_A_POST,postId],
      queryFn:()=>PostServices.gettingAllLikesForAPost({postId}),
      enabled:!!postId,
    })
  };


  static useIsCurrentUserLikedAPost=({postId})=>{
  return useQuery({
    queryKey: [QUERIES_KEY.IS_POST_LIKED, postId], // Add this!
    queryFn:()=>PostServices.isCurrentUserLikedAPost({postId}),
    enabled:!!postId,
  })
};

  // BOOKMARK...
  static useTogglePostBookmark= ()=>{
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn:({postId})=> PostServices.togglePostBookmark({postId}),
      onSuccess:()=>{
        queryClient.invalidateQueries([QUERIES_KEY.GET_ALL_SAVED_POSTS])
      }
    })
  };


  // BOOKMARK CURRENT USER...
  static useIsPostBookmarkedByCurrentUser=({postId})=>{
  return useQuery({
    queryKey: [QUERIES_KEY.IS_POST_BOOKMARKED, postId], // Add this!
    queryFn:()=>PostServices.isPostBookmarkedByCurrentUser({postId}),
    enabled:!!postId,
  })
};


// COMMENT TO A POST...
static useCommentToAPost = ()=>{
  return useMutation({
    mutationFn:({postId,comment})=>PostServices.commentToAPost({postId,comment}),
  })
};

// GET ALL COMMENTS...
static useGettingAllCommentForAPost = ({postId})=>{
  return useInfiniteQuery({
    queryKey:[QUERIES_KEY.GET_ALL_MESSAGE_FOR_A_POST,postId],
    queryFn:({pageParam})=>PostServices.gettingAllCommentForAPost({pageParam,postId}),
    enabled:!!postId,
    initialPageParam:1,
    getNextPageParam:(lastPage)=>{
      const {page,totalPages}= lastPage.data.pagination;
      return page<totalPages?`${parseInt(page)+1}`:undefined;
    }
  });
};

// GET ALL SAVED POSTS...
static useGettingAllSavedPosts = (limit=3)=>{
return useInfiniteQuery({
    queryKey:[QUERIES_KEY.GET_ALL_SAVED_POSTS,limit],
    queryFn:({pageParam})=>PostServices.gettingAllSavedPosts({pageParam,limit}),
    initialPageParam:1,
    getNextPageParam:(lastPage)=>{
    console.log(lastPage)
      const {page,totalPages}= lastPage.data.pagination;
      return page<totalPages?`${parseInt(page)+1}`:undefined;
    }
  })
}

}
