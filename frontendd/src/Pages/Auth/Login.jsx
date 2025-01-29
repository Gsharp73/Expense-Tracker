import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../paths";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  Link as MuiLink
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: theme.palette.mode,
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error("All fields are required", toastOptions);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(loginAPI, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success(response.data.msg, toastOptions);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "An error occurred";
      toast.error(errorMessage, toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AccountBalanceWalletIcon
            sx={{ fontSize: 40, color: "primary.main", mb: 2 }}
          />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
            />

            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <MuiLink
                component={Link}
                to="/forgotPassword"
                variant="body2"
                sx={{ mb: 2 }}
              >
                Forgot Password?
              </MuiLink>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mb: 2 }}
              >
                {loading ? "Signing in..." : "Login"}
              </Button>

              <Typography variant="body2" color="text.secondary">
                Don't Have an Account?{" "}
                <MuiLink component={Link} to="/register">
                  Register
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
        <ToastContainer />
      </Container>
    </Box>
  );
};

export default Login;