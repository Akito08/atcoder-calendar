import Event from "./Event";

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
      await fetch(process.env.REACT_APP_GOOGLE_CALENDAR_API, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
        body: JSON.stringify(addEvent),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
        });
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
