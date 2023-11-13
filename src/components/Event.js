export default function Event({ event, onToggleEvent }) {
  function fixContestTime(startTime, endTime, category) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const optionsDate = {
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedStartDate = new Intl.DateTimeFormat(
      "ja-JP",
      optionsDate
    ).format(startDate);
    const formattedStartTime = new Intl.DateTimeFormat(
      "ja-JP",
      optionsTime
    ).format(startDate);

    let formattedString = `${formattedStartDate} ${formattedStartTime}～`;

    if (category === "AHC") {
      const formattedEndDate = new Intl.DateTimeFormat(
        "ja-JP",
        optionsDate
      ).format(endDate);
      const formattedEndTime = new Intl.DateTimeFormat(
        "ja-JP",
        optionsTime
      ).format(endDate);
      formattedString += `${formattedEndDate}${formattedEndTime}`;
    } else {
      const formattedEndTime = new Intl.DateTimeFormat(
        "ja-JP",
        optionsTime
      ).format(endDate);
      formattedString += formattedEndTime;
    }

    return formattedString;
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={event.checked}
        onChange={() => onToggleEvent(event.id)}
      />
      <span> </span>
      <span>
        {fixContestTime(
          event.contest_start_time,
          event.contest_end_time,
          event.contest_category
        )}
      </span>
      <span> {event.contest_name}</span>
    </li>
  );
}
