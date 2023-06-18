import { useQuery } from "react-query";
import { NewEvent } from "../../components/create-event/create-event";
import { ErrorAlert } from "../../components/error-alert/errorAlert";
import { EventCard } from "../../components/event-card/eventCard";
import { SpinnerLoading } from "../../components/spinner-loading/spinnerLoading";
import EventApis from "../../core/network/apis/event";

const eventService = new EventApis();

export const EventList = () => {
  const { isLoading, data, isError, error } = useQuery("get-events", () => {
    return eventService.get();
  });

  if (isLoading) {
    return <SpinnerLoading></SpinnerLoading>;
  }

  if (isError) {
    return <ErrorAlert message={error?.message} />;
  }

  return (
    <>
      <div>
        <NewEvent></NewEvent>
      </div>

      {data?.data.data.map((item) => {
        return <EventCard data={item} key={item._id}></EventCard>;
      })}
    </>
  );
};
