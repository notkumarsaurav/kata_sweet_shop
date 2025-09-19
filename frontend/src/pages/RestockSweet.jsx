import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@mui/material'
import { toast } from 'react-toastify'
import { getSweetById, restockSweet } from '../api/sweetApi'

export const RestockSweet = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sweet, setSweet] = useState(null)
  const [quantity, setQuantity] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const data = await getSweetById(id)
        setSweet(data)
      } catch (error) {
        toast.error('Failed to fetch sweet details')
        navigate(`/sweets/${id}`)
      } finally {
        setLoading(false)
      }
    }
    fetchSweet()
  }, [id, navigate])

  const handleRestock = async () => {
    try {
      await restockSweet(id, parseInt(quantity))
      toast.success(`Restocked ${quantity} ${sweet.name}(s) successfully!`)
      navigate(`/sweets/${id}`)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to restock sweet')
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
      <Typography variant="h5" gutterBottom>
        Restock {sweet.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Current Stock: {sweet.quantity}
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Quantity to Restock"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        inputProps={{ min: 1 }}
      />
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleRestock}
          disabled={!quantity || parseInt(quantity) <= 0}
        >
          Confirm Restock
        </Button>
        <Button variant="outlined" onClick={() => navigate(`/sweets/${id}`)}>
          Cancel
        </Button>
      </Box>
    </Box>
  )
}