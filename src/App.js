import { useState } from "react";
import axios from "axios";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function App() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [eventList, setEventList] = useState([]);

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { scopes: "https://www.googleapis.com/auth/calendar" },
    });
    if (error) {
      alert("Error logging in to Google provider");
      console.log(error);
    }
  }

  async function googleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="app">
      <div>
        {session ? (
          <>
            <Logo />
            <Form setEventList={setEventList} />
            <EventList eventList={eventList} setEventList={setEventList} />
            <Footer googleSignOut={googleSignOut} />
          </>
        ) : (
          <button onClick={googleSignIn}>Sign In With Google</button>
        )}
      </div>
    </div>
  );
}

function Logo() {
  return <h1>AtCoder Calendar</h1>;
}
function Form({ setEventList }) {
  const baseUrl =
    "https://sdvq6s9zic.execute-api.ap-northeast-1.amazonaws.com/test/events";
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .get(`${baseUrl}?contest_year_month=${year}-${month}`)
      .then((res) => {
        const eventsWithId = res.data.map((event, index) => ({
          ...event,
          id: index,
        }));
        setEventList(eventsWithId);
      })
      .catch((error) => {
        console.error("ERROR", error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => 2020 + i).map((eachYear) => (
          <option value={eachYear} key={eachYear}>
            {`${eachYear}年`}
          </option>
        ))}
      </select>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {Array.from({ length: 12 }, (_, i) => 1 + i).map((eachMonth) => (
          <option value={eachMonth} key={eachMonth}>
            {`${eachMonth}月`}
          </option>
        ))}
      </select>
      <button>検索</button>
    </form>
  );
}

function EventList({ eventList, setEventList }) {
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
function Event({ event, onToggleEvent }) {
  return (
    <li>
      <input
        type="checkbox"
        value={event.checked}
        onChange={() => onToggleEvent(event.id)}
      />
      <span> {event.contest_name}</span>
    </li>
  );
}
function Footer({ googleSignOut }) {
  return (
    <div>
      <button onClick={() => googleSignOut()}>Sign Out</button>
    </div>
  );
}
