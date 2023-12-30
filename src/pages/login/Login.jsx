import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEPATH } from "../../config";


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
  color: "black"
};

export default function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setmsg] = useState('');
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email, password }
    if (!data.email || !data.password) {
      setOpen(true);
      setmsg('Please enter email and password.')
      return
    }

    try {
      const responce = await axios.post(`${BASEPATH}/admin/login`, data)
      setOpen(true);
      setmsg('Login Successfully.')
      localStorage.setItem('auth', JSON.stringify(responce.data.user))
      navigate('/dashboard')
    } catch (error) {
      if (error.response.data.errors) {
        setOpen(true);
        setmsg(error.response.data.errors[0].msg)
      } else {
        setOpen(true);
        setmsg(error.response.data.message)
      }
    }


  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setmsg('')
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  const bg = '/assets/bg.jpg';
  const bgimg = '/assets/backimg.jpg';

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      <div
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  height: "70vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",

                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "35px", mb: "4px", bgcolor: "#000000" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Sign In
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 2 }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Username"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>

                        </Grid>
                        <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              borderRadius: 28,
                              color: "#ffffff",
                              minWidth: "170px",
                              backgroundColor: "#FF9A01",
                            }}
                          >
                            Sign in
                          </Button>
                        </Grid>

                      </Grid>
                    </Box>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
