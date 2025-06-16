import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Layouts/Home";
import Login from "../Pages/Other Pages/Login";
import Register from "../Pages/Other Pages/Register";
import Error from "../Pages/Other Pages/Error";
import ForgetPass from "../Pages/Other Pages/ForgetPass";
import Profile from "../Pages/Other Pages/Profile";
import Private from "../Provider/Private";
import AllBooks from "../Pages/Home Pages/AllBooks";
import AddBook from "../Pages/Home Pages/AddBook";
import BorrowedBooks from "../Pages/Home Pages/BorrowedBooks";
import UpdateBook from "../Pages/Other Pages/UpdateBook";
import CategoryBooks from "../Pages/Other Pages/CategoryBooks";
import BookDetails from "../Pages/Other Pages/BookDetails";
import AllCategories from "../Pages/Home Pages/AllCategories";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-books",
        Component: () => (
          <Private>
            <AllBooks />
          </Private>
        ),
      },
      {
        path: "/update-book/:id",
        Component: () => (
          <Private>
            <UpdateBook />
          </Private>
        )
      },
      {
        path: "/add-book",
        Component: () => (
          <Private>
            <AddBook />
          </Private>
        ),
      },
      {
        path: "/borrowed",
        Component: () => (
          <Private>
            <BorrowedBooks />
          </Private>
        ),
      },
      {
        path: "/all-categories",
        Component: AllCategories,
      },
      {
        path: "/category/:categoryName",
        Component: CategoryBooks
      },
      {
        path: "/books/:id",
        Component: () =>(
          <Private>
            <BookDetails />
          </Private>
        )
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/profile",
        Component: () => (
          <Private>
            <Profile />
          </Private>
        ),
      },
      {
        path: '/forget-password',
        Component: ForgetPass,
      },
      {
        path: '*',
        Component: Error,
      },
    ],
    
  },
]);

export default router;