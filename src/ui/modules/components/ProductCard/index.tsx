// components/ProductCard.tsx
import React from 'react';
import { 
  Card, CardContent, Typography, CardActions, 
  Button, Snackbar, Alert, Badge, Box, IconButton, 
  Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '@/common/hooks';
import { Product } from '@/common/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, items, updateQuantity, removeItem } = useCartStore();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  
  // Check if the product is already in the cart
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  
  const handleAddToCart = () => {
    addItem(product);
    setOpenSnackbar(true);
  };
  
  const handleIncrement = () => {
    if (quantity === 0) {
      addItem(product);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
    setOpenSnackbar(true);
  };
  
  const handleDecrement = () => {
    if (quantity === 1) {
      removeItem(product.id);
    } else if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
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
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 3
          }
        }}
      >
        {/* Badge showing item quantity if in cart */}
        {quantity > 0 && (
          <Badge 
            badgeContent={quantity} 
            color="primary" 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              right: 10,
              zIndex: 1,
              '& .MuiBadge-badge': {
                backgroundColor: '#3f51b5',
                color: 'white',
              }
            }}
          >
            <ShoppingCartIcon color="action" />
          </Badge>
        )}
        
        <Avatar 
          src={product.url}
          alt={product.title}
          sx={{ 
            width: "100%", 
            height: "140px",
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
          {quantity === 0 ? (
            // Show "Add to Cart" if item is not in cart
            <Button 
              fullWidth 
              variant="contained" 
              color="primary"
              onClick={handleAddToCart}
              startIcon={<AddIcon />}
            >
              Add to Cart
            </Button>
          ) : (
            // Show quantity controls if item is in cart
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <IconButton 
                color="primary" 
                onClick={handleDecrement}
                size="small"
              >
                <RemoveIcon />
              </IconButton>
              
              <Typography variant="body1">{quantity} in cart</Typography>
              
              <IconButton 
                color="primary" 
                onClick={handleIncrement}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </CardActions>
      </Card>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={2000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {product.title} {quantity > 1 ? `(${quantity})` : ''} in your cart
        </Alert>
      </Snackbar>
    </>
  );
};