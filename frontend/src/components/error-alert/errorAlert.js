import Alert from "@mui/material/Alert";

export const ErrorAlert = ({ message }) => {
  return (
    <div>
      <Alert variant="filled" severity="error">
        {message ? message : "Something went wrong !"}
      </Alert>
    </div>
  );
};
