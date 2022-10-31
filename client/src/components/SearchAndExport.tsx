import { Box, Button } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { EXPORT_TYPES, SearchAndDownloadProps } from "../utils/types";

export const SearchAndExport = (props: SearchAndDownloadProps) => {
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
        {props.name}
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
        <Button
          onClick={() => {
            props.handleDownloadMethod(EXPORT_TYPES.XLSX);
          }}
          sx={{ p: 1 }}
        >
          Excel
        </Button>
        <Button
          onClick={() => {
            props.handleDownloadMethod(EXPORT_TYPES.CSV);
          }}
          sx={{ p: 1 }}
        >
          CSV
        </Button>
        <Button
          onClick={() => {
            props.handleDownloadMethod(EXPORT_TYPES.PDF);
          }}
          sx={{ p: 1 }}
        >
          PDF
        </Button>
        {props.addLink !== undefined && (
          <Button component={Link} to={props.addLink} sx={{ p: 1 }}>
            Add {props.name}
          </Button>
        )}
      </Box>
    </Box>
  );
};
