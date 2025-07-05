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
import LaunchIcon from '@mui/icons-material/Launch';
import { useState } from "react";

export default function NoteCard({ note }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, width: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {note.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {note.domain}
        </Typography>

        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
          {note.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
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
          <Typography variant="body2" color="text.primary">
            <strong>Summary:</strong> {note.summary || "No summary available."}
          </Typography>
        </Box>
      </CardContent>

      <CardActions disableSpacing sx={{ px: 2 }}>
        <IconButton onClick={() => setExpanded((prev) => !prev)} size="small">
            {expanded?
            <ExpandLessIcon/>
            :
            <ExpandMoreIcon />
            }
        </IconButton>

        <IconButton
            href={note.url}
            target="_blank"
            size="small"
            sx={{ ml: 1 }}
            >
            <LaunchIcon />
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
            <strong>Keywords:</strong> {note.keywords ?
            note.keywords.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
            ))
            :
            "None"
            }
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
