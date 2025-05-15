"use client";

import { useProducts } from "@/common/hooks";
import { ProductCard } from "@/ui/modules/components";
import { Layout } from "@/ui/modules/partials";
import { Alert, Box, CircularProgress, Container, Grid, Typography } from "@mui/material";

export const Home = () => {
  const { data, isLoading, error } = useProducts();

  return (
   <Layout>
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
      
      {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert severity="error">
              {error instanceof Error ? error.message : 'Failed to load products. Please try again later.'}
            </Alert>
          </Box>
        )  : (
        <Grid container spacing={3}>
          {data?.data.map((product) => (
            <Grid
             size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3
             }}
             key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
   </Layout>
  );
};
