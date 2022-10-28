import { Box, Button } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

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
        Users
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
        <Button component={Link} to="/admin/users/add" sx={{ p: 1 }}>
          Add Users
        </Button>
      </Box>
    </Box>
  );
};
