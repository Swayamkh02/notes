import { Box, TextField, Stack, Chip, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel } from "@mui/material";

export default function FilterBar({ filters, onChange }) {
  return (
    <Box sx={{ mb:2, p:2 }}>
      <Stack spacing={2} direction="row" flexWrap="wrap">
        <TextField label="Search" value={filters.search} onChange={e => onChange({...filters, search:e.target.value})}/>
        <FormControl sx={{ minWidth:120 }}>
          <InputLabel>Source Type</InputLabel>
          <Select value={filters.sourceType} onChange={e => onChange({...filters, sourceType:e.target.value})}>
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="article">Article</MenuItem>
            <MenuItem value="tool">Tool</MenuItem>
            <MenuItem value="video">Video</MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" spacing={1} alignItems="center">
          {filters.tags.map(t => <Chip key={t} label={t} onDelete={() => onChange({...filters, tags:filters.tags.filter(x=>x!==t)})}/>)}
          <TextField label="Add Tag Filter" size="small" value={filters.tagInput}
            onChange={e => onChange({...filters, tagInput:e.target.value})}
            onKeyDown={e => {
              if(e.key==="Enter" && filters.tagInput.trim()){
                onChange({...filters, tags:[...filters.tags, filters.tagInput.trim()], tagInput:""});
              }
            }}
          />
        </Stack>
        <FormControlLabel
          control={<Switch checked={filters.showArchived} onChange={e=>onChange({...filters, showArchived:e.target.checked})}/>}
          label="Include Archived"
        />
      </Stack>
    </Box>
  );
}
