import { Button, SaveButton, Toolbar } from "react-admin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import { saveButtonId } from "../_const/saveButtonId";

interface Props {
  saveLabel?: string;
}

export const FormToolbar = ({ saveLabel = "save" }: Props) => (
  <Toolbar>
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Button
          startIcon={<ArrowBackIcon />}
          label="Go back"
          onClick={() => {
            window.history.back();
          }}
          size="medium"
        />
      </Grid>
      <Grid item>
        <SaveButton alwaysEnable id={saveButtonId} label={saveLabel} />
      </Grid>
    </Grid>
  </Toolbar>
);
