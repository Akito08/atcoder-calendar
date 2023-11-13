import Event from "./Event";
import axios from "axios";

export default function EventList({
  eventList,
  setEventList,
  session,
  googleSignOut,
}) {
  const timeZone = "Asia/Tokyo";

  function handleToggleEvent(id) {
    setEventList((eventList) =>
      eventList.map((event) =>
        event.id === id ? { ...event, checked: !event.checked } : event
      )
    );
  }

  async function createCalenderEvent() {
    const config = {
      headers: { Authorization: "Bearer " + session.provider_token },
    };

    const checkedEvents = eventList.filter((event) => event.checked);
    for (const event of checkedEvents) {
      const addEvent = {
        summary: event.contest_name,
        start: {
          dateTime: event.contest_start_time,
          timeZone: timeZone,
        },
        end: {
          dateTime: event.contest_end_time,
          timeZone: timeZone,
        },
      };

      try {
        const response = await axios.post(
          process.env.REACT_APP_GOOGLE_CALENDAR_API,
          addEvent,
          config
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error adding event to Google Calendar:", error);
      }
    }
    alert("Google Calendarに選択された予定が追加されました");
  }

  return (
    <div className="list">
      <ul>
        {eventList.map((event) => (
          <Event
            key={event.id}
            event={event}
            onToggleEvent={handleToggleEvent}
          />
        ))}
      </ul>
      <button
        className="add-calendar-button"
        onClick={() => createCalenderEvent()}
      >
        Google Calendarに予定を追加
      </button>
      <button className="sign-out-button" onClick={() => googleSignOut()}>
        Sign Out
      </button>
    </div>
  );
}
