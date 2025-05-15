import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Avatar, Snackbar, Alert } from '@mui/material';
import { Product } from '@/common/types';
import { useCartStore } from '@/common/hooks';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  
  const handleAddToCart = () => {
    addItem(product);
    setOpenSnackbar(true);
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  return (
    <>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: '0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 3
          }
        }}
      >
        {/* <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'cover' }}
        /> */}
        <Avatar 
         src={product.image}
         alt={product.title}
         sx={{
          width: '100%',
          height: '140px',
          borderRadius: '8px'
         }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {product.description}
          </Typography>
          <Typography variant="body1" color="text.primary" fontWeight="bold" mt={2}>
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={2000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {product.title} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};
