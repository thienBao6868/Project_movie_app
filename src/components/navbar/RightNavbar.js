import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import SearchBox from "./SearchBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import logoLogin from "../../assets/images/pdp.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

// style App Modal Notifications
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RightNavbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // useAuth (Logic render)
  const { user, signout } = useAuth();
  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Grid display={"flex"} justifyContent={"center"} alignItems={"cent"}>
        <SearchBox />

        <IconButton color="inherit" onClick={handleOpen}>
          <Tooltip title="Notifications">
            <NotificationsIcon />
          </Tooltip>
        </IconButton>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open Accout">
            <img
              alt="accout"
              src={logoLogin}
              onClick={handleOpenUserMenu}
              width={"30px"}
              className="accout"
            />
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{user}</Typography>
            </MenuItem>
            <MenuItem onClick={() => signout(() => {})} component={Link} to="/signin">
              <Typography textAlign="center">Log out Netflix</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} height={250}>
          <Typography
            id="modal-modal-title"
            variant="subtitle1"
            component="h2"
            marginTop={-2}
          >
            No recent Notifications
          </Typography>
          <Box></Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default RightNavbar;
