import Event from "./Event";

export default function EventList({ eventList, setEventList, session }) {
  function handleToggleEvent(id) {
    setEventList((eventList) =>
      eventList.map((event) =>
        event.id === id ? { ...event, checked: !event.checked } : event
      )
    );
  }

  async function createCalenderEvent() {
    const checkedEvents = eventList.filter((event) => event.checked);
    for (const event of checkedEvents) {
      const addEvent = {
        summary: event.contest_name,
        start: {
          dateTime: event.contest_start_time,
          timeZone: "Asia/Tokyo",
        },
        end: {
          dateTime: event.contest_end_time,
          timeZone: "Asia/Tokyo",
        },
      };
      console.log(addEvent);
      await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session.provider_token,
          },
          body: JSON.stringify(addEvent),
        }
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
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
      <button onClick={() => createCalenderEvent()}>
        Google Calendarに予定を追加
      </button>
    </div>
  );
}
