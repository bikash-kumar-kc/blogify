import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthServices } from "../backend_api/auth";
import { QUERIES_KEY } from "./Queries_Key";

export class AuthQuery {

  static useCreatingNewUser = () => {
    return useMutation({
      mutationFn: ({ userName, email, password }) =>
        AuthServices.createUser({ userName, email, password }),
    });
  };

  static useLoggingUser = () => {
    return useMutation({
      mutationFn: ({ email, password }) =>
        AuthServices.loggingUser({ email, password }),
    })};

    static useUserLoggingOut = ()=>{
      return useMutation({
        mutationFn:AuthServices.loggingOut
      })
    };


    static useGetUser = ({id}) => {
    return useQuery({
      queryKey: [QUERIES_KEY.GET_USER],
      queryFn:()=> AuthServices.getUser({id}),
      enabled:!!id,
      select: (data) => {
        return {
          userName: data.userName,
          avatar: data.avatar,
          bio: data.bio,
          socialLinks: {
            instagram: data.socialLinks.instagram,
            twitter: data.socialLinks.twitter,
            github: data.socialLinks.github,
            linkedin: data.socialLinks.linkedin,
          },
          tier: data.tier,
          name:data.name,
          id:data._id,
          email:data.email,
        };
      },
    });
  };


  // QUERY FOR UPDATING USER...
  static useUpdateUser =()=>{
      return useMutation({
      mutationFn:({updatedField,userId})=>AuthServices.updateUser({updatedField,userId}),
    })
  }

}


 