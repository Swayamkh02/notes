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
        <Typography variant="h6" gutterBottom>
          {note.title}
        </Typography>
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
            color="primary"
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
