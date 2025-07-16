import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Paper,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import {
  Security,
  Speed,
  Support,
  CloudDone,
  Groups,
  LocalHospital,
} from "@mui/icons-material";

const AboutPage = () => {
  const stats = [
    { label: "Healthcare Providers", value: "2,500+", icon: <Groups /> },
    { label: "Patients Served", value: "150K+", icon: <LocalHospital /> },
    { label: "Uptime", value: "99.9%", icon: <Speed /> },
    { label: "Countries", value: "25+", icon: <CloudDone /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            mb: 3,
          }}
        >
          About Patientor
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto", mb: 4 }}
        >
          Patientor is a cutting-edge patient management system designed to
          revolutionize how healthcare providers manage patient information
          efficiently and securely.
        </Typography>
        <Paper
          sx={{
            p: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            To empower healthcare professionals with innovative technology that
            improves patient care, streamlines workflows, and ensures data
            security while maintaining the highest standards of medical ethics.
          </Typography>
        </Paper>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                height: "100%",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 2,
                }}
              >
                {stat.icon}
              </Avatar>
              <Typography variant="h3" fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Values Section */}
      <Paper
        sx={{
          p: 4,
          mb: 8,
          mt: 13,
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" gutterBottom textAlign="center">
          Our Values
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Security sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Privacy First
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Patient privacy and data security are our top priorities
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Support sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                24/7 Support
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Round-the-clock support for healthcare providers
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Speed sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Innovation
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Continuous improvement and cutting-edge technology
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: "center",
          p: 6,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 3,
          color: "white",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to Transform Your Healthcare Practice?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
          Join thousands of healthcare providers who trust Patientor for their
          patient management needs.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "rgba(255,255,255,0.5)",
              color: "white",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Contact Us
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default AboutPage;
