import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import SearchPage from "../pages/SearchPage";

function MainLayout() {
  let [params] = useSearchParams();
  let searchParam = params.get("q");
  const itemsFromStorage =
    JSON.parse(window.localStorage.getItem("my-list")) || [];
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    setFavoriteMovies(itemsFromStorage);
  }, []);

  const handleAddToList = (movie) => {
    const itemsFromStorage =
      JSON.parse(window.localStorage.getItem("my-list")) || [];
    // Get the current items from localStorage

    // Check if the movie already exists in the array
    const movieExists = itemsFromStorage.find((item) => item.id === movie.id);

    // If the movie already exists, skip adding it
    if (movieExists) {
      alert("Movie already existed");
      return;
    }
    // Otherwise, add the new movie to the array
    const newFavorite = [...itemsFromStorage, { ...movie }];
    setFavoriteMovies(newFavorite);

    // Update the localStorage with the new array of items
    window.localStorage.setItem("my-list", JSON.stringify(newFavorite));
  };
  const handleRemoveFromList = (movie, favoriteMoviesGetFromMyList) => {
    // Get the current items from localStorage

    // Filter out the movie with the matching id
    const updatedItems = favoriteMoviesGetFromMyList.filter(
      (item) => item.id !== movie.id
    );

    // Update the state and localStorage with the new array of items
    setFavoriteMovies(updatedItems);
    window.localStorage.setItem("my-list", JSON.stringify(updatedItems));
  };
  return (
    <Grid container justifyContent={"space-around"}>
      <Grid item xs={12}>
        <MainHeader />
      </Grid>
      <Grid width={"100%"} marginLeft={-4}>
        {searchParam ? (
          <SearchPage searchParam={searchParam} />
        ) : (
          <Outlet
            context={[
              handleAddToList,
              handleRemoveFromList,
              favoriteMovies,
              setFavoriteMovies,
            ]}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <MainFooter />
      </Grid>
    </Grid>
  );
}

export default MainLayout;
