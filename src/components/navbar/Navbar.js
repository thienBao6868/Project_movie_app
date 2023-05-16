import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useTheme } from "@emotion/react";
import LogoNetflix from "./LogoNetflix";
import RightNavbar from "./RightNavbar";
import SearchBox from "./SearchBox";
import "./Navbar.css";

// Array Render MenuLeftBar
const menuNavbar = [
  { title: "Home", link: "/" },
  { title: "Tv Shows", link: "/tvshows" },
  { title: "Movies", link: "/movies" },
  { title: "New & Popular", link: "/new&popular" },
  { title: "My List", link: "/mylist" },
];

const Navbar = () => {
  // handle MenuItem
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // auth
  const { user, signout } = useAuth();

  // style Navbar
  const theme = useTheme();
  const [navBackground, setNavBackground] = React.useState(false);
  const changeBackground = () => setNavBackground(window.scrollY > 20);
  window.addEventListener("scroll", changeBackground);
  const navAppbar = {
    padding: theme.spacing(0, 0),
    backgroundImage:
      "linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0))",
    transition: ".4s",
    backgroundColor: navBackground ? "rgb(20, 20, 20)" : "rgba(0, 0, 0, 0)",
  };
  const toolbarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContents: "center",
    textAlign: "center",
  };

  return (
    <AppBar position="fixed" style={navAppbar} elevation={0} component="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters style={toolbarStyle}>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <div className="wapper_menu_mobile">
                {menuNavbar.map((item, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <NavLink key={index} to={item.link}>
                      <Typography textAlign="center">{item.title}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{user}</Typography>
                </MenuItem>
                <MenuItem onClick={() => signout(() => {})} component={Link} to={"/signin"}>
                  <Typography textAlign="center">Log out Netflix</Typography>
                </MenuItem>
              </div>
            </Menu>
          </Box>
          <NavLink to={"/"}>
            <LogoNetflix />
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div className="wapper_menu">
              {menuNavbar.map((item, index) => (
                <NavLink key={index} to={item.link}>
                  <Typography margin={1}>{item.title}</Typography>
                </NavLink>
              ))}
            </div>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <RightNavbar />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <SearchBox />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
