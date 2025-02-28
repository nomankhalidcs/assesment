"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, Button } from '@mui/material';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/users?page=${page}&limit=${limit}`);
              setUsers(response.data.users);
              setLoading(false);
          } catch (err) {
              setError('Failed to fetch users');
              setLoading(false);
          }
      };
      fetchUsers();
  }, [page, limit]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;
  if (error) return <Alert severity="error" style={{ textAlign: 'center', marginTop: '20px' }}>{error}</Alert>;

  return (
      <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User List</h2>
          <TableContainer component={Paper}>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell><strong>Name</strong></TableCell>
                          <TableCell><strong>Email</strong></TableCell>
                          <TableCell><strong>userName</strong></TableCell>
                          
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {users.map(user => (
                          <TableRow key={user._id}>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.userName}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
                  disabled={page === 1}
              >Previous</Button>
              <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => setPage(prev => prev + 1)}
              >Next</Button>
          </div>
      </div>
  );
}
