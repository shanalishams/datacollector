import { createBrowserRouter } from "react-router-dom";

import App from "../App.tsx";
import DataCollector from "../modules/data-collector/DataCollector.tsx";
import DataCollected from "../modules/data-collector/DataCollected.tsx";

import FormFieldData from "../data/field-set.json";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DataCollector FormFieldData={FormFieldData} />,
      },
      {
        path: "collector",
        element: <DataCollector FormFieldData={FormFieldData} />,
      },
      {
        path: "collected",
        element: <DataCollected />,
      },
    ],
  },
]);

export default router;
