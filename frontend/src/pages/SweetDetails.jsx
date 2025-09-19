import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@mui/material'
import { toast } from 'react-toastify'
import { getSweetById, deleteSweet } from '../api/sweetApi'

export const SweetDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sweet, setSweet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const data = await getSweetById(id)
        setSweet(data)
      } catch (error) {
        toast.error('Failed to fetch sweet details')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchSweet()
  }, [id, navigate])

  const handleDelete = async () => {
    try {
      await deleteSweet(id)
      toast.success('Sweet deleted successfully')
      navigate('/')
    } catch (error) {
      toast.error('Failed to delete sweet')
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {sweet.name}
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <List>
          <ListItem>
            <ListItemText primary="Category" secondary={sweet.category} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Price" secondary={`₹${sweet.price}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Quantity in Stock" secondary={sweet.quantity} />
          </ListItem>
        </List>
      </Paper>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate(`/sweets/${id}/edit`)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(`/sweets/${id}/purchase`)}
        >
          Purchase
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(`/sweets/${id}/restock`)}
        >
          Restock
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Back to List
        </Button>
      </Box>
    </Box>
  )
}