import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { addTransaction, getTransactions } from "../../paths";
import TableData from "./TableData";
import Analytics from "./Analytics";
import {
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
  Grid,
  Typography,
  useTheme,
  CircularProgress
} from '@mui/material';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from '@mui/icons-material/Add';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

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

  const [cUser, setcUser] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");
  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  // Existing handlers
  const handleStartChange = (date) => setStartDate(date);
  const handleEndChange = (date) => setEndDate(date);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const handleChangeFrequency = (e) => setFrequency(e.target.value);
  const handleSetType = (e) => setType(e.target.value);
  const handleTableClick = () => setView("table");
  const handleChartClick = () => setView("chart");
  
  useEffect(() => {
    const avatarFunc = async () => {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.isAvatarImageSet === false || user.avatarImage === "") {
          navigate("/setAvatar");
        }
        setcUser(user);
        setRefresh(true);
      } else {
        navigate("/login");
      }
    };
    avatarFunc();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, amount, description, category, date, transactionType } = values;

    if (!title || !amount || !description || !category || !date || !transactionType) {
      toast.error("Please enter all the fields", toastOptions);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(addTransaction, {
        title, amount, description, category, date, transactionType,
        userId: cUser._id,
      });

      if (data.success === true) {
        toast.success(data.message, toastOptions);
        handleClose();
        setRefresh(!refresh);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Error occurred while adding transaction", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    setFrequency("7");
  };

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(getTransactions, {
          userId: cUser._id,
          frequency,
          startDate,
          endDate,
          type,
        });
        setTransactions(data.transactions);
      } catch (err) {
        toast.error("Error fetching transactions", toastOptions);
      } finally {
        setLoading(false);
      }
    };

    if (cUser?._id) {
      fetchAllTransactions();
    }
  }, [refresh, frequency, endDate, type, startDate, cUser]);

  return (
    <>
      {/* <Header /> */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Select Duration</InputLabel>
                <Select
                  value={frequency}
                  label="Select Frequency"
                  onChange={handleChangeFrequency}
                >
                  <MenuItem value="7">Last Week</MenuItem>
                  <MenuItem value="30">Last Month</MenuItem>
                  <MenuItem value="365">Last Year</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  label="Type"
                  onChange={handleSetType}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                  <MenuItem value="income">Earned</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                <IconButton 
                  onClick={handleTableClick}
                  color={view === "table" ? "primary" : "default"}
                >
                  <FormatListBulletedIcon />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    Table View
                  </Typography>
                </IconButton>

                <IconButton 
                  onClick={handleChartClick}
                  color={view === "chart" ? "primary" : "default"}
                >
                  <BarChartIcon />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    Chart View
                  </Typography>
                </IconButton>

                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleShow}
                >
                  Add New
                </Button>
              </Box>
            </Grid>
          </Grid>

          {frequency === "custom" && (
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Start Date
                  </Typography>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    customInput={
                      <TextField 
                        fullWidth
                        size="small"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    End Date
                  </Typography>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={
                      <TextField 
                        fullWidth
                        size="small"
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" onClick={handleReset}>
              Reset Filter
            </Button>
          </Box>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ mt: 3 }}>
            {view === "table" ? (
              <TableData data={transactions} user={cUser} />
            ) : (
              <Analytics transactions={transactions} user={cUser} />
            )}
          </Box>
        )}

        {/* Transaction Dialog */}
        <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add Transaction Details</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Enter Transaction Name"
              />

              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={values.amount}
                onChange={handleChange}
                placeholder="Enter your Amount"
              />

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={values.category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value="">Choose...</MenuItem>
                  <MenuItem value="Groceries">Groceries</MenuItem>
                  <MenuItem value="Rent">Rent</MenuItem>
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Tip">Tip</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Medical">Medical</MenuItem>
                  <MenuItem value="Utilities">Utilities</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Transportation">Transportation</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Enter Description"
              />

              <FormControl fullWidth>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  name="transactionType"
                  value={values.transactionType}
                  label="Transaction Type"
                  onChange={handleChange}
                >
                  <MenuItem value="">Choose...</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={values.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </Container>
    </>
  );
};

export default Home;