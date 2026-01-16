import {
  Home,
  PenSquare,
  TrendingUp,
  Bookmark,
  User,
  FileText,
} from "lucide-react";

export const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/create-blog-post", icon: PenSquare, label: "Create Blog" },
  { path: "/popular-blogs", icon: TrendingUp, label: "Popular Blogs" },
  { path: "/saved-posts", icon: Bookmark, label: "Saved Posts" },
  { path: "/user-profile/", icon: User, label: "Profile" },
  { path: "/my-blogs", icon: FileText, label: "My Blogs" },
];

export const navItemsBottom = [
  { path: "/", label: "Home", icon: Home },
  { path: "/popular-blogs", label: "Popular", icon: TrendingUp },
  { path: "/create-blog-post", label: "Create", icon: PenSquare, primary: true },
  { path: "/saved-posts", label: "Saved", icon: Bookmark },
  { path: "/my-blogs", label: "My Blogs", icon: FileText },
];
