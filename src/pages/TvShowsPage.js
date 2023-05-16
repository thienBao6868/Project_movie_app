import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { randomInteger } from "../ulti/random";
import { Stack } from "@mui/material";
import ListCardsTv from "../components/ListCardsTv";
import BannerTvshow from "../components/BannerTvshow";
import "../components/style.css";

const TvShowsPage = () => {
  const [listTvAiringToday, setListTvAiringToday] = useState([]);
  const [lodingListTvAiringToday, setLodingListTvAiringToday] = useState();
  const [listTrendingTv, setListTrendingTv] = useState([]);
  const [loadingTrendingTv, setLoadingTrendingTv] = useState();
  const [listTvshowsAction, setListTvshowsAction] = useState([]);
  const [loadingTvShowsAction, setLoadingTvShowsAction] = useState();
  const [tvShowsId, setTvShowsId] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLodingListTvAiringToday(true);
        const res = await apiService.get(
          `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1 `
        );
        const result = res.data.results;
        setListTvAiringToday(result);
        setLodingListTvAiringToday(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTrendingTv(true);
        const res = await apiService.get(
          `/trending/tv/week?api_key=${API_KEY}&append_to_response=videos`
        );
        const result = res.data.results;
        setListTrendingTv(result);
      
        setLoadingTrendingTv(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let url = `discover/tv?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
      try {
        setLoadingTvShowsAction(true);
        const res = await apiService.get(`${url}&with_genres=10759`);
        const result = res.data.results;
        setListTvshowsAction(result);
        setTvShowsId(result[randomInteger(1,19)])
        setLoadingTvShowsAction(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <BannerTvshow tvShow={tvShowsId}/>
      <Stack padding={5}/>
      <h2 className="title">Trending Tv Shows</h2>
      <ListCardsTv list={listTrendingTv} loadingList={loadingTrendingTv} />
      <h2 className="title">TV shows that are airing today</h2>
      <ListCardsTv
        list={listTvAiringToday}
        loadingList={lodingListTvAiringToday}
      />
      <h2 className="title">Action & Adventure</h2>
      <ListCardsTv list={listTvshowsAction} loadingList={loadingTvShowsAction} />
    </>
  );
};

export default TvShowsPage;
