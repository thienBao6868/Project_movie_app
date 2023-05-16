import React, { useEffect, useState } from "react";
import ListCards from "../components/ListCards";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import "../components/style.css";
import ListCardsTv from "../components/ListCardsTv";
import { Stack } from "@mui/material";

const NewAndPopularPage = () => {
  const [moviesTopRate, setMoviesTopRate] = useState([]);
  const [loadingMoviesTopRate, setLoadingMoviesTopRate] = useState();
  const [moviesUpComing, setMoviesUpComing] = useState([]);
  const [loadingMoviesUpComing, setLoadingMoviesUpComing] = useState()
  const [tvTopRate, setTvTopRate] = useState([]);
  const [loadingTvTopRate, setLoadingTvTopRate] = useState();
  const [listPopularTvShows, setListPopularTvShows] = useState([]);
  const [loadingPopularTvShows, setLoadingPopularTvShows] = useState();
  // get Movies Top Rate
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMoviesTopRate(true);
        const res = await apiService.get(
          `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        const result = res.data.results;
        setMoviesTopRate(result);
        setLoadingMoviesTopRate(false);
      } catch (error) {
        console.log(error.message); 
      }
    };
    fetchData();
  }, []);
  // get Movies Up coming 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMoviesUpComing(true);
        const res = await apiService.get(
          `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );
        const result = res.data.results;
        setMoviesUpComing(result);
        setLoadingMoviesUpComing(false);
      } catch (error) {
        console.log(error.message); 
      }
    };
    fetchData();
  }, []);
  // get Tv shows Top Rate
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTvTopRate(true);
        const res = await apiService.get(
          `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        const result = res.data.results;
        setTvTopRate(result);
        setLoadingTvTopRate(false);
      } catch (error) {
        console.log(error.message); 
      }
    };
    fetchData();
  }, []);

  // get Popular Tv Shows
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingPopularTvShows(true);
        const res = await apiService.get(
          `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const result = res.data.results;
        setListPopularTvShows(result);
        setLoadingPopularTvShows(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    <Stack paddingTop={8}/>
    <h2 className="title">Movie Top Rate</h2>
      <ListCards
        list={moviesTopRate}
        loadingList={loadingMoviesTopRate}
      />
      <h2 className="title">Movie Upcoming</h2>
      <ListCards
        list={moviesUpComing}
        loadingList={loadingMoviesUpComing}
      />
      <h2 className="title">Tv Shows Top Rate</h2>
      <ListCardsTv
        list={tvTopRate}
        loadingList={loadingTvTopRate}
      />
      <h2 className="title">Popular TV shows</h2>
      <ListCardsTv
        list={listPopularTvShows}
        loadingList={loadingPopularTvShows}
      />
    </>
  );
};

export default NewAndPopularPage;
