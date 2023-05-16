import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Chip, Grid, Skeleton, Stack, Typography } from "@mui/material";
import CastList from "../components/CastList";
import RelatedVideo from "../components/RelatedVideo";
import BannerTvshow from "../components/BannerTvshow";

const detailSkeleton = (
  <Stack spacing={1}>
    <Skeleton variant="text" />
    <Skeleton variant="rectangular" width="100%" height={300} />
  </Stack>
);
const DetailTvShow = () => {
  const [tvShow, setTvShow] = useState();
  const [loadingTvShow, setLoadingTvShow] = useState();
  const [castList, setCastList] = useState([]);
  const [loadingCast, setLoadingCast] = useState();
  const [relatedVideos, setRelatedVideos] = useState([]);
  // Get detailId
  const { detailId } = useParams();
  // get tvShow detail
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTvShow(true);
        const res = await apiService.get(
          `tv/${detailId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        const result = res.data;
        const resultRelatedVideos = result.videos.results;
        setTvShow(result);
        setRelatedVideos(resultRelatedVideos);

        setLoadingTvShow(false);
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
          `tv/${detailId}/credits?api_key=${API_KEY}&language=en-US`
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
      {loadingTvShow ? (
        detailSkeleton
      ) : tvShow ? (
        <>
          <BannerTvshow tvShow={tvShow} />
          <Stack marginTop={5} />
          <Grid
            marginLeft={5}
            marginTop={2}
            marginBottom={2}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid>
              <Typography variant="h5">
                {tvShow.original_title ? tvShow.original_title : tvShow.name}
              </Typography>
              <Typography variant="subtitle1">{tvShow.overview}</Typography>
            </Grid>
            <Grid
              display={"flex"}
              justifyContent={"flex-start"}
              flexDirection={"column"}
            >
              <Typography variant="subtitle1">
                Genres:
                {tvShow.genres.map((item,index) => (
                  <Chip label={item.name} sx={{ margin: 1 }} key={index} />
                ))}
              </Typography>
              <Typography variant="subtitle1">
                Company:
                {tvShow.production_companies.map((item,index) => (
                  <Chip label={item.name} sx={{ margin: 1 }} key={index} />
                ))}
              </Typography>
              <Typography variant="subtitle1">
                Release_date: {tvShow.release_date}
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
          {loadingTvShow ? (
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

export default DetailTvShow;
