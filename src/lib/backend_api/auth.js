import axios from "axios";
import { PostServices } from "./posts";

export class AuthServices {
  static api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // CREATING A NEWUSER...
  static createUser = async ({ userName, email, password }) => {
    try {
      const newUser = await this.api.post(
        "auth/signup",
        {
          name: userName,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (!newUser) throw new Error("problem in creating user")
      return newUser;
    } catch (error) {
      console.log("Problem in creating user:: " + error.message);
      throw error;
    }
  };

  // LOGGING A USER...
  static loggingUser = async ({ email, password }) => {
    try {
      const user = await this.api.post(
        "auth/signin",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (!user) throw new Error("problem in user logging");
      return user;
    } catch (error) {
      console.log("problem in logging a user:: " + error);
    }
  };

  // LOGGING OUT...
  static loggingOut = async () => {
    try {
      const isLoggedOut = await this.api.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      if (!isLoggedOut) throw new Error();
      return true;
    } catch (error) {
      console.log("problem in logging user out:: " + error);
    }
  };

  // GENERATE ACCESS TOKEN FROM REFRESH TOKEN

  static generateAccessTokenFromRefreshToken = async () => {
    try {
      const isGenerated = await this.api.post(
        "/refresh",
        {},
        { withCredentials: true }
      );
      return;
    } catch (error) {
      console.log(
        "problem in generating access token from refresh token:: " + error
      );
    }
  };

  // GETTING CURRENT USER

  static getCurrentUser = async () => {
    try {
      const currentUser = await this.api.get("/user/current-user", {
        withCredentials: true,
      });

      if (!currentUser) throw new Error();
      console.log(currentUser.data.data.user);
      return currentUser.data.data.user;
    } catch (error) {
      console.log("problem in getting current user: " + error.message);
    }
  };

  static getUser = async ({ id }) => {
    try {
      const user = await this.api.get(`/user/user/${id}`, {
        withCredentials: true,
      });

      if (!user) throw new Error();
      console.log(user.data.data.user);
      return user.data.data.user;
    } catch (error) {
      console.log("problem in getting  user: " + error.message);
    }
  };

  static updateUser = async ({updatedField,userId})=>{

    try {
       // UPLOADING IMAGE...
      const fileInfo = await PostServices.uploadingImage(updatedField.avatar);
      console.log(fileInfo);

      if (!fileInfo) throw new Error();

      updatedField.avatar = fileInfo.imageUrl;
      updatedField.publicId = fileInfo.publicKey;
      console.log(updatedField);
      const updatePost = await this.api.put(
        `/user/update-user/${userId}`,
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
      console.log("problem in updating user:: "+error)
    }
  };

  static createNewUser = async()=>{
    try {
      const newUser = await this.api.post("/user/create-user",
        {

        },{
          withCredentials:true,
        }
      )
    } catch (error) {
      console.log("problem in creating new user:: "+error);
    }
  };
}
