import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Protected from "./Protected/Protected";
import ChakraProviderComponent from "./chakraProvider/ChakraProvider";
import { BlogPost, CreateBlogPost, EditPost, Home, LandingPage, MyBlogs, PopularBlogs, SavedPosts ,UpdateProfile,UserProfile} from "./_root";
import { SignIn, SignUp } from "./_auth/forms";

function App() {
  return (
    <>
      {/* <LandingPage /> */}
      {/* <TextReveal/> */}
      {/* <Features/> */}
      {/* <PopularPost/> */}
      <main>
        <Routes>
          <Route element={<ChakraProviderComponent>
            <Layout />
          </ChakraProviderComponent>}>
            // HOME ROUTE...
            <Route
              path="/"
              element={
                <Protected authentication={true}>
                  <ChakraProviderComponent>
                    <Home />
                  </ChakraProviderComponent>
                </Protected>
              }
            />
            // CREATE BLOG POST ROUTE...
             <Route
              path="create-blog-post"
              element={
                <Protected authentication={true}>
                  <ChakraProviderComponent>
                    <CreateBlogPost />
                  </ChakraProviderComponent>
                </Protected>
              }
            />

            // BLOG POST ROUTE...
             <Route
              path="blog-post/:slug"
              element={
                <Protected authentication={true}>
                  <ChakraProviderComponent>
                    <BlogPost />
                  </ChakraProviderComponent>
                </Protected>
              }
            />

            // BLOG EDIT POST ROUTE...
             <Route
              path="edit-post/:id"
              element={
                <Protected authentication={true}>
                  <ChakraProviderComponent>
                    <EditPost />
                  </ChakraProviderComponent>
                </Protected>
              }
            />

            // SAVED BLOG POSTS...
            <Route
              path="saved-posts"
              element={
                <Protected authentication={true}>
                  <ChakraProviderComponent>
                    <SavedPosts />
                  </ChakraProviderComponent>
                </Protected>
              }
            />

            // MY BLOG POSTS...
            <Route
              path="my-blogs"
              element={
                <Protected authentication={true}>
                  <ChakraProviderComponent>
                    <MyBlogs />
                  </ChakraProviderComponent>
                </Protected>
              }
            />

            // POPULAR BLOGS...
             <Route
              path="/popular-blogs"
              element={
                <Protected authentication={true}>
                  <ChakraProviderComponent>
                    <PopularBlogs />
                  </ChakraProviderComponent>
                </Protected>
              }
            />
            
            // USER PROFILE...
             <Route
              path="/user-profile/:authorId"
              element={
                <Protected authentication={true}>
                  <ChakraProviderComponent>
                    <UserProfile />
                  </ChakraProviderComponent>
                </Protected>
              }
            />

            // UPDATE-PROFILE...
             <Route
              path="/update-profile/:authorId"
              element={
                <Protected authentication={true}>
                  <ChakraProviderComponent>
                    <UpdateProfile/>
                  </ChakraProviderComponent>
                </Protected>
              }
            />
            
            // LandingPage Route...
            <Route
              path="/landingPage"
              element={
                <Protected authentication={false}>
                  <LandingPage />
                </Protected>
              }
            />
            // signin route...
            <Route
              path="/signin"
              element={
                <Protected authentication={false}>
                  <ChakraProviderComponent>
                    <SignIn />
                  </ChakraProviderComponent>
                </Protected>
              }
            />
          </Route>

          // signup route...
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
    </>
  );
}

export default App;
