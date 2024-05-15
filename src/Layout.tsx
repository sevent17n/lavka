import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./shared";
import { Navbar, Sidebar } from "./widgets";

export const Layout = () => {
  return (
    <AuthProvider>
      <Box sx={{ width: "100vw", height: "100vh" }}>
        <Box
          sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
        >
          <Navbar />
        </Box>
        <Grid
          container
          spacing={0}
          sx={{ height: "100vh", paddingTop: "64px" }}
        >
          <Grid
            xs={2}
            item
            sx={{
              position: "fixed",
              top: "64px",
              bottom: 0,
              height: "calc(100vh - 64px)",
              overflowY: "auto",
              zIndex: 1000,
              width: 250,
            }}
          >
            <Sidebar />
          </Grid>
          <Grid
            xs={10}
            item
            sx={{
              marginLeft: "16.666%",
              height: "calc(100vh - 64px)",
              overflowY: "auto",
              padding: 5,
            }}
          >
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </AuthProvider>
  );
};
