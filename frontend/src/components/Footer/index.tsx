import { Typography } from "@mui/material";
const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        padding: "2rem 0",
        textAlign: "center",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Patientor. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
