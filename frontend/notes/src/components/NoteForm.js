// import { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Chip,
//   Stack,
//   Typography
// } from "@mui/material";

// function extractDomain(url) {
//   try {
//     const domain = new URL(url).hostname.replace("www.", "");
//     return domain;
//   } catch {
//     return "";
//   }
// }

// export default function NoteForm({ onAdd }) {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title || !url) return;

//     const newNote = {
//       title,
//       url,
//       domain: extractDomain(url),
//       tags,
//     };

//     onAdd(newNote);
//     setTitle("");
//     setUrl("");
//     setTags([]);
//     setTagInput("");
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !tags.includes(tagInput.trim())) {
//       setTags([...tags, tagInput.trim()]);
//     }
//     setTagInput("");
//   };

//   const handleDeleteTag = (tagToDelete) => {
//     setTags(tags.filter((tag) => tag !== tagToDelete));
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
//       <Stack spacing={2}>
//         <TextField
//           label="Title"
//           value={title}
//           required
//           onChange={(e) => setTitle(e.target.value)}
//           fullWidth
//         />
//         <TextField
//           label="URL"
//           value={url}
//           required
//           onChange={(e) => setUrl(e.target.value)}
//           fullWidth
//         />
//         <Box>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <TextField
//               label="Add Tag"
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
//               size="small"
//             />
//             <Button variant="outlined" onClick={handleAddTag}>
//               Add Tag
//             </Button>
//           </Stack>
//           <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
//             {tags.map((tag) => (
//               <Chip
//                 key={tag}
//                 label={tag}
//                 onDelete={() => handleDeleteTag(tag)}
//                 sx={{ mb: 1 }}
//               />
//             ))}
//           </Stack>
//         </Box>
//         <Button variant="contained" type="submit">
//           Save Note
//         </Button>
//       </Stack>
//     </Box>
//   );
// }
