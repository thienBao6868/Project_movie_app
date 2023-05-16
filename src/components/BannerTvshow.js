import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "./style.css";

const BannerTvshow = ({ tvShow }) => {
  const [handleAddToList, handleRemoveFromList, favoriteMovies] =
    useOutletContext();
  // toggle add movie
  let toggle = false;
  if (tvShow) {
    toggle = favoriteMovies.some((item) => item.id === tvShow.id);
  } else {
    toggle = false;
  }
  return (
    <>
      {tvShow ? (
        <>
          <Grid
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            className="wapper_all_banner"
          >
            <div className="wapperBanner">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                sx={[
                  {
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${tvShow.backdrop_path})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "600px",
                  },
                ]}
              />
            </div>
            <div className="InfoBannerTvShow">
              <Typography variant="h5">{tvShow.name}</Typography>
              <Typography variant="subtitle1">{tvShow.overview}</Typography>
              {toggle ? (
                <Button
                  sx={{ padding: 1, marginRight: 1 }}
                  variant="contained"
                  color="danger"
                  onClick={() => {
                    handleRemoveFromList(tvShow, favoriteMovies);
                  }}
                >
                  <RemoveCircleIcon />
                  Romove My List
                </Button>
              ) : (
                <Button
                  sx={{ padding: 1, marginRight: 1 }}
                  variant="contained"
                  color="danger"
                  onClick={() => handleAddToList(tvShow)}
                >
                  <AddBoxIcon />
                  Add My List
                </Button>
              )}
            </div>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default BannerTvshow;
