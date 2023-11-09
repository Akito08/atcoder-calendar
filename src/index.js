import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
  "https://pypqnlxfcqnbbacisnga.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cHFubHhmY3FuYmJhY2lzbmdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MTE1MjMsImV4cCI6MjAxNTA4NzUyM30.SZzpt4tH0kifKEoV5eYh30pAosRdwo_tMxmwOHGmE-A"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
