import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
  Stack,
  Avatar,
  LinearProgress,
  Divider,
} from "@mui/material";
import {
  PersonAdd,
  People,
  LocalHospital,
  Analytics,
  Schedule,
  Notifications,
  Assignment,
  Healing,
  HealthAndSafety,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // Mock data for stats, recent activities, and quick actions
  const stats = {
    totalPatients: 1247,
    todayAppointments: 23,
    pendingTests: 15,
    criticalCases: 3,
  };

  const recentActivities = [
    {
      id: 1,
      action: "New patient registered",
      time: "2 hours ago",
      type: "patient",
    },
    { id: 2, action: "Lab results uploaded", time: "4 hours ago", type: "lab" },
    {
      id: 3,
      action: "Appointment scheduled",
      time: "6 hours ago",
      type: "appointment",
    },
  ];

  // Quick actions for the dashboard
  const quickActions = [
    {
      title: "Add New Patient",
      description: "Register a new patient in the system",
      icon: <PersonAdd />,
      color: "primary",
      action: () => navigate("/patients/"),
    },
    {
      title: "View All Patients",
      description: "Browse and manage existing patients",
      icon: <People />,
      color: "secondary",
      action: () => navigate("/patients"),
    },
    {
      title: "Emergency Cases",
      description: "View critical and urgent cases",
      icon: <LocalHospital />,
      color: "error",
      action: () => navigate("/emergency"),
    },
    {
      title: "Analytics",
      description: "View system reports and statistics",
      icon: <Analytics />,
      color: "info",
      action: () => navigate("/analytics"),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            textAlign: "center",
            mb: 2,
          }}
        >
          Welcome to Patientor
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Your comprehensive healthcare management system
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2 }}>
                  <People />
                </Avatar>
                <Typography variant="h6">Total Patients</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.totalPatients.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2 }}>
                  <Schedule />
                </Avatar>
                <Typography variant="h6">Today's Appointments</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.todayAppointments}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                5 upcoming
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2 }}>
                  <Assignment />
                </Avatar>
                <Typography variant="h6">Pending Tests</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.pendingTests}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Lab results pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              color: "white",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", mr: 2 }}>
                  <LocalHospital />
                </Avatar>
                <Typography variant="h6">Critical Cases</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.criticalCases}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Requires attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Healing sx={{ mr: 1, color: "primary.main" }} />
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                    onClick={action.action}
                  >
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: `${action.color}.light`,
                            color: `${action.color}.main`,
                            mr: 2,
                          }}
                        >
                          {action.icon}
                        </Avatar>
                        <Typography variant="h6">{action.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HealthAndSafety sx={{ mr: 1, color: "success.main" }} />
              System Status
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Database Performance</Typography>
                  <Typography variant="body2" color="success.main">
                    95%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={95}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "success.main",
                    },
                  }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Server Response</Typography>
                  <Typography variant="body2" color="info.main">
                    87%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={87}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "info.main",
                    },
                  }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Security Status</Typography>
                  <Typography variant="body2" color="success.main">
                    100%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "success.main",
                    },
                  }}
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Notifications sx={{ mr: 1, color: "warning.main" }} />
              Recent Activities
            </Typography>
            <Stack spacing={2}>
              {recentActivities.map((activity) => (
                <Box key={activity.id}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor:
                          activity.type === "patient"
                            ? "primary.light"
                            : activity.type === "lab"
                            ? "success.light"
                            : "info.light",
                        mr: 2,
                      }}
                    >
                      {activity.type === "patient" ? (
                        <PersonAdd fontSize="small" />
                      ) : activity.type === "lab" ? (
                        <Analytics fontSize="small" />
                      ) : (
                        <Schedule fontSize="small" />
                      )}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {activity.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
              color: "white",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <LocalHospital sx={{ mr: 1 }} />
              Emergency Alert
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              {stats.criticalCases} patients require immediate attention
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
              onClick={() => navigate("/emergency")}
            >
              View Details
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 6,
          p: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 2,
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to manage your patients?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
          Access comprehensive patient records, schedule appointments, and track
          medical history
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/patients"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            View Patients
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
            Learn More
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default HomePage;
