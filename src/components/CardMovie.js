import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, Paper, Stack, Typography } from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./style.css"
const CardMovie = ({ item }) => {
  return (
    <>
      <Card
        className="card"
        key={item.id}
        sx={{ width: 180, borderRadius: "3px" }}
      >
        <CardActionArea LinkComponent={Link} to={`/movie/${item.id}`}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            sx={[
              {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.poster_path})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "250px",
                
              },
            ]}
            
          >
            <Paper className="content">
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  sx={[
                    {
                      maxHeight: "30%",
                      overflow: "hidden",
                    },
                  ]}
                >
                  <Typography gutterBottom variant="body1" component="div">
                    {/* data có 2 dạng lấy name, item.origin.name và item.origin.title */}
                    {item.original_title
                      ? `${item.original_title}`
                      : `${item.original_name}`}
                  </Typography>

                  <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      mr={3}
                    >
                      <RecommendIcon
                        className="recommend_icon"
                        fontSize="small"
                      />
                      <Typography variant="subtitle2" ml={1}>
                        {`${item.vote_average}`}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                    >
                      <FavoriteIcon
                        className="favorite_icon"
                        fontSize="small"
                      />
                      <Typography variant="subtitle2" ml={1}>
                        {`${item.vote_count}`}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Paper>


          </Box>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CardMovie;
