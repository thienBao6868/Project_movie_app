import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import CardMovie from "./CardMovie";

const CardMovieBySearch = ({ searchList }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {searchList
        .filter((movie) => movie.poster_path != null)
        .map((movie) => (
          <Grid item sm={12} md={6}>
            <Card
              key={movie.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexGrow: 1,
                margin: 0,
                width: "95%",
                height: "250px",
                overflow: "hidden",
                minWidth: "360px",
                ml: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  padding: 1,
                }}
              >
                <CardHeader title={movie.title ? movie.title : movie.name} />
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ gutterBottom: "true" }}
                  >
                    {movie.overview}
                  </Typography>
                </CardContent>
              </Box>
              <Box>
                <CardMovie item={movie} />
              </Box>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default CardMovieBySearch;
