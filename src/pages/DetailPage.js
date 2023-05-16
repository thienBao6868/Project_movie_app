import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Box, Chip, Grid, Skeleton, Stack, Typography } from "@mui/material";
import BannerDetailPage from "../components/BannerDetailPage";
import CastList from "../components/CastList";
import RelatedVideo from "../components/RelatedVideo";

const detailSkeleton = (
  <Stack spacing={1}>
    <Skeleton variant="text" />
    <Skeleton variant="rectangular" width="100%" height={300} />
  </Stack>
);
const DetailPage = () => {
  const [movie, setMovie] = useState();
  const [loadingMovie, setLoadingMovie] = useState();
  const [castList, setCastList] = useState([]);
  const [loadingCast, setLoadingCast] = useState();
  const [relatedVideos, setRelatedVideos] = useState([]);
  // Get detailId
  const { detailId } = useParams();
  // get movie detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMovie(true);
        const res = await apiService.get(
          `movie/${detailId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        const result = res.data;
        const resultRelatedVideos = result.videos.results;
        setMovie(result);
        setRelatedVideos(resultRelatedVideos);

        setLoadingMovie(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [detailId]);
  // get castList
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingCast(true);
        const res = await apiService.get(
          `movie/${detailId}/casts?api_key=${API_KEY}&language=en-US`
        );
        const result = res.data.cast;
        setCastList(result);

        setLoadingCast(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [detailId]);

  return (
    <>
      {loadingMovie ? (
        detailSkeleton
      ) : movie ? (
        <>
          <BannerDetailPage movieId={detailId} />
          <Stack marginTop={6}/>
          <Grid
            marginLeft={5}
            marginTop={2}
            marginBottom={2}
            display={"flex"}
            flexWrap={"wrap"}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            xs={12}
            sm={12}
            md={12}
          >
            <Grid sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
              <Stack padding={4} />
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems={"center"}
                marginRight={3}
                marginBottom={3}
                sx={[
                  {
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "280px",
                    width: "360px",
                  },
                ]}
              />
            </Grid>
            <Grid xs={12} sm={5} md={5} spacing={1}>
              <Typography variant="h5">{movie.original_title}</Typography>
              <Typography variant="subtitle1">{movie.overview}</Typography>
            </Grid>
            <Grid
              xs={12}
              sm={5}
              md={5}
              spacing={2}
              display={"flex"}
              justifyContent={"flex-start"}
              flexDirection={"column"}
            >
              <Typography variant="subtitle1">
                Genres:
                {movie.genres.map((item) => (
                  <Chip label={item.name} sx={{ margin: 1 }} />
                ))}
              </Typography>
              <Typography variant="subtitle1">
                Company:
                {movie.production_companies.map((item) => (
                  <Chip label={item.name} sx={{ margin: 1 }} />
                ))}
              </Typography>
              <Typography variant="subtitle1">
                Release_date: {movie.release_date}
              </Typography>
            </Grid>
          </Grid>

          {loadingCast ? (
            detailSkeleton
          ) : castList ? (
            <CastList CastList={castList} />
          ) : (
            <>
              <Typography>Cast List Not Found</Typography>
            </>
          )}
          {loadingMovie ? (
            detailSkeleton
          ) : relatedVideos ? (
            <RelatedVideo relatedVideos={relatedVideos} />
          ) : (
            <Typography>Related Videos Not fault</Typography>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DetailPage;
