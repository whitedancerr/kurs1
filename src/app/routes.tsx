import { createBrowserRouter } from "react-router";
import { Root } from "./layouts/Root";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { CourseDetail } from "./pages/CourseDetail";
import { CoursesList } from "./pages/CoursesList";
import { Programs } from "./pages/Programs";
import { Teachers } from "./pages/Teachers";
import { About } from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "courses", Component: CoursesList },
      { path: "courses/:slug", Component: CourseDetail },
      { path: "programs", Component: Programs },
      { path: "teachers", Component: Teachers },
      { path: "about", Component: About },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "profile", Component: Profile },
    ],
  },
]);
