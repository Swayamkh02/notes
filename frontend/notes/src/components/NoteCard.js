import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Collapse,
  IconButton,
  Chip,
  Stack,
  Link,
  Box,
  Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveTwoTone';
import LaunchIcon from '@mui/icons-material/Launch';
import { useState } from "react";
import { deleteDoc, doc ,collection } from "firebase/firestore";
import { db } from "../firebase";

export default function NoteCard({ note }) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(note);


  const deleteFromVdb = async (payload) => {
    const url = 'https://in03-efc7c2dbf19000e.serverless.gcp-us-west1.cloud.zilliz.com/v2/vectordb/entities/delete';
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 719260240d93570d9a4ff798c1b33d1c594dffc46dbc26950118633178178ca7cd0f85c9687927f1148a5e63ed892123da342f37',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      // '{"collectionName":"notes","filter":"primery key in []"}'
    };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("[VDB RESPONSE]", result);
        if (result.code == 0){
          return true;
          // throw new Error(result.error);
        }
        return false;
      } catch (error) {
        console.error(error);
        return null;
      }
  }

  const deleteFromFirebase = async(noteID) => {
    console.log('Final Firebase Packet Manual:',note)
      try {
        await deleteDoc(doc(db, "notes", noteID));
        console.log("Document deleted!");
        return true;
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
  };

  const handleDelete = async (e) => {
    e?.preventDefault();
    if (!note.id || !note.vectorDatabseID){
        console.log(note.id,"_______",note.vectorDatabseID);
        alert("Issue in deleting note, try later!");
        return;
    } 
    try{
      setLoading(true);
      const ids = Array.isArray(note.vectorDatabseID) 
        ? note.vectorDatabseID 
        : [note.vectorDatabseID];

      const payload = {
        collectionName: "notes",
        filter: `primary_key in [${ids.join(",")}]`
      };
      const vdbDeletionRes = await deleteFromVdb(payload);
      if (vdbDeletionRes!= true){
        alert("Unable to delete the note");
        return;
      }
      const firebaseDeletionRes = await deleteFromFirebase(note.id);
      if (firebaseDeletionRes!= true){
        alert("Unable to delete the note");
        return;
      }
      window.location.reload()
    } catch (err) {
      alert("Unable to add url, please try again later!");
      console.error(err);
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <Card variant="outlined" sx={{ 
      borderRadius: 3, 
      width: "100%" ,
      '&::-webkit-scrollbar': {
        height: 4,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ccc',
        borderRadius: 4,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#aaa',
      },
      
      }}>
      <CardContent>
        <Box display="flex" alignItems="start" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            {note.title}
          </Typography>
          <IconButton
            href={note.url}
            target="_blank"
            size="medium"
            sx={{
              color: 'primary.main',
              p: { xs: 0.5, sm: 1 },
              '& svg': {
                fontSize: '1.25rem', 
              },
            }}
            color="primary"
          >
            <LaunchIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {note.domain}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          mt={1}
          flexWrap="wrap"
          useFlexGap
        >
          {note.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" color="primary" variant="outlined"/>
          ))}
        </Stack>

        {/* Summary Preview */}
        <Box
          sx={{
            mt: 2,
            maxHeight: 72,
            overflowY: "auto",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            whiteSpace: "normal"
          }}
        >
          <Typography variant="body2" color="text.primary" sx={{
            '&::-webkit-scrollbar': {
              height: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ccc',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#aaa',
            },
          }}>
            <strong>Summary:</strong> {note.summary || "No summary available."}
          </Typography>
        </Box>
      </CardContent>

      <CardActions disableSpacing sx={{ px: 2 }}>
        <IconButton onClick={() => setExpanded((prev) => !prev)} size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>

        <IconButton size="small" disabled={true}>
          <ArchiveTwoToneIcon color={note.isArchived === false ? "" : "primary"} />
        </IconButton>

        <IconButton
          onClick={(e) => handleDelete(e)}
          size="small"
          sx={{ ml: 'auto' }} // ⬅ This moves it to the right
        >
          <DeleteTwoToneIcon color="error" />
        </IconButton>
      </CardActions>


      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* <Divider /> */}
        <CardContent>
          <Typography variant="body2" gutterBottom>
            <strong>Content:</strong> <Box
            sx={{
                maxHeight: 96,
                overflowY: "auto",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                paddingLeft:2,
                marginBottom:3,
            }}
            >
            <Typography variant="body2">
                {note.content || "No content available."}
            </Typography>
            </Box>
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Keywords:</strong>{' '}
            {note.keywords && note.keywords.length > 0 ? (
              <Box component="span" sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 0.5, ml: 1 }}>
                {note.keywords.map((tag) => (
                  <Chip key={tag} label={tag} size="small" color="primary"/>
                ))}
              </Box>
            ) : (
              'None'
            )}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Source:</strong> {note.sourceType}
          </Typography>
          <Typography variant="body2">
            <strong>Archived:</strong> {note.isArchived ? "Yes" : "No"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
