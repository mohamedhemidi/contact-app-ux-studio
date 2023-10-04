import React from "react";
//import ReactDOM from "react-dom/client";
import ReactDOM from 'react-dom';
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../store.ts";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
