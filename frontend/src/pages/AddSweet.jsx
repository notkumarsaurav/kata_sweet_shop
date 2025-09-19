import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addSweet } from '../api/sweetApi'

const categories = ['Nut-Based', 'Milk-Based', 'Vegetable-Based', 'Chocolate', 'Candy', 'Pastry']

export const AddSweet = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const sweetData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      }
      await addSweet(sweetData)
      toast.success('Sweet added successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add sweet')
    }
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Add New Sweet
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          inputProps={{ min: 0, step: 0.01 }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          inputProps={{ min: 0 }}
          required
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained">
            Add Sweet
          </Button>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  )
}