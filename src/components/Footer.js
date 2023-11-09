export default function Footer({ googleSignOut }) {
  return (
    <div>
      <button onClick={() => googleSignOut()}>Sign Out</button>
    </div>
  );
}
