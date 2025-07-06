import { useState } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import NoteFormManual from "../components/NoteFormManual";
import NoteFormURL from "../components/NoteFormURL";
import { db, serverTimestamp } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function AddNotePage() {
  const [tab, setTab] = useState(0);

  // const submitManual = async (note) => {
  //   await addDoc(collection(db, "notes"), {
  //     ...note,
  //     createdAt: serverTimestamp(),
  //     updatedAt: serverTimestamp()
  //   });
  //   setTab(0);
  // };

  return (
    <Box sx={{ maxWidth:600, mx:"auto", mt:4 }}>
      <Tabs value={tab} onChange={(e,v)=>setTab(v)} centered>
        <Tab label="URL" />
        <Tab label="Manual" />
      </Tabs>
      {tab === 1 && <NoteFormManual />}
      {tab === 0 && <NoteFormURL />}
    </Box>
  );
}
