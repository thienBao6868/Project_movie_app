import React from "react";
import ReactPlayer from "react-player";
import { Box, Divider, Stack, Typography } from "@mui/material";
import "./style.css";

const RelatedVideo = ({ relatedVideos }) => {
  return (
    <>
    <Stack padding={2} marginLeft={3}>
    <Typography variant="h5">Related Videos</Typography>
    </Stack>
      <Divider/>
      <div className="wapper_relatedVideos">
        {relatedVideos.map((video,index) => (
          <Box width={"360px"} padding={2} marginRight={5} key={index}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.key}`}
              playing={false}
              loop={true}
              height={"300px"}
              width={"360px"}
              //muted={true}
            />
          </Box>
        ))}
      </div>
    </>
  );
};

export default RelatedVideo;
