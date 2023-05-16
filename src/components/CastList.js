import { Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CardActor from "./CardActor";

const CastList = ({ CastList }) => {
  return (
    <>
      <Stack
        mt={5}
        marginLeft={5}
      >
        <Typography variant="h5" my={3}>
          Cast List
        </Typography>
      </Stack>
      <Divider />
      <Stack padding={2} marginLeft={5}/>
      <Grid
        container
        direction="row"
        spacing={2}
        mt={2}
        ml={5}
        width={"auto"}
        display={"flex"}
        overflow={"scroll"}
        sx={{flexWrap:"nowrap"}}
      >
        {CastList.map((item) => (
          <CardActor key={item.id} item={item} />
        ))}
      </Grid>
    </>
  );
};

export default CastList;
