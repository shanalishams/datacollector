import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";

import { useAppSelector } from "../../hooks/StoreHooks.ts";
import { selectFromFieldData } from "../../store/slices/DataCollectorSlice.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DataCollected = () => {
  const formFieldData = useAppSelector(selectFromFieldData);

  const navigate = useNavigate();

  useEffect(() => {
    if (formFieldData.length === 0) {
      navigate("collector");
    }
  }, []);

  return (
    <Stack gap={1} className={"col-lg-6 center"}>
      <div className="p-1">
        <h1 role={"banner"}>Thank You</h1>
        <hr />
      </div>
      <div className="p-1">
        <Row>
          {formFieldData.map((fields, index) => {
            if (Array.isArray(fields)) {
              return fields.map((field, index) => {
                const size =
                  fields.length >= 3 ? 4 : Math.floor(12 / fields.length);
                return (
                  <div
                    key={index}
                    className={`col-lg-${size} col-md-12 col-sm-12 p-1`}
                  >
                    <label id={field.id} className="form-label fw-bold">
                      {field.label}:
                    </label>
                    <p aria-labelledby={field.id}>{field.value}</p>
                  </div>
                );
              });
            } else {
              return (
                <div key={index} className="p-1">
                  <label id={fields.id} className="form-label fw-bold">
                    {fields.label}:
                  </label>
                  <p aria-labelledby={fields.id}>{fields.value}</p>
                </div>
              );
            }
          })}
        </Row>
      </div>
    </Stack>
  );
};

export default DataCollected;
