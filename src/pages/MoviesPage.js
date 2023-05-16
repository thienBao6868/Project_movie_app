import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import {randomInteger} from "../ulti/random";
import { Stack } from "@mui/material";
import Banner from "../components/Banner";
import ListCards from "../components/ListCards";
import "../components/style.css";

const MoviesPage = () => {
  const [listTrending, setListTrending] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState();
  const [listActionMovie, setListActionMovie] = useState([]);
  const [loadingActionMovie, setLoadingActionMovie] = useState();
  const [listAdventureMovie, setListAdventureMovie] = useState([]);
  const [loadingAdventureMovie, setLoadingAdventureMovie] = useState();
  const [listFamilyMovie, setListFamilyMovie] = useState([])
  const [loadingFamilyMovie, setLoadingFamilyMovie] = useState();
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
      let url = `discover/movie?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
      try {
        setLoadingActionMovie(true);
        const res = await apiService.get(`${url}&with_genres=28`);
        const result = res.data.results;
        setListActionMovie(result);
        setLoadingActionMovie(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let url = `discover/movie?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
      try {
        setLoadingAdventureMovie(true);
        const res = await apiService.get(`${url}&with_genres=12`);
        const result = res.data.results;
        setListAdventureMovie(result);
        setLoadingAdventureMovie(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let url = `discover/movie?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
      try {
        setLoadingFamilyMovie(true);
        const res = await apiService.get(`${url}&with_genres=10751`);
        const result = res.data.results;
        setListFamilyMovie(result);
        setLoadingFamilyMovie(false);
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
      <h2 className="title">Trending Now</h2>
      <ListCards list={listTrending} loadingList={loadingTrending} />
      <h2 className="title">Action Movie</h2>
      <ListCards list={listActionMovie} loadingList={loadingActionMovie} />
      <h2 className="title">Family Movie</h2>
      <ListCards list={listFamilyMovie} loadingList={loadingFamilyMovie} />
      <h2 className="title">Adventure Movie</h2>
      <ListCards list={listAdventureMovie} loadingList={loadingAdventureMovie} />
    </>
  );
};

export default MoviesPage;
