export default function Footer({ googleSignOut }) {
  return (
    <footer className="footer">
      <button className="sign-out-button" onClick={() => googleSignOut()}>
        Sign Out
      </button>
    </footer>
  );
}
