import { NewEditor } from "../editor/editor";
import "./create-event.css";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "react-query";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { Avatar } from "@mui/material";
import EventApis from "../../core/network/apis/event";

const eventService = new EventApis();

function createEvent(data) {
  return eventService.post(data, "new");
}

export const NewEvent = () => {
  const Mutation = useMutation(createEvent);
  const [open, setOpen] = useState(false);
  const [inputsData, setInputData] = useState({
    title: "",
    body: "",
    start: moment(),
    end: moment(),
    date: moment()
  });

  const handleChange = (newValue, type) => {
    setInputData({ ...inputsData, [type]: newValue });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const preparedData = {
      title: inputsData.title,
      description: inputsData.body,
      date: inputsData.date.format(),
      end: inputsData.end.format(),
      start: inputsData.start.format(),
      speakerId: "100000000000"
    };
    Mutation.mutate(preparedData, {
      onSuccess: (response) => {
        handleClose();
        console.log("succsseded", response);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };

  const handleOnChange = (ev) => {
    setInputData({ ...inputsData, title: ev.target.value });
  };

  return (
    <div className="create-events">
      <div
        className="row card-post header-add-post mt-4 mb-4"
        onClick={handleClickOpen}
      >
        <div className="col-1">
          <Avatar sx={{ width: 50, height: 50, objectFit: "contain" }}>
            {localStorage.getItem("img_prof") ? (
              <img
                width={"100%"}
                height={"100%"}
                src={localStorage.getItem("img_prof")}
                alt="avatar"
              />
            ) : (
              "A"
            )}
          </Avatar>
        </div>
        <div className="col-md-5 start-post">
          <h6>Create an event</h6>
        </div>
        <div className="col-md-6 add-icon-post ">
          <span>
            <AddIcon />
          </span>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{ backgroundColor: "rgb(46, 46, 46) !important" }}>
          <div className="new-post">
            <div>
              <textarea
                onChange={handleOnChange}
                value={inputsData.title}
                placeholder="Event Title"
              ></textarea>
            </div>

            <div>
              <NewEditor
                inputData={inputsData}
                setInputData={setInputData}
              ></NewEditor>
            </div>

            <div className="select-time-for-event">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Event Date"
                  inputFormat="MM/DD/YYYY"
                  value={inputsData.date}
                  onChange={(ev) => handleChange(ev, "date")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      fullWidth
                      color="warning"
                      focused
                      variant="standard"
                    />
                  )}
                />

                <div className="row">
                  <div className="col-md-6">
                    <TimePicker
                      label="Start event"
                      value={inputsData.start}
                      onChange={(ev) => handleChange(ev, "start")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="normal"
                          color="warning"
                          focused
                          variant="standard"
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-6">
                    <TimePicker
                      label="End event"
                      value={inputsData.end}
                      onChange={(ev) => handleChange(ev, "end")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="normal"
                          color="warning"
                          focused
                          variant="standard"
                        />
                      )}
                    />
                  </div>
                </div>
              </LocalizationProvider>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "rgb(46, 46, 46)!important" }}>
          <button className="stand-btn" onClick={handleSubmit}>
            Schedule Event
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
