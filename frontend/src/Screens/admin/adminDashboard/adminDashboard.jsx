import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  useLoadUsersMutation,
  useAdminDeleteUserMutation,
} from "../../../slices/admin/adminApiSlice";
import LoaderSpinner from "../../../components/USER/LoaderSpinner/Loader";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LinkContainer } from "react-router-bootstrap";
import { SetAdminUsersCollection } from "../../../slices/admin/adminUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

function AdminDashboard() {
  const dispatch = useDispatch();
  const { adminUsersCollection } = useSelector((state) => state.Users);
  const [adminDeleteUser, { isSuccess, isLoading }] = useAdminDeleteUserMutation();
  const [loadUser] = useLoadUsersMutation();
  const [searchQuery, setSearchQuery] = useState("");

  const getUsers = async () => {
    try {
      const Users = await loadUser().unwrap();
      dispatch(SetAdminUsersCollection(Users));
    } catch (error) {
      toast.error(error?.data?.message || error);
    }
  };

  useLayoutEffect(() => {
    getUsers();
  }, [isSuccess]);

  const handleDelete = async (_id) => {
    try {
      const res = await adminDeleteUser({ _id }).unwrap();
      toast.success(res.message);
    } catch (errors) {
      toast.error(errors?.data?.message || errors.error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredUsers = adminUsersCollection.filter(
    (user) =>
      user.name.toLowerCase().startsWith(searchQuery.toLowerCase()) 
  );
  
  const remainingUsers = adminUsersCollection.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ) &&
      !filteredUsers.includes(user)
  );
  
  const finalFilteredUsers = [...filteredUsers, ...remainingUsers];


   ////component
  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <h1>Admin Dashboard</h1>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 3, mt: 3 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: '75%' }}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1 }} />
            )
          }}
        />
        <Button
          color="primary"
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={() => getUsers()}
          sx={{ height: 56 }}
        >
          Refresh
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650, borderCollapse: "collapse" }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "#ffffff", border: "1px solid #808080" }}>USER</TableCell>
              <TableCell align="right" sx={{ color: "#ffffff", border: "1px solid #808080" }}>Profile Pic</TableCell>
              <TableCell align="right" sx={{ color: "#ffffff", border: "1px solid #808080" }}>Email</TableCell>
              <TableCell align="right" sx={{ color: "#ffffff", border: "1px solid #808080" }}>Phone</TableCell>
              <TableCell align="right" sx={{ color: "#ffffff", border: "1px solid #808080" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finalFilteredUsers.length <= 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={5} sx={{ border: "1px solid #808080" }}>
                  Users Not Found
                </TableCell>
              </TableRow>
            ) : (
              finalFilteredUsers.map((user, index) => (
                <TableRow key={user._id} sx={{ backgroundColor: index % 2 ? "#f5f5f5" : "#ffffff" }}>
                  <TableCell component="th" scope="row" sx={{ border: "1px solid #808080" }}>
                    {user.name}
                  </TableCell>
                  <TableCell align="right" sx={{ border: "1px solid #808080" }}>
                    <img
                      src={user.photo}
                      alt="profile.jpg"
                      height='100px'
                      width='200px'
                      style={{ objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ border: "1px solid #808080" }}>
                    {user.email}
                  </TableCell>
                  <TableCell align="right" sx={{ border: "1px solid #808080" }}>
                    {user.phone}
                  </TableCell>
                  <TableCell align="right" sx={{ border: "1px solid #808080" }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <LinkContainer to={`/admin/editUser/${user._id}`}>
                        <Button variant="contained" color="secondary" sx={{ mb: 1 }}>
                          Edit
                        </Button>
                      </LinkContainer>
                      {isLoading ? (
                        <LoaderSpinner />
                      ) : (
                        <Button variant="contained" color="error" onClick={() => {
                          if (window.confirm(`Are you sure you want to Delete this User Named ${user.name} ?`)) {
                            handleDelete(user._id);
                          }
                      }}>
                          Delete
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminDashboard;
