import { Box, Container, Typography, Button } from "@mui/joy";
import ComicGrid from "./components/ComicGrid";
import { ContentPaste } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Dialog from "./components/Dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import imageShare from "./utils/imageShare";
import Select from "react-select";

export default function Create() {
  // API Selector State (default, comic-diffusion)
  const [apiType, setApiType] = useState("default");
  const options = [
    { value: "default", label: "default" },
    { value: "comic-diffusion", label: "comic-diffusion" },
  ];

  // Dialog state
  const [open, setOpen] = useState(false);
  const [panelNumber, setPanelNumber] = useState(0);

  // ComicStrip ref for image capture
  const comicStripRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  const [imageBlob, setImageBlob] = useState("");
  const captureImage = async () => {
    if (comicStripRef.current) {
      const canvas = await html2canvas(comicStripRef.current, {
        scale: 2,
      });
      const dataURL = canvas.toDataURL("image/png");
      canvas.toBlob((blob) => setImageBlob(blob));
      const image = new Image();
      image.src = dataURL;
      setImageSrc(dataURL);
    }
  };

  const handleCopyClick = () => {
    captureImage().then(() => {
      navigator.clipboard.write([
        new ClipboardItem({
          [imageBlob.type]: imageBlob,
        }),
      ]);
    });
  };

  const handleDownloadClick = () => {
    captureImage().then(() => {
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = "image.png";
      link.click();
    });
  };

  const navigate = useNavigate();
  const shareHandler = async () => {
    toast.info("Image upload started!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const canvas = await html2canvas(comicStripRef.current, {
      scale: 4,
    });
    const dataURL = canvas
      .toDataURL("image/png")
      .replace("data:image/png;base64,", "");
    imageShare(dataURL).then((res) => {
      // console.log(res);
      if (res) {
        toast.success("Image uploaded successfully! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const ids = res.data.data.display_url
          .replace("https://i.ibb.co/", "")
          .replace(".png", "")
          .split("/");
        navigate(`/share?m=${ids[0]}&title=${ids[1]}`);
      } else {
        toast.error("Image upload failed!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  const handleApiTypeChange = (event) => {
    setApiType(event.value);
  };

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
      {/* <Link to="/"> */}
      <Box
        sx={{
          position: "absolute",
          top: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 2,
          zIndex: 10,
          color: "#000",
          minWidth: 275,
        }}
      >
        <Typography level="body-sm">Choose API</Typography>
        <Box
          sx={{
            flex: 1,
            fontSize: "14px",
          }}
        >
          <Select
            options={options}
            defaultValue={{ label: "default", value: "default" }}
            onChange={handleApiTypeChange}
          />
        </Box>
      </Box>

      {/* </Link> */}

      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ComicGrid
          comicGridRef={comicStripRef}
          setOpen={setOpen}
          setPanelNumber={setPanelNumber}
          apiType={apiType}
        />
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
        <Button size="lg" color="neutral" onClick={shareHandler}>
          Share
        </Button>
        <Button size="lg" onClick={handleDownloadClick}>
          Download
        </Button>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              right: -24,
              top: -18,
            }}
            onClick={handleCopyClick}
          >
            <ContentPaste />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={open} setOpen={setOpen} panelNumber={panelNumber} apiType={apiType} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}
