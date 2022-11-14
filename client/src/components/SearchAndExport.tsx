import { Button } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { EXPORT_TYPES, SearchAndDownloadProps } from "../utils/types";
import { Stack } from "@mui/system";

export const SearchAndExport = (props: SearchAndDownloadProps) => {
  return (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      justifyContent="space-between"
      sx={{
        p: 2,
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
      <Stack sx={{ py: { xs: 2 } }}>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <Button
            variant="contained"
            color="download"
            onClick={() => {
              props.handleDownloadMethod(EXPORT_TYPES.XLSX);
            }}
            sx={{ textTransform: "none" }}
          >
            Export Excel
          </Button>
          <Button
            variant="contained"
            color="download"
            onClick={() => {
              props.handleDownloadMethod(EXPORT_TYPES.CSV);
            }}
            sx={{ textTransform: "none" }}
          >
            Export CSV
          </Button>
          <Button
            color="download"
            variant="contained"
            onClick={() => {
              props.handleDownloadMethod(EXPORT_TYPES.PDF);
            }}
            sx={{ textTransform: "none" }}
          >
            Export PDF
          </Button>
          {props.addLink !== undefined && (
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to={props.addLink}
              sx={{ textTransform: "none" }}
            >
              Add {props.name}
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
