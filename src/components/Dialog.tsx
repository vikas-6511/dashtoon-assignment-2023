import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { AppContext, ComicStripType } from "../state/context";
import { toast } from "react-toastify";
import imageGen from "../utils/imageGen";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  panelNumber: number;
  apiType: string;
}
export default function Dialog({
  open,
  setOpen,
  panelNumber,
  apiType = "default",
}: DialogProps) {
  const { comicData, setComicData } = useContext(AppContext);
  const [apiCallStatus, setApiCallStatus] = useState<string | null>(null);
  const [png, setPng] = useState();

  const imageGenerationHandler = async (query: string) => {
    setApiCallStatus("loading");

    imageGen(query, apiType)
      .then((res) => {
        // console.log("new res", res);

        let newData: ComicStripType = { ...comicData };
        newData[panelNumber].image = res as string;
        setComicData(newData);
        setApiCallStatus("success");
      })
      .catch((err) => {
        console.log("err", err);
        setApiCallStatus("error");
      });
  };

  useEffect(() => {
    if (apiCallStatus) {
      if (apiCallStatus === "error") {
        toast.error("Image generation failed!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setApiCallStatus(null);
      } else if (apiCallStatus === "success") {
        toast.success("Image generated and added successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setApiCallStatus(null);
      } else if (apiCallStatus === "loading") {
        toast.info("Image generation started!", {
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
    }
  }, [apiCallStatus]);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>Fill in the information of the project.</DialogContent>
        <Stack spacing={2}>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (
                (event.target as any).prompt.value !== ("" || undefined || null)
              ) {
                imageGenerationHandler((event.target as any).prompt.value);
                let newData = { ...comicData };
                newData[panelNumber].prompt = (
                  event.target as any
                ).prompt.value;
                setComicData(newData);
              }
            }}
          >
            <Stack spacing={1}>
              <FormControl>
                <FormLabel>Prompt</FormLabel>
                <Input
                  type="text"
                  name="prompt"
                  id="prompt"
                  autoFocus
                  required
                  defaultValue={
                    comicData[panelNumber] && comicData[panelNumber].prompt
                      ? comicData[panelNumber].prompt!
                      : undefined
                  }
                />
              </FormControl>
              <Button type="submit" disabled={apiCallStatus ? true : false}>
                {apiCallStatus ? "Generating" : "Create Image"}
              </Button>
            </Stack>
          </form>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (
                (event.target as any).speechBubble.value !==
                ("" || null || undefined)
              ) {
                let newData = { ...comicData };
                newData[panelNumber].speechBubble = (
                  event.target as any
                ).speechBubble.value;
                setComicData(newData);
                toast.success("Speech Bubble Updated!");
              }
            }}
          >
            <Stack spacing={1}>
              <FormControl>
                <FormLabel>Speech Bubble Text</FormLabel>
                <Input
                  type="text"
                  name="speechBubble"
                  id="speechBubble"
                  defaultValue={
                    comicData[panelNumber] &&
                    comicData[panelNumber].speechBubble
                      ? comicData[panelNumber].speechBubble!
                      : undefined
                  }
                  required
                />
              </FormControl>
              <Button type="submit">Add</Button>
            </Stack>
          </form>
        </Stack>
        <img src={png} alt="" />
        <Button color="neutral" onClick={() => setOpen(false)}>
          Close
        </Button>
      </ModalDialog>
    </Modal>
  );
}
