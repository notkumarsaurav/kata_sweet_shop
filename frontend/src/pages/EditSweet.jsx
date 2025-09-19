import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress, // Add this import
} from "@mui/material";
import { toast } from "react-toastify";
import { getSweetById, updateSweet } from "../api/sweetApi";

const categories = [
  "Nut-Based",
  "Milk-Based",
  "Vegetable-Based",
  "Chocolate",
  "Candy",
  "Pastry",
];

export const EditSweet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const sweet = await getSweetById(id);
        setFormData({
          name: sweet.name,
          category: sweet.category,
          price: sweet.price.toString(),
          quantity: sweet.quantity.toString(),
        });
      } catch (error) {
        toast.error("Failed to load sweet details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchSweet();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sweetData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      };
      await updateSweet(id, sweetData);
      toast.success("Sweet updated successfully!");
      navigate(`/sweets/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update sweet");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Edit Sweet
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
            {categories.map((category) => (
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
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained">
            Update Sweet
          </Button>
          <Button variant="outlined" onClick={() => navigate(`/sweets/${id}`)}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};
