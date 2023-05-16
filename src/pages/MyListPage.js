import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";
import CardMovie from "../components/CardMovie";

const MyListPage = () => {
  const [
    handleAddToList,
    handleRemoveFromList,
    favoriteMovies,
    setFavoriteMovies,
  ] = useOutletContext();

  return (
    <>
      <Stack paddingTop={6} />
      <Grid item direction="column" container marginLeft={2}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" my={3} ml={3}>
            My List
          </Typography>
        </Stack>
        <Divider />
        <Stack marginTop={3} />
        <Grid display={"flex"} justifyContent={"flex-start"} flexWrap={"wrap"}>
          {favoriteMovies.map((item) => (
            <Stack margin={1}>
              <CardMovie key={item.id} item={item} />
              <Button
                onClick={() => handleRemoveFromList(item, favoriteMovies)}
              >
                {" "}
                - Remove{" "}
              </Button>
            </Stack>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default MyListPage;
