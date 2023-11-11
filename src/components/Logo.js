export default function Logo({ googleSignOut }) {
  return (
    <>
      <h1>AtCoder Calendar</h1>
      <button className="sign-out-button" onClick={() => googleSignOut()}>
        Sign Out
      </button>
    </>
  );
}
