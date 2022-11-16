import { Button, DeleteButton, SaveButton, Toolbar } from "react-admin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { saveButtonId } from "../consts/saveButtonId";

export const FormToolbar = () => (
  <Toolbar>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        label="Back"
        onClick={() => {
          window.history.back();
        }}
        size="medium"
      />
      <SaveButton alwaysEnable id={saveButtonId} />
    </div>
  </Toolbar>
);
