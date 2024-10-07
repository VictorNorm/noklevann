import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Bygg from "./routes/Bygg";
import Uteomraader from "./routes/Uteomraader";
import Regler from "./routes/Regler";
import Dokumenter from "./routes/Dokumenter";
import Praktisk from "./routes/Praktisk";
import ErrorPage from "./routes/Error-page";
import Hjem from "./routes/Hjem";
import Soknader from "./routes/Soknader";
import Details from "./routes/Details";
import Kontaktinfo from "./routes/Kontaktinfo";

const router = createHashRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Hjem />,
			},
			{
				path: "bygg",
				element: <Bygg />,
			},
			{
				path: "uteomraader",
				element: <Uteomraader />,
			},
			{
				path: "regler",
				element: <Regler />,
			},
			{
				path: "dokumenter",
				element: <Dokumenter />,
			},
			{
				path: "praktisk",
				element: <Praktisk />,
			},
			{
				path: "soknader",
				element: <Soknader />,
			},
			{
				path: "kontaktinfo",
				element: <Kontaktinfo />,
			},
			{
				path: "nyhet",
				element: <Details />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
