import React, { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemDecorator,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import { Info } from "@mui/icons-material";

export default function NoteInfo() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <IconButton
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          "@media (max-width:700px)": {
            display: "none",
          },
        }}
      >
        <Info />
      </IconButton>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Note 🥓
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            <List>
              <ListItem>
                <ListItemDecorator>🧅</ListItemDecorator>Added an API Selector for selecting alternative Huggingface Model API for testing if the default one is not working.
              </ListItem>
              <ListItem>
                <ListItemDecorator>🧅</ListItemDecorator>Due to the short time
                frame (2 days), the assignment solution is mainly focused on the
                main functionality.
              </ListItem>
              <ListItem>
                <ListItemDecorator>🧅</ListItemDecorator>Many extra feature
                additions and improvements could have been done if time
                persisted. Endsemesters from 19 Nov.
              </ListItem>
            </List>
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
}
