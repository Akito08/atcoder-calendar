import { useState } from "react";
import axios from "axios";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function App() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [eventList, setEventList] = useState([]);

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWith0auth({
      provider: "google",
      options: { scopes: "https://www.googleapis.com/auth/calendar" },
    });
    if (error) {
      alert("Error logging in to Google provider");
      console.log(error);
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
              <EventList eventList={eventList} />
              <Footer />{" "}
            </>
          ) : (
            <>
              <button onClick={() => googleSignIn()}>
                Sign In With Google
              </button>
            </>
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
          console.log("RESPONSE", res);
          setEventList(res.data);
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

  function EventList({ eventList }) {
    return (
      <div className="list">
        <ul>
          {eventList.map((event) => (
            <Event key={event.name} event={event} />
          ))}
        </ul>
        <button>Google Calendarに予定を追加</button>
      </div>
    );
  }
  function Event({ event }) {
    return (
      <li>
        <input type="checkbox" />
        <span> {event.contest_name}</span>
      </li>
    );
  }
  function Footer() {
    return (
      <div>
        <button onClick={() => googleSignIn}>Sign In With Google</button>
      </div>
    );
  }
}
