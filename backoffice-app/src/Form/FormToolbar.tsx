import { Button, SaveButton, Toolbar } from "react-admin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import { saveButtonId } from "../_const/saveButtonId";

export const FormToolbar = () => (
  <Toolbar>
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Button
          startIcon={<ArrowBackIcon />}
          label="Back"
          onClick={() => {
            window.history.back();
          }}
          size="medium"
        />
      </Grid>
      <Grid item>
        <SaveButton alwaysEnable id={saveButtonId} />
      </Grid>
    </Grid>
  </Toolbar>
);
