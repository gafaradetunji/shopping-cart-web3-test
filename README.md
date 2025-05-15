# Shopping Cart Application

A modern shopping cart implementation built with Next.js, TypeScript, Material UI v7, and React Query.

![Shopping Cart Demo](https://shopping-cart-web3-test-git-main-gafaradetunjis-projects.vercel.app/)

## Features

- ✅ Responsive product grid display
- ✅ Dynamic cart management with add/remove functionality
- ✅ Real-time quantity updates and price calculations
- ✅ Coupon code application with validation
- ✅ Persistent cart state using localStorage
- ✅ Data fetching with React Query and Axios
- ✅ Type-safe implementation with TypeScript
- ✅ Modern UI with Material UI v7 components
- ✅ DataGrid integration for advanced cart table functionality

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Product Grid](#product-grid)
  - [Cart Management](#cart-management)
  - [Applying Coupons](#applying-coupons)
- [Architecture](#architecture)
  - [State Management](#state-management)
  - [API Integration](#api-integration)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Installation

To set up the shopping cart application locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/gafaradetunji/shopping-cart-web3-test.git
cd shopping-cart

# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

### Product Grid

The product grid displays a collection of products fetched from an API. Each product card shows:

- Product image
- Title
- Price
- "Add to Cart" button (or quantity controls if already in cart)

**Interacting with Products:**

1. **Adding to Cart**: Click the "Add to Cart" button on any product to add it to your cart.
2. **Quantity Adjustment**: Once a product is in your cart, you'll see quantity controls directly on the product card. Use the "+" and "-" buttons to adjust the quantity.
3. **Badge Indicator**: Products already in your cart display a badge with the current quantity.

### Cart Management

The cart is accessible by clicking the cart icon in the top-right corner of the navigation bar. The icon displays a badge indicating the total number of items in your cart.


**Cart Features:**

1. **View Items**: See all items in your cart, including their images, titles, prices, quantities, and total costs.
2. **Adjust Quantities**: Modify item quantities directly in the cart using the "+" and "-" buttons.
3. **Remove Items**: Remove any item from your cart by clicking the trash icon.
4. **Price Calculations**: The cart automatically calculates subtotal, discount (if a coupon is applied), and the final total.
5. **Persistence**: Your cart is automatically saved to localStorage, so it persists even if you refresh the page or close the browser.

### Applying Coupons

You can apply discount coupons to your order in the cart drawer:

1. Enter the coupon code in the text field at the bottom of the cart.
2. Click the "Apply" button.
3. If valid, a 10% discount will be applied to your order total.

**Valid Coupon Code for Testing:**
- `WEB3BRIDGECOHORTx` (case-sensitive)

The coupon code is validated for the correct format (alphanumeric characters only) and checked against the valid code. Error messages will be displayed for invalid codes.

## Architecture

### State Management

The application uses Zustand for state management, providing a simple and efficient way to handle the shopping cart state.

**Key State Features:**

- **Cart Items**: Stores the collection of items in the cart, including their quantities.
- **Price Calculations**: Manages subtotal, discount, and total calculations.
- **Coupon Management**: Handles coupon application and validation.
- **DataGrid Integration**: Prepares cart data for display in the MUI X DataGrid.

Example of using the cart store:

```typescript
// Accessing cart state in a component
const { items, addItem, removeItem, updateQuantity } = useCartStore();

// Adding an item to the cart
const handleAddToCart = (product) => {
  addItem(product);
};

// Updating quantity
const handleQuantityChange = (productId, newQuantity) => {
  updateQuantity(productId, newQuantity);
};
```

### API Integration

The application uses Axios for API requests and React Query for data fetching, caching, and state management.

**API Structure:**

- **API Client**: Custom Axios instance with interceptors for authentication and error handling.
- **Query Hooks**: React Query hooks for fetching and managing product data.
- **Data Adapters**: Functions to transform API responses to match the application's data model.

Example of using React Query to fetch products:

```typescript
// In a component
const { data, isLoading, error } = useProducts();

if (isLoading) return <LoadingIndicator />;
if (error) return <ErrorMessage error={error} />;

return (
  <Grid container spacing={3}>
    {data?.data.map((product) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
);
```

## Customization

### Theme Customization

The application uses Material UI's theming system. You can customize the theme in `@/ui/assets/style/theme/default-theme.ts`:

```typescript
// pages/_app.tsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});
```

### Product Display Customization

You can modify the product grid layout by adjusting the Grid component properties:

```typescript
// Changing the number of columns per row
<Grid container spacing={3}>
  {products.map((product) => (
    // xs: 1 product per row on extra small screens
    // sm: 2 products per row on small screens
    // md: 3 products per row on medium screens
    // lg: 4 products per row on large screens
    <Grid xs={12} sm={6} md={4} lg={3} key={product.id}>
      <ProductCard product={product} />
    </Grid>
  ))}
</Grid>
```

### Cart Behavior Customization

You can modify the cart's behavior by updating the Zustand store:

```typescript
// Changing the discount percentage
const DISCOUNT_PERCENTAGE = 15; // Changed from 10% to 15%

// Adding a new valid coupon code
const VALID_COUPONS = ['WEB3BRIDGECOHORTx', 'WELCOME10'];

// Modify the validateCoupon function
validateCoupon: (coupon) => {
  const couponRegex = /^[A-Za-z0-9]+$/;
  
  if (!couponRegex.test(coupon)) {
    return { valid: false, message: 'Invalid coupon format' };
  }
  
  const isValid = VALID_COUPONS.includes(coupon);
  return { 
    valid: isValid, 
    message: isValid ? 'Coupon applied successfully!' : 'Invalid coupon code' 
  };
}
```

## Troubleshooting

### Common Issues

1. **Images Not Loading**
   - Check that your API is returning valid image URLs
   - Ensure the image field name in your data model matches what the component expects
   - The application includes fallback images for failed loads

2. **Cart Empty After Adding Items**
   - Verify that localStorage is enabled in your browser
   - Check browser console for any errors
   - Make sure the `updateCartRows` function is being called

3. **DataGrid Errors**
   - Ensure all required fields are present in your cart data
   - Check for null/undefined values in price or quantity fields
   - Verify that your Grid component is using the correct MUI v7 syntax

### Debug Mode

You can enable debug mode for React Query by setting the devtools to visible:

```typescript
<QueryClientProvider client={queryClient}>
  <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </AppRouterCacheProvider>
  <ReactQueryDevtools initialIsOpen={true} /> {/* Set to true for debugging */}
</QueryClientProvider>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Technical Details

### Dependencies

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Static type checking
- **Material UI v7**: Modern UI component library
- **MUI X DataGrid**: Advanced data table component
- **Zustand**: Lightweight state management
- **React Query**: Data fetching and caching
- **Axios**: HTTP client

### Performance Considerations

- The product grid uses lazy loading techniques to optimize performance
- React Query provides automatic caching to reduce unnecessary API calls
- Cart state is persisted to localStorage to minimize data loss
- MUI components are optimized for performance and accessibility

### Browser Compatibility

The application is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Internet Explorer is not supported.

---

Thank you for using our Shopping Cart application! If you have any questions or need assistance, please open an issue on the GitHub repository.
