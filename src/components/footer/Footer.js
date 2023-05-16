import React from "react";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import "./Footer.css";
const Footer = () => {
  const theme = useTheme();
  const style = {
    footer: {
      paddingTop: theme.spacing(8),
    },
    socialIcon: {
      color: "grey",
      cursor: "pointer",
      "&:hover": {
        color: "#fff",
      },
      marginRight: theme.spacing(1),
      transition: ".1s",
    },
  };
  return (
    <Container className="footer" style={style.footer} fixed>
      <Grid item xs={12}>
        <Box>
          <Facebook className="socialIcon" fontSize="large" />
          <Instagram className="socialIcon" fontSize="large" />
          <Twitter className="socialIcon" fontSize="large" />
          <YouTubeIcon className="socialIcon" fontSize="large" />
        </Box>
      </Grid>
      <Stack margin={1} />
      <Grid item xs={12}>
        <Grid container display={"flex"} flexWrap={"wrap"}>
          <Grid item xs={4}>
            <Typography color="textSecondary">Audio Description</Typography>
            <Typography color="textSecondary" display="block">
              Investor Relations
            </Typography>
            <Typography color="textSecondary" display="block">
              Legal Notices
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary">Help Center</Typography>
            <Typography color="textSecondary" display="block">
              Jobs
            </Typography>
            <Typography color="textSecondary" display="block">
              Cookies Preferences
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary">Gift Cards</Typography>
            <Typography color="textSecondary" display="block">
              Netflix Shop
            </Typography>
            <Typography color="textSecondary" display="block">
              Corporate Information
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Stack margin={1} />
      <Grid item xs={12}>
        <Typography color="textPrimary">© 2023 BaoNetflix, Inc.</Typography>
      </Grid>
    </Container>
  );
};

export default Footer;
