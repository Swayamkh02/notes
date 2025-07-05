import { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { db, serverTimestamp } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function NoteFormURL() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function extractDomain(url) {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch {
      return "";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5500/api/notes/from-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if(data.error){
        alert("Unable to store url, please try again!");
        throw new Error(data.error);
      }
      else{
        // vec_id = 
        addDoc(collection(db, "notes"), {
          ...data,
          domain: extractDomain(url),
          url:url,
          // vectorID:vec_id,
          isArchived:false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        setUrl("");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p:2, textAlign:"center" }}>
      <TextField label="URL" required value={url} onChange={e => setUrl(e.target.value)} fullWidth disabled={loading}/>
      <Box mt={2}>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24}/> : "Fetch & Save"}
        </Button>
      </Box>
    </Box>
  );
}
