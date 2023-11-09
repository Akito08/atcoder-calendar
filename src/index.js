import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createClient } from "@supabase/supabase-js";
import { SesstionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
  "https://pypqnlxfcqnbbacisnga.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cHFubHhmY3FuYmJhY2lzbmdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk1MTE1MjMsImV4cCI6MjAxNTA4NzUyM30.SZzpt4tH0kifKEoV5eYh30pAosRdwo_tMxmwOHGmE-A"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
