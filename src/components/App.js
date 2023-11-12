import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Logo from "./Logo";
import Search from "./Search";
import EventList from "./EventList";
import Footer from "./Footer";

export default function App() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [eventList, setEventList] = useState([]);

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { scopes: process.env.REACT_APP_GOOGLE_API_SCOPES },
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
            <Search setEventList={setEventList} />
            <EventList
              eventList={eventList}
              setEventList={setEventList}
              session={session}
              googleSignOut={googleSignOut}
            />
            <Footer />
          </>
        ) : (
          <button onClick={googleSignIn}>Sign In With Google</button>
        )}
      </div>
    </div>
  );
}
