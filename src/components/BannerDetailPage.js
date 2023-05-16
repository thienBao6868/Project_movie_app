import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import ReactPlayer from "react-player";
import {  Button,  Grid } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useOutletContext } from "react-router-dom";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "./style.css"

const BannerDetailPage = ({ movieId }) => {
  // state get data movie detail
  const [movieInfo, setMovieInfo] = useState([]);
  const [loading, setLoading] = useState();
  const [movieVideo, setMovieVideo] = useState([]);
  // function (handle add and remove my list)
  const [
    handleAddToList,
    handleRemoveFromList,
    favoriteMovies,
  ] = useOutletContext();
  // get movie detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        const result = res.data;
        const resultvideo = res.data.videos.results[0].key;
        setMovieInfo(result);
        setMovieVideo(resultvideo);

        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [movieId]);
  // toggle add movie
  let toggle = false;
  if (movieInfo) {
    toggle = favoriteMovies.some((item) => item.id === movieInfo.id);
  } else {
    toggle = false;
  }
  return (
    <>
      {loading ? (
        <></>
      ) : movieInfo ? (
        <>
          <Grid
            sx={{ display: { xs: "none",sm:"block", md: "block" } }}
            className="wapper_all_banner"
          >
            <div className="wapperBanner disabled">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${movieVideo}`}
                width={"100%"}
                playing={true}
                loop={true}
                height={"500px"}
                muted={true}
              />
            </div>
            <div className="InfoBanner">
            {toggle ? (
                  <Button
                    sx={{ padding: 1, marginRight: 1 }}
                    variant="contained"
                    color="danger"
                    onClick={() => {
                      handleRemoveFromList(movieInfo, favoriteMovies);
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
                    onClick={() => handleAddToList(movieInfo)}
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

export default BannerDetailPage;
