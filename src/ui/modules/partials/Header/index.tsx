import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '@/common/hooks';
import { Cart } from '../../components';

export const Header: React.FC = () => {
  const items = useCartStore(state => state.items);
  const updateCartRows = useCartStore(state => state.updateCartRows);
  const [cartOpen, setCartOpen] = useState(false);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleOpenCart = () => {
    updateCartRows();
    setCartOpen(true);
  };
  
  return (
    <>
      <AppBar position="sticky" color="default" elevation={1} sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shopping Cart Demo
          </Typography>
          <Box>
            <IconButton color="inherit" onClick={handleOpenCart}>
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};
