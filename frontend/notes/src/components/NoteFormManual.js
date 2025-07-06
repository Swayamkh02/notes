import { useState } from "react";
import { Box, TextField, Button, Chip, Stack, Typography } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db, serverTimestamp } from "../firebase";


function extractDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export default function NoteFormManual() {
  const [form, setForm] = useState({ title:"", url:"", summary:"",content:"", tags:[], keywords:[], sourceType:"", isArchived:false });
  const [tagInput, setTagInput] = useState("");
  const [kwInput, setKwInput] = useState("");
  const [vectorID, setVectorID] = useState("");
  const [embedding, setEmbedding] = useState("");
  const [loading, setLoading] = useState(false);

  const submitManual = async (note) => {
    console.log('Final Firebase Packet Manual:',note)
      await addDoc(collection(db, "notes"), {
        ...note,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setForm({ 
          title: "", 
          url: "", 
          summary: "", 
          content: "", 
          tags: [], 
          keywords: [], 
          sourceType: "", 
          isArchived: false 
        });
        setTagInput("");
        setKwInput("");
        setVectorID("");
        setEmbedding("");
    };

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

  const handleAdd = (field, input, setter) => {
    if (!input.trim() || form[field].includes(input.trim())) return;
    setter("");
    setForm({ ...form, [field]: [...form[field], input.trim()] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.url || !form.summary || !form.content) return;
    try{
      setLoading(true);
      const payload = {
        'text':form.summary,
      }
      const res = await fetch("https://notes-4y9f.onrender.com/api/get-text-embedding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      const result = await res.json();
      if(result.error){
          alert("Unable to store values, please try again!");
          throw new Error(result.error);
      }
      else{
        setEmbedding(result.embedding);
        const emb = result.embedding;
        console.log("Embedding State",embedding);
        console.log("Embedding var", emb);
        const vdata = {
          "collectionName":"notes",
          "data":[{"summary":form.summary,"tags":form.tags,"title":form.title,"vector":emb}]
        }
        const vec_id = await saveToVdb(vdata);
        if(vec_id == null){
          alert("Unable to upload details! Please try again.");
          throw new Error("VDB Error, No VID Found");
        }
        setVectorID(vec_id);
        console.log("VID State",vectorID);
        console.log("VID var", vec_id);
        if (!vec_id || !embedding){
          alert("Unable to upload details! Please try again.");
          throw new Error("VDB or Embedding Error, Not Found");
        }
        submitManual({ 
          ...form,
          domain: extractDomain(form.url),
          vectorDatabseID:vec_id,
          embedding:embedding,
          isArchived:false,
        });
        
      }
    } catch (err) {
      alert("Unable to add url, please try again later!");
      console.error(err);
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p:2 }}>
      <Stack spacing={2}>
        <TextField label="Title" required value={form.title} onChange={e => setForm({...form, title:e.target.value })}/>
        <TextField label="URL" required value={form.url} onChange={e => setForm({...form, url:e.target.value })}/>
        <TextField label="Content" required multiline rows={3} value={form.content} onChange={e => setForm({...form, content:e.target.value })}/>
        <TextField label="Summary" required multiline rows={3} value={form.summary} onChange={e => setForm({...form, summary:e.target.value })}/>
        <TextField label="Source Type" value={form.sourceType} onChange={e => setForm({...form, sourceType:e.target.value })}/>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField label="Add Tag" size="small" value={tagInput} onChange={e => setTagInput(e.target.value)}/>
          <Button onClick={() => handleAdd("tags", tagInput, setTagInput)}>Add</Button>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {form.tags.map(t => <Chip key={t} label={t} onDelete={()=>setForm({...form, tags:form.tags.filter(x=>x!==t)})}/>)}
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField label="Add Keyword" size="small" value={kwInput} onChange={e => setKwInput(e.target.value)}/>
          <Button onClick={() => handleAdd("keywords", kwInput, setKwInput)}>Add</Button>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {form.keywords.map(k => <Chip key={k} label={k} onDelete={()=>setForm({...form, keywords:form.keywords.filter(x=>x!==k)})}/>)}
        </Stack>
        <Button variant="contained" type="submit">Save</Button>
      </Stack>
    </Box>
  );
}
