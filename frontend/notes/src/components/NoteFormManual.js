import { useState } from "react";
import { Box, TextField, Button, Chip, Stack, Typography } from "@mui/material";

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export default function NoteFormManual({ onSubmit }) {
  const [form, setForm] = useState({ title:"", url:"", summary:"",content:"", tags:[], keywords:[], sourceType:"", isArchived:false });
  const [tagInput, setTagInput] = useState("");
  const [kwInput, setKwInput] = useState("");

  const handleAdd = (field, input, setter) => {
    if (!input.trim() || form[field].includes(input.trim())) return;
    setter("");
    setForm({ ...form, [field]: [...form[field], input.trim()] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.url) return;
    onSubmit({ 
      ...form,
      domain: extractDomain(form.url)
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p:2 }}>
      <Stack spacing={2}>
        <TextField label="Title" required value={form.title} onChange={e => setForm({...form, title:e.target.value })}/>
        <TextField label="URL" required value={form.url} onChange={e => setForm({...form, url:e.target.value })}/>
        <TextField label="Content" multiline rows={3} value={form.content} onChange={e => setForm({...form, content:e.target.value })}/>
        <TextField label="Summary" multiline rows={3} value={form.summary} onChange={e => setForm({...form, summary:e.target.value })}/>
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
