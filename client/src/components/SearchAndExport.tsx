import { Box, Button } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

export const SearchAndExport = () => {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5" sx={{ p: 1 }} accessKey="h1">
        Users Lists
      </Typography>
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <GridToolbarQuickFilter
          sx={{ p: 1 }}
          quickFilterParser={(searchInput: string) =>
            searchInput
              .split(",")
              .map((value) => value.trim())
              .filter((value) => value !== "")
          }
        />
        <Button sx={{ p: 1 }}>Excel</Button>
        <Button sx={{ p: 1 }}>CSV</Button>
        <Button sx={{ p: 1 }}>PDF</Button>
      </Box>
    </Box>
  );
};
