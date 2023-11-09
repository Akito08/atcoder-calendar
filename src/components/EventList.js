import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Event from "./Event";

export default function EventList({ eventList, setEventList }) {
  const session = useSession();

  function handleToggleEvent(id) {
    setEventList((eventList) =>
      eventList.map((event) =>
        event.id === id ? { ...event, checked: !event.checked } : event
      )
    );
  }

  async function createCalenderEvent() {
    console.log("createCalenderEventしてますすすす");
    const event = {
      summary: "Hikakin Party",
      start: {
        dateTime: "2023-11-29T21:00:00+09:00",
        timeZone: "Asia/Tokyo",
      },
      end: {
        dateTime: "2023-11-29T23:50:00+09:00",
        timeZone: "Asia/Tokyo",
      },
    };
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        alert("Event created, check your Google Calendar!");
      });
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
