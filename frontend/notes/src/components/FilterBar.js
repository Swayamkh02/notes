import {
  Stack, Box, TextField, Paper, InputBase, IconButton,
  Chip, Switch, FormControlLabel, Typography,  useMediaQuery, useTheme
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

function FilterBar({ filters, onChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const handleAddTags = () => {
    const newTags = filters.tagInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag && !filters.tags.includes(tag));

    if (newTags.length) {
      onChange({
        ...filters,
        tags: [...filters.tags, ...newTags],
        tagInput: '',
      });
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && filters.tagInput.trim()) {
      e.preventDefault();
      handleAddTags();
    } else if (e.key === 'Backspace' && !filters.tagInput) {
      const updatedTags = [...filters.tags];
      updatedTags.pop();
      onChange({ ...filters, tags: updatedTags });
    }
  };

  const handleDelete = (tagToDelete) => {
    onChange({
      ...filters,
      tags: filters.tags.filter(tag => tag !== tagToDelete),
    });
  };

  // return (
  //   <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
  //     <Stack spacing={2} direction="row" flexWrap="wrap" alignItems="center" sx={{ maxWidth: '900px', width: '100%' }}>
  //       <TextField
  //         label="Search"
  //         value={filters.search}
  //         onChange={e => onChange({ ...filters, search: e.target.value })}
  //         sx={{ flexGrow: 1, minWidth: 200 }}
  //       />

  //       {/* Tags input styled like TextField */}
  //       <Paper
  //         variant="outlined"
  //         sx={{
  //           px: 1,
  //           py: 0.5,
  //           display: 'flex',
  //           alignItems: 'center',
  //           flexWrap: 'nowrap',
  //           height: 56,
  //           width: 300, 
  //           overflowX: 'auto',
  //           overflowY: 'hidden',
  //           whiteSpace: 'nowrap',
  //           borderRadius: 1,
  //           boxSizing: 'border-box',
  //           '&::-webkit-scrollbar': {
  //             height: 4,
  //           },
  //           '&::-webkit-scrollbar-track': {
  //             background: 'transparent',
  //           },
  //           '&::-webkit-scrollbar-thumb': {
  //             backgroundColor: '#ccc',
  //             borderRadius: 4,
  //           },
  //           '&::-webkit-scrollbar-thumb:hover': {
  //             backgroundColor: '#aaa',
  //           },
  //         }}
  //       >
  //         {filters.tags.map(tag => (
  //           <Chip
  //             key={tag}
  //             label={tag}
  //             onDelete={() => handleDelete(tag)}
  //             sx={{ m: 0.5 }}
  //           />
  //         ))}
  //         <InputBase
  //           sx={{ ml: 1, flexShrink: 0, fontSize: 16 }}
  //           placeholder="Add Tag Filter"
  //           value={filters.tagInput}
  //           onChange={(e) =>
  //             onChange({ ...filters, tagInput: e.target.value })
  //           }
  //           onKeyDown={handleKeyDown}
  //         />
  //         <IconButton onClick={handleAddTags}>
  //           <AddIcon />
  //         </IconButton>
  //       </Paper>

  //       {/* Improved Archived Switch */}
  //       <FormControlLabel
  //         control={
  //           <Switch
  //             checked={filters.showArchived}
  //             onChange={e => onChange({ ...filters, showArchived: e.target.checked })}
  //             color="primary"
  //           />
  //         }
  //         label={<Typography variant="body2">Include Archived</Typography>}
  //         labelPlacement="bottom"
  //         sx={{
  //           ml: 2,
  //           '& .MuiFormControlLabel-label': { fontWeight: 500 },
  //         }}
  //       />
  //     </Stack>
  //   </Box>
  // );
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
      <Stack
        spacing={2}
        direction={isMobile ? 'column' : 'row'} // 👈 stack vertically on mobile
        flexWrap={isMobile ? 'nowrap' : 'wrap'}
        alignItems={isMobile ? 'stretch' : 'center'}
        sx={{
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Search Bar - Always first row */}
        <TextField
          label="Search"
          value={filters.search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />

        {/* Tag Input and Archived Toggle in a row on larger screens, stacked on mobile */}
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
          alignItems={isMobile ? 'stretch' : 'center'}
          sx={{ width: isMobile ? '100%' : 'auto' }}
        >
          <Paper
            variant="outlined"
            sx={{
              px: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              position: 'relative', // 👈 needed for absolute positioning
              height: 56,
              width: isMobile ? '100%' : 300,
              borderRadius: 1,
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            {/* Scrollable tag container */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                flex: 1,
                pr: 4, // space for + button
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
              }}
            >
              {filters.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDelete(tag)}
                  sx={{ m: 0.5 }}
                />
              ))}
              <InputBase
                sx={{ ml: 1, fontSize: 16, minWidth: 100 }}
                placeholder="Add Tag Filter"
                value={filters.tagInput}
                onChange={(e) =>
                  onChange({ ...filters, tagInput: e.target.value })
                }
                onKeyDown={handleKeyDown}
              />
            </Box>

            {/* Add (+) button pinned to the right */}
            <IconButton
              onClick={handleAddTags}
              sx={{
                position: 'absolute',
                right: 4,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <AddIcon />
            </IconButton>
          </Paper>

          {/* Archived Switch */}
          <FormControlLabel
            control={
              <Switch
                checked={filters.showArchived}
                onChange={e =>
                  onChange({ ...filters, showArchived: e.target.checked })
                }
                color="primary"
              />
            }
            label={<Typography variant="body2">Include Archived</Typography>}
            labelPlacement="bottom"
            sx={{
              '& .MuiFormControlLabel-label': { fontWeight: 500 },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default FilterBar;
