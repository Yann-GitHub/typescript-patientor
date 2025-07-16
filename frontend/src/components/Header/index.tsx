import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Stack,
} from "@mui/material";
import { MedicalServices, Dashboard, People, Info } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/", icon: <Dashboard /> },
    { label: "Patients", path: "/patients", icon: <People /> },
    { label: "About", path: "/about", icon: <Info /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        mb: 2,
        background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0 }}>
          {/* Logo et titre */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            <Avatar
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                width: 40,
                height: 40,
              }}
            >
              <MedicalServices />
            </Avatar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                color: "white",
                textDecoration: "none",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              Patientor
            </Typography>
          </Stack>

          {/* Navigation */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: "white",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  bgcolor: isActive(item.path)
                    ? "rgba(255, 255, 255, 0.15)"
                    : "transparent",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                  textTransform: "none",
                  fontWeight: isActive(item.path) ? "bold" : "normal",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
