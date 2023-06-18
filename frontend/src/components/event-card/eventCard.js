import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";
import "./eventCard.css";

export const EventCard = ({ data }) => {
  function setDate(d, formatInfo) {
    return moment(d).format(formatInfo);
  }

  return (
    <>
      <div className="row card-post event-card">
        <div className="col-md-1">
          <div className="time-event">{setDate(data.date, "MMM Do")}</div>
        </div>
        <div className="col-md-8">
          <h6>{data.title}</h6>
          <p>
            {" "}
            <CalendarTodayIcon></CalendarTodayIcon>{" "}
            {setDate(data.start, "h:mm a")} - {setDate(data.end, "h:mm a")}
          </p>
        </div>
        <div className="col-md-3 btn-box-event">
          <button className="stand-btn">RSVP</button>
        </div>
      </div>
    </>
  );
};
