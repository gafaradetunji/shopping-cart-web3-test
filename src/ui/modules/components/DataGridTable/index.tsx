import React, { useState } from 'react';
import { 
  Drawer, Box, Typography, IconButton, Divider, TextField, 
  Button, Stack, Alert, Grid
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCartStore } from '@/common/hooks';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const { 
    cartRows,
    subtotal, 
    discount, 
    total, 
    removeItem, 
    updateQuantity, 
    validateCoupon, 
    applyCoupon 
  } = useCartStore();
  
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  
  const handleApplyCoupon = () => {
    const result = validateCoupon(couponCode);
    setCouponMessage({ text: result.message, type: result.valid ? 'success' : 'error' });
    applyCoupon(result.valid);
  };
  
  // DataGrid columns
  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Product',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={params.value as string}
            alt={params.row.title}
            sx={{ width: 50, height: 50, objectFit: 'cover' }}
          />
          <Typography variant="body2">{params.row.title}</Typography>
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: (params: any) => 
        `$${(params.value as number).toFixed(2)}`,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            size="small"
            onClick={() => updateQuantity(params.row.productId, Math.max(1, params.row.quantity - 1))}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          
          <Typography>{params.value}</Typography>
          
          <IconButton 
            size="small"
            onClick={() => updateQuantity(params.row.productId, params.row.quantity + 1)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
      valueFormatter: (params: any) => 
        `$${(params.value as number).toFixed(2)}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          color="error"
          onClick={() => removeItem(params.row.productId)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 650 } } }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Your Shopping Cart</Typography>
          <IconButton onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {cartRows.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add some products to see them here!
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, mb: 3 }}>
              <DataGrid
                rows={cartRows}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
                autoHeight
                sx={{
                  '& .MuiDataGrid-cell:focus': {
                    outline: 'none',
                  },
                }}
              />
            </Box>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{
                xs: 12,
                sm:8
              }}>
                <TextField
                  fullWidth
                  label="Coupon Code"
                  variant="outlined"
                  size="small"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </Grid>
              <Grid size={{
                xs: 12,
                sm:4
              }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  onClick={handleApplyCoupon}
                  sx={{ height: '100%' }}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
            
            {couponMessage && (
              <Alert 
                severity={couponMessage.type} 
                sx={{ mb: 3 }}
                onClose={() => setCouponMessage(null)}
              >
                {couponMessage.text}
              </Alert>
            )}
            
            <Box sx={{ ml: 'auto', width: { xs: '100%', sm: '300px' } }}>
              <Stack spacing={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">Discount:</Typography>
                  <Typography variant="body1" color="error">
                    -${discount.toFixed(2)}
                  </Typography>
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                </Box>
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};
