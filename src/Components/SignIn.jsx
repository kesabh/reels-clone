import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Paper,
  TextField,
  makeStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
const SignIn = (props) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [message, setMessage] = useState("");

  let { login } = useContext(AuthContext);

  let handleOnClick = async () => {
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      props.history.push("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  let useStyles = makeStyles({
    logo: {
      height: "10rem",
      backgroundSize: "contain",
    },
    pd: {
      padding: "2rem",
    },
    mt: { marginTop: "1.5rem" },
    centerContent: {
      display: "flex",
      justifyContent: "center",
    },
    linkStyle: {
      color: "white",
      textDecorationLine: "none",
    },
  });

  let classes = useStyles();
  return (
    <Container>
      <Grid container style={{ backgroundColor: "lightblue" }} spacing={2}>
        <Grid item lg={6} md={6} sm={5} xs={12}>
          <Paper>Carousel</Paper>
        </Grid>

        <Grid item lg={4} md={4} sm={5} xs={12}>
          <Card>
            <CardMedia
              className={classes.logo}
              image="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
              alt="insta"
            />
            <CardContent className={classes.pd}>
              <TextField
                size="small"
                fullWidth
                id="username"
                label="Username"
                value={email}
                variant="outlined"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                size="small"
                fullWidth
                margin="normal"
                id="password"
                label="Password"
                value={password}
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                fullWidth
                className={classes.mt}
                variant="contained"
                color="secondary"
                onClick={handleOnClick}
              >
                Login
              </Button>
            </CardContent>
            <CardActions className={classes.centerContent}>
              <Typography variant="p" color="initial">
                Don't have an account ?
              </Typography>
              <Button variant="contained" color="primary">
                <Link to="/signup" className={classes.linkStyle}>
                  Sign Up
                </Link>
              </Button>
            </CardActions>
            <h1> {message}</h1>
          </Card>
        </Grid>
      </Grid>
    </Container>

    // <div className="sing-in">
    //   <div className="email">
    //       UserName
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       value={email}
    //       onChange={(e) => {
    //         setEmail(e.target.value);
    //       }}
    //     />
    //   </div>
    //   <div className="password">
    //       Password
    //     <input
    //       type="text"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => {
    //         setPassword(e.target.value);
    //       }}
    //     />
    //   </div>
    //   <button >Login</button>

    //
    // </div>
  );
};

export default SignIn;
