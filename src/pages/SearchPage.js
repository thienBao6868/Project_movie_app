import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Grid, Stack, Typography } from "@mui/material";
import CardMovieBySearch from "../components/CardMovieBySearch";

const SearchPage = ({ searchParam }) => {
  // let [searchParams, setSearchParams] = useSearchParams()
  const [searchList, setSearchList] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    const FecthData = async () => {
      try {
        setLoadingSearch(true);
        const res = await apiService.get(
          `/search/multi?api_key=${API_KEY}&query=${searchParam}`
        );
        const data = res.data.results;
        if (data.length > 1) {
          setSearchList(data);
          setErrorMessage(null);
        } else {
          setErrorMessage("Something went wrong. Try searching again.");
          setSearchList(data);
        }
        setLoadingSearch(false);
      } catch (error) {
        console.log(error);
      }
    };
    FecthData();
  }, [searchParam]);

  return (
    <>
      <Stack padding={4} />
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
        gap={2}
        marginBottom={2}
        marginTop={5}
        ml={5}
      >
        <Typography variant="h5" fontWeight="500" color="white">
          Keyword: {searchParam}
        </Typography>
      </Grid>
      {errorMessage ? (
        <Typography variant="h5" color={"error"} marginLeft={5}>
          {errorMessage}
        </Typography>
      ) : loadingSearch ? (
        <></>
        ) : (
          <CardMovieBySearch searchList={searchList} />
      )}
    </>
  );
};

export default SearchPage;
