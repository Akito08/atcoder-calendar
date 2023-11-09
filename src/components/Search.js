import { useState } from "react";
import axios from "axios";

export default function Search({ setEventList }) {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
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
    <form className="search" onSubmit={handleSubmit}>
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
