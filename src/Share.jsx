import { ContentPaste } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/joy";
import { Link, useSearchParams } from "react-router-dom";
import copy from "copy-to-clipboard";

export default function Share() {
  const [searchParams] = useSearchParams();
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
      <Link to="/">
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
      </Link>

      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`https://i.ibb.co/${searchParams.get("m")}/${searchParams.get(
              "title"
            )}.png`}
            width="90%"
            height="auto"
          />
        </Box>
      </Container>

      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Button
          size="lg"
          endDecorator={<ContentPaste fontSize="xl" />}
          onClick={() => {
            copy(window.location.href);
          }}
        >
          Share Link
        </Button>
        <Button
          size="lg"
          endDecorator={<ContentPaste fontSize="xl" />}
          onClick={() => {
            copy(
              `https://i.ibb.co/${searchParams.get("m")}/${searchParams.get(
                "title"
              )}.png`
            );
          }}
        >
          Direct Link
        </Button>
      </Box>
    </Box>
  );
}
