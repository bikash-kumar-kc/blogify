import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Protected from "./Protected/Protected";
import ChakraProviderComponent from "./chakraProvider/ChakraProvider";
import {
  BlogPost,
  CreateBlogPost,
  EditPost,
  Home,
  LandingPage,
  MyBlogs,
  PopularBlogs,
  SavedPosts,
  UpdateProfile,
  UserProfile,
} from "./_root";
import { SignIn, SignUp } from "./_auth/forms";


function App() {
  return (
    <ChakraProviderComponent>
      <main>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={
                <Protected authentication={true}>
                  <Home />
                </Protected>
              }
            />
            
            <Route
              path="create-blog-post"
              element={
                <Protected authentication={true}>
                  <CreateBlogPost />
                </Protected>
              }
            />
            <Route
              path="blog-post/:slug"
              element={
                <Protected authentication={true}>
                  <BlogPost />
                </Protected>
              }
            />
            <Route
              path="edit-post/:id"
              element={
                <Protected authentication={true}>
                  <EditPost />
                </Protected>
              }
            />
            <Route
              path="saved-posts"
              element={
                <Protected authentication={true}>
                  <SavedPosts />
                </Protected>
              }
            />
            <Route
              path="my-blogs"
              element={
                <Protected authentication={true}>
                  <MyBlogs />
                </Protected>
              }
            />
            <Route
              path="/popular-blogs"
              element={
                <Protected authentication={true}>
                  <PopularBlogs />
                </Protected>
              }
            />
            <Route
              path="/user-profile/:authorId"
              element={
                <Protected authentication={true}>
                  <UserProfile />
                </Protected>
              }
            />
            <Route
              path="/update-profile/:authorId"
              element={
                <Protected authentication={true}>
                  <UpdateProfile />
                </Protected>
              }
            />
            <Route
              path="/landingPage"
              element={
                <Protected authentication={false}>
                  <LandingPage />
                </Protected>
              }
            />
            <Route
              path="/signin"
              element={
                <Protected authentication={false}>
                  <SignIn />
                </Protected>
              }
            />
          </Route>

          {/* FIX: SignUp stays outside Layout (no sidebar/nav needed) */}
          <Route
            path="/signup"
            element={
              <Protected authentication={false}>
                <ChakraProviderComponent>
                  <SignUp />
                </ChakraProviderComponent>
              </Protected>
            }
          />
        </Routes>
      </main>
    </ChakraProviderComponent>
  );
}

export default App;