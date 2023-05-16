import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../contexts/AuthContext";
import SignInPage from "../pages/SignInPage";
import Homepage from "../pages/Homepage";
import TvShowsPage from "../pages/TvShowsPage";
import MoviesPage from "../pages/MoviesPage";
import NewAndPopularPage from "../pages/NewAndPopularPage";
import MyListPage from "../pages/MyListPage";
import NoMatchPage from "../pages/NoMatchPage";
import DetailPage from "../pages/DetailPage";
import BlankPlayout from "../layouts/BlankPlayout";
import DetailTvShow from "../pages/DetailTvShow";

function Router() {
  let location = useLocation();
  //let state = location.state;
  function RequireAuth({ children }) {
    let auth = useAuth();
    console.log("user status:", auth.user);
    if (!auth.user) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.

      return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <RequireAuth>
                <Homepage />
              </RequireAuth>
            }
          />
          <Route path="tvshows" element={<TvShowsPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="new&popular" element={<NewAndPopularPage />} />
          <Route path="/mylist" element={<MyListPage />} />
          <Route path="movie/:detailId" element={<DetailPage />} />
          <Route path="tv/:detailId" element={<DetailTvShow />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>

        <Route element={<BlankPlayout />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
