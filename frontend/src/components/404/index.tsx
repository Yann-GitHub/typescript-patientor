import { Box, Typography, Button, Stack } from "@mui/material";
import { Home, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 160px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // p: 2,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "6rem",
            fontWeight: "bold",
            color: "primary.main",
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Oops! Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you're looking for has gone on vacation! 🏖️
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{
              borderRadius: 2,
              "&:hover": {
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Take Me Home
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              borderRadius: 2,
              "&:hover": {
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Go Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default PageNotFound;
