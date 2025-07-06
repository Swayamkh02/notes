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

  const saveToVdb = async (data) => {
    const url = 'https://in03-efc7c2dbf19000e.serverless.gcp-us-west1.cloud.zilliz.com/v2/vectordb/entities/insert';
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 719260240d93570d9a4ff798c1b33d1c594dffc46dbc26950118633178178ca7cd0f85c9687927f1148a5e63ed892123da342f37',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      // '{"collectionName":"notes","data":[{"summary":"","tags":["","",""],"vector":[]}'
    };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("[VDB RESPONSE]", result);
        console.log("✅ VDB insert ID:", result?.data?.insertIds?.[0]);
        return result?.data?.insertIds?.[0] ?? null;
      } catch (error) {
        console.error(error);
        return null;
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch("https://notes-4y9f.onrender.com/api/notes/from-url", {
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
        const vdata = {
          "collectionName":"notes",
          "data":[{"summary":data.summary,"tags":data.tags,"title":data.title,"vector":data.embedding}]
        }
        const vec_id = await saveToVdb(vdata);
        console.log(vec_id);
        addDoc(collection(db, "notes"), {
          ...data,
          domain: extractDomain(url),
          url:url,
          vectorDatabseID:vec_id,
          isArchived:false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        setUrl("");
      }
    } catch (err) {
      alert("Unable to add url, please try again later!");
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
