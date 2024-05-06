import { Avatar, Box, Button, CircularProgress, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";
import { SlLock } from "react-icons/sl";
import AuthService from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { signUserError, signUserStart, signUserSuccess } from "../../reducer/auth-reducer";
import { useNavigate } from "react-router-dom";
import { getItem } from "../../helpers/persistens-storage";
import { useEffect } from "react";

function SignUp() {
   const { isLoading, user, isLogin } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      event.preventDefault();
      dispatch(signUserStart());

      const formData = new FormData(event.currentTarget);
      const userData = {
         email: formData.get("email"),
         key: formData.get("key"),
         name: formData.get("name"),
         secret: "MySecret",
      };

      try {
         const { data } = await AuthService.registerUser(userData);
         dispatch(signUserSuccess(data));
         navigate("/dashboard");
      } catch (error) {
         dispatch(signUserError());
      }
   };

   useEffect(() => {
      if (isLogin) navigate("/dashboard");
   }, [isLogin]);

   return (
      <Grid container component="main" sx={{ height: "100vh" }}>
         <CssBaseline />
         <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
               backgroundImage: "url(https://images7.alphacoders.com/133/thumb-1920-1338193.png)",
               backgroundRepeat: "no-repeat",
               backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
               backgroundSize: "cover",
               backgroundPosition: "center",
            }}
         />
         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
               sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: "#1976D2" }}>
                  <SlLock />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Ro'yhatdan o'tish
               </Typography>
               <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="name"
                     label="Name"
                     name="name"
                     autoComplete="name"
                     autoFocus
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="key"
                     label="Password (key)"
                     type="password"
                     id="key"
                     autoComplete="current-password"
                  />

                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                     {isLoading ? <CircularProgress color="light" /> : "Register"}
                  </Button>
               </Box>
            </Box>
         </Grid>
      </Grid>
   );
}

export default SignUp;
