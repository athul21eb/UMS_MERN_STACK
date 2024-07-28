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
import { Image } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { LinkContainer } from "react-router-bootstrap";
import { SetAdminUsersCollection } from "../../../slices/admin/adminUsersSlice";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const dispatch = useDispatch();

  const {adminUsersCollection} =useSelector(state=>state.Users);

  const [adminDeleteUser, { isLoading }] = useAdminDeleteUserMutation();

  const [loadUser] = useLoadUsersMutation();

  const getUsers = async () => {
    try {
      const Users = await loadUser().unwrap();
      dispatch(SetAdminUsersCollection(Users));
    } catch (error) {
      toast(error?.data?.message || error);
    }
  };
 
  useLayoutEffect(() => {
    getUsers();
    
    
  }, [isLoading]);



  
  
  const handleDelete = async (_id) => {
    try {
      const res = await adminDeleteUser({ _id }).unwrap();
      toast.success(res.message);
    } catch (errors) {
      console.log(errors);
      toast.error(errors?.data?.message);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center">AdminDashboard</h1>
        <br />
        <Button color="info" title="Refresh" onClick={() => getUsers()}>
          
          Refresh
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, borderCollapse: "collapse" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "#ffffff", border: "1px solid #808080" }}>
                USER
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#ffffff", border: "1px solid #808080" }}
              >
                Profile Pic
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#ffffff", border: "1px solid #808080" }}
              >
                Email
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#ffffff", border: "1px solid #808080" }}
              >
                Phone
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#ffffff", border: "1px solid #808080" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminUsersCollection.length<=0?<TableCell align="center" sx={{ border: "1px solid #808080" }}>
                  Users Not found
                </TableCell>:adminUsersCollection.map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  backgroundColor: index % 2 ? "#f5f5f5" : "#ffffff",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ border: "1px solid #808080" }}
                >
                  {user.name}
                </TableCell>
                <TableCell align="right" sx={{ border: "1px solid #808080" }}>
                  <Image
                   
                   src={user.photo}
                   alt="profile.jpg"
                  height='100px'
                   width='200px'
                   fluid
                  />
                </TableCell>
                <TableCell align="right" sx={{ border: "1px solid #808080" }}>
                  {user.email}
                </TableCell>
                <TableCell align="right" sx={{ border: "1px solid #808080" }}>
                  {user.phone}
                </TableCell>
                <TableCell align="right" sx={{ border: "1px solid #808080" }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <LinkContainer to={`/admin/editUser/${user._id}`}>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mb: 1 }}
                      >
                        Edit
                      </Button>
                    </LinkContainer>
                    {isLoading ? (
                      <LoaderSpinner />
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminDashboard;
