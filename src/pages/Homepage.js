import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import {randomInteger} from "../ulti/random";
import { Stack } from "@mui/material";
import Banner from "../components/Banner";
import ListCards from "../components/ListCards";
import ListCardsTv from "../components/ListCardsTv";
import "../components/style.css";

const Homepage = () => {
  const [listTrending, setListTrending] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState();
  const [listTrendingTv, setListTrendingTv] = useState([]);
  const [loadingTrendingTv, setLoadingTrendingTv] = useState();
  const [listNowPlaying, setListNowPlaying] = useState([]);
  const [loadingNowPlaying, setLoadingNowPlaying] = useState();
  const [movieId, setMovieId] = useState();
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTrending(true);
        const res = await apiService.get(
          `/trending/movie/week?api_key=${API_KEY} `
        );
        const result = res.data.results;
        setListTrending(result);
        setLoadingTrending(false);
        setMovieId(result[randomInteger(1,19)].id);
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
          `/trending/tv/week?api_key=${API_KEY}`
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
      try {
        setLoadingNowPlaying(true);
        const res = await apiService.get( `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`);
        const result = res.data.results;
        setListNowPlaying(result);
        setLoadingNowPlaying(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Banner movieId={movieId} />
      <Stack padding={5}/>
      <h2 className="title">Trending Movies Now</h2>
      <ListCards list={listTrending} loadingList={loadingTrending} />
      <h2 className="title">Trending Tv Shows</h2>
      <ListCardsTv list={listTrendingTv} loadingList={loadingTrendingTv} />
      <h2 className="title">Movies in theatres</h2>
      <ListCards list={listNowPlaying} loadingList={loadingNowPlaying} />
    </>
  );
};

export default Homepage;
