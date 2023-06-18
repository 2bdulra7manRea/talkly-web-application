import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInOnIcon from "@mui/icons-material/LinkedIn";
import GitHubInOnIcon from "@mui/icons-material/GitHub";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export const TabAbout = ({ user }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 user-details-about">
          <p>
            <span>{<AlternateEmailIcon />}</span> {user?.email}
          </p>
          {user.country && (
            <p>
              <span>{<LocationOnIcon />}</span> {user?.country} , {user?.city}
            </p>
          )}
          <p>
            <span>{<CalendarMonthIcon />}</span> Member since{" "}
            {moment(user.date).format("MMMM Do YYYY")}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 user-details-about">
          {user.linkedin && (
            <p>
              <span>{<LinkedInOnIcon />}</span>
              <a href={user?.linkedin} target="_blank" rel="noreferrer">
                {user?.linkedin}
              </a>
            </p>
          )}

          {user.github && (
            <p>
              <span>{<GitHubInOnIcon />}</span>
              <a href={user?.github} target="_blank" rel="noreferrer">
                {user?.github}
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
};
