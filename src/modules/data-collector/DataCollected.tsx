import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FieldData from "../../data/field-set.json";
import FormField from "../../components/FormField.tsx";

const DataCollected = () => {
  return (
    <Stack gap={1} className={"w-50 center"}>
      <div className="p-1">
        <h1>Thank You</h1>
        <hr />
      </div>
      <div className="p-1">
        <Form>
          <Stack gap={3}>
            {FieldData.map((field, index) => {
              if (Array.isArray(field)) {
                return (
                  <Stack key={index} direction={"horizontal"} gap={1}>
                    {field.map((field, index) => {
                      return (
                        <div key={index} className="p-1">
                          <FormField
                            id={field.id}
                            type={field.type}
                            required={true}
                            placeholder={field.placeholder}
                            label={field.label}
                            options={field.options}
                          />
                        </div>
                      );
                    })}
                  </Stack>
                );
              } else {
                return (
                  <div key={index} className="p-1">
                    <FormField
                      id={field.id}
                      type={field.type}
                      required={true}
                      placeholder={field.placeholder}
                      label={field.label}
                      options={field.options}
                    />
                  </div>
                );
              }
            })}
          </Stack>
        </Form>
      </div>
      <div className={"p-1 d-flex justify-content-end"}>
        <Button variant={"primary"}>Submit</Button>
      </div>
    </Stack>
  );
};

export default DataCollected;
