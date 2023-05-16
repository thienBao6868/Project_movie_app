import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

import "./style.css"
import CardTvShow from "./CardTvShow";

const ListCardsTv = ({list,loadingList}) => {
    const placeholder = [0, 1, 2, 3, 4, 5];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );
  return (
    <>
     
    <div className="wapper_cardMovie">
      {loadingList? placeholder.map((item) => (
            <Grid key={item.id} item xs={6} sm={4} md={3}>
              {detailSkeleton}
            </Grid>
          )):list?.map((item) => (
              <Grid key={item.id} item xs={12} sm={12} md={12} display={"flex"} justifyContent={"space-between"} marginLeft={3}>
                <CardTvShow item={item} />
              </Grid>
            ))}
    </div>
  </>
  )
}

export default ListCardsTv
