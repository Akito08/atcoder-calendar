export default function Event({ event, onToggleEvent }) {
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
