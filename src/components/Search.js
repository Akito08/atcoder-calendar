import { useState } from "react";
import axios from "axios";

export default function Search({ setEventList }) {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  async function handleSubmit(e) {
    e.preventDefault();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return alert(`${year}年${month}月のコンテストはもう終了しています`);
    }

    try {
      const response = await axios.get(
        `${baseUrl}?contest_year_month=${year}-${month}`
      );
      const eventsWithId = response.data.map((event) => ({
        ...event,
        id: `${event.contest_name}-${event.contest_start_time}`,
        checked: false,
      }));

      if (eventsWithId.length === 0) {
        return alert(
          `AtCoderの公式サイトで、${year}年${month}月のコンテストの予定はまだ追加されていません。`
        );
      }

      setEventList(eventsWithId);
    } catch (error) {
      console.error("ERROR", error);
    }
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
