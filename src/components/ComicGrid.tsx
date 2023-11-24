import React, { useContext } from "react";
import { styled } from "@mui/joy/styles";
import { Box, Grid, Sheet } from "@mui/joy";
import { AppContext } from "../state/context";
import ItemMod from "./ItemMod";

interface ComicGridProps {
  comicGridRef: React.RefObject<HTMLDivElement>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPanelNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function ComicGrid({
  comicGridRef,
  setOpen,
  setPanelNumber,
}: ComicGridProps) {
  const { comicData } = useContext(AppContext);

  const layouts = {
    0: [4.5, 7.5, 7.5, 4.5, 3.8, 4.4, 3.8, 4.1, 3.8, 4.1],
    1: [4, 4, 4, 4, 8, 4, 4, 4, 8, 4],
  };
  return (
    <Box
      ref={comicGridRef}
      sx={{
        background: "white",
        border: "2px solid black",
        padding: 1,
        maxWidth: 600,
        aspectRatio: 363 / 477,
      }}
    >
      <Grid container spacing={1} sx={{ flexGrow: 1, height: "100%" }}>
        {layouts[0].map((item, index) => {
          return (
            <ItemMod
              key={index}
              setOpen={setOpen}
              panelNumber={index + 1}
              setPanelNumber={setPanelNumber}
              comicData={comicData[index + 1]}
              xs={item}
            />
          );
        })}
      </Grid>
      {/* <Grid container spacing={1} sx={{ flexGrow: 1, height: "100%" }}>
        <ItemMod
          setOpen={setOpen}
          panelNumber={1}
          setPanelNumber={setPanelNumber}
          comicData={comicData[1]}
          xs={4}
        />
        <ItemMod
          setOpen={setOpen}
          panelNumber={2}
          setPanelNumber={setPanelNumber}
          comicData={comicData[2]}
          xs={8}
        />

        <ItemMod
          setOpen={setOpen}
          panelNumber={3}
          setPanelNumber={setPanelNumber}
          comicData={comicData[3]}
          xs={8}
        />
        <ItemMod
          setOpen={setOpen}
          panelNumber={4}
          setPanelNumber={setPanelNumber}
          comicData={comicData[4]}
          xs={4}
        />

        <ItemMod
          setOpen={setOpen}
          panelNumber={5}
          setPanelNumber={setPanelNumber}
          comicData={comicData[5]}
          xs={4}
        />
        <ItemMod
          setOpen={setOpen}
          panelNumber={6}
          setPanelNumber={setPanelNumber}
          comicData={comicData[6]}
          xs={4}
        />
        <ItemMod
          setOpen={setOpen}
          panelNumber={7}
          setPanelNumber={setPanelNumber}
          comicData={comicData[7]}
          xs={4}
        />

        <ItemMod
          setOpen={setOpen}
          panelNumber={8}
          setPanelNumber={setPanelNumber}
          comicData={comicData[8]}
          xs={4}
        />
        <ItemMod
          setOpen={setOpen}
          panelNumber={9}
          setPanelNumber={setPanelNumber}
          comicData={comicData[9]}
          xs={4}
        />
        <ItemMod
          setOpen={setOpen}
          panelNumber={10}
          setPanelNumber={setPanelNumber}
          comicData={comicData[10]}
          xs={4}
        />
      </Grid> */}
    </Box>
  );
}
