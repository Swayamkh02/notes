import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Container, Grid } from "@mui/material";
import FilterBar from "../components/FilterBar";
import NoteCard from "../components/NoteCard";

export default function SearchPage() {
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({ search:"", sourceType:"", tags:[], tagInput:"", showArchived:false });

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "notes"));
      const snapshot = await getDocs(q);
      setNotes(snapshot.docs.map(d => ({id:d.id, ...d.data()})));
    })();
  }, []);

  const filtered = notes.filter(n => {
    const matchSearch = filters.search === "" ||
      n.title.includes(filters.search) ||
      (n.keywords?.join(" ").includes(filters.search));
    const matchType = !filters.sourceType || n.sourceType === filters.sourceType;
    const matchTags = filters.tags.length === 0 || filters.tags.every(t => n.tags.includes(t));
    const matchArch = filters.showArchived || !n.isArchived;
    return matchSearch && matchType && matchTags && matchArch;
  });

  return (
    <Container sx={{ py:4 }}>
      <FilterBar filters={filters} onChange={setFilters}/>
      <Grid container spacing={2}>
        {filtered.map(note => (
          <Grid item xs={12} key={note.id}>
            <NoteCard note={note} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
