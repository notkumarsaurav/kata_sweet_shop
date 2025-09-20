import React, { useState, useEffect, useContext } from 'react'; // Combined imports
import { AuthContext } from '../context/AuthContext';      // Import AuthContext
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSweets, searchSweets, deleteSweet } from '../api/sweetApi';

// Cleaned up the duplicate component definition
export const SweetList = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user from context
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSweets();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }
        setSweets(data);
      } catch (error) {
        console.error('Error fetching sweets:', error);
        setError(error.message || 'Failed to fetch sweets');
        toast.error('Failed to fetch sweets');
        setSweets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSweets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSweet(id);
      setSweets((prev) => prev.filter((sweet) => sweet.id !== id));
      toast.success('Sweet deleted successfully');
    } catch (error) {
      console.error('Error deleting sweet:', error);
      toast.error('Failed to delete sweet');
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.name = searchTerm;
      if (categoryFilter) params.category = categoryFilter;

      const results = await searchSweets(params);
      if (!Array.isArray(results)) throw new Error('Invalid search results');
      setSweets(results);
    } catch (error) {
      console.error('Error searching sweets:', error);
      toast.error('Failed to search sweets');
      setSweets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchTerm('');
    setCategoryFilter('');
    try {
      setLoading(true);
      const data = await getSweets();
      setSweets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error clearing search:', error);
      toast.error('Failed to clear search');
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.isArray(sweets)
    ? [...new Set(sweets.map((sweet) => sweet?.category).filter(Boolean))]
    : [];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sweet Inventory
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {/* Search and Filter UI remains the same */}
      </Box>

      {sweets.length === 0 ? (
        <Alert severity="info">No sweets found</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sweets.map((sweet) => (
                <TableRow key={sweet.id}>
                  <TableCell>{sweet.name}</TableCell>
                  <TableCell>{sweet.category}</TableCell>
                  <TableCell>₹{sweet.price}</TableCell>
                  <TableCell>{sweet.quantity}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined" component={Link} to={`/sweets/${sweet.id}`}>
                        View
                      </Button>
                      
                      {/* 👇 Conditionally render Edit/Delete buttons for admin users */}
                      {user && user.role === 'admin' && (
                        <>
                          <Button size="small" variant="outlined" component={Link} to={`/sweets/${sweet.id}/edit`}>
                            Edit
                          </Button>
                          <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(sweet.id)}>
                            Delete
                          </Button>
                        </>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};