import { Stack } from "@mui/material";
import { Header } from "../Header";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({
  children
}: LayoutProps) {
  return (
    <Stack
     alignItems={"center"}
     justifyContent={"center"}
    >
      <Header />
      {children}
    </Stack>
  )
}
