import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import "./style.css";

const CardActor = ({ item }) => {
  return (
    <>
      {!item.profile_path ? (
        <></>
      ) : (
        <Stack margin={1} key={item.id}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            sx={[
              {
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.profile_path})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "250px",
                width: "180px",
              },
            ]}
          />
          <Box textAlign={"center"}>
            <Typography variant="body1" ml={1}>
              {item.name}
            </Typography>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default CardActor;
