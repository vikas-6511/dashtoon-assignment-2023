import Button from "@mui/joy/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import TwoSidedLayout from "./components/TwoSidedLayout";
import Box from "@mui/joy/Box";

export default function HeroLeft01() {
  return (
    <Box
      sx={{
        height: "100vh",
        scrollSnapType: "y mandatory",
        "& > div": {
          scrollSnapAlign: "start",
        },
      }}
    >
      <TwoSidedLayout>
        <Typography color="primary" fontSize="lg" fontWeight="lg">
          The power to do more
        </Typography>
        <Typography
          level="h1"
          fontWeight="xl"
          fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
        >
          The World&apos;s Best Comics Have a New Home
        </Typography>
        <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
          Create yours now and share with your friends. It&apos;s free!
        </Typography>
        <Link to="/create">
          <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
            Get Started
          </Button>
        </Link>
        <Typography
          level="body-xs"
          sx={{
            position: "absolute",
            top: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Dashtoon Assignment
        </Typography>
      </TwoSidedLayout>

      <Typography
        level="body-sm"
        sx={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Made with &#x1F495; by{" "}
        <a style={{
          color: "inherit",
        }} href="https://amreshsinha.vercel.app/" target="_blank" rel="noreferrer">
          Amresh
        </a>
      </Typography>
    </Box>
  );
}
