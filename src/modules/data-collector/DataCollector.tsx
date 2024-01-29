import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import "./DataCollector.css";

import { FormFieldData } from "../../models/FormFieldData.ts";

import FormField from "../../components/FormField.tsx";

import { saveFromFieldData } from "../../store/slices/DataCollectorSlice";
import { useAppDispatch } from "../../hooks/StoreHooks.ts";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useRef } from "react";

export interface DataCollectorProps {
  FormFieldData: FormFieldData;
}

const DataCollector = (props: DataCollectorProps) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm();
  const formFieldDataRef = useRef<FormFieldData>(props.FormFieldData);

  const onSubmit = (formData: FieldValues) => {
    formFieldDataRef.current = props.FormFieldData.map((fields) => {
      if (Array.isArray(fields)) {
        return fields.map((field) => {
          return { ...field, value: formData[field.id] };
        });
      } else {
        return { ...fields, value: formData[fields.id] };
      }
    });

    dispatch(saveFromFieldData(formFieldDataRef.current));
  };

  return (
    <Stack gap={1} className={"col-lg-6 center"}>
      <div className="p-1">
        <h1>Personal Data Collector</h1>
        <hr />
      </div>
      <div className="p-1">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {props.FormFieldData.map((fields, index) => {
              if (Array.isArray(fields)) {
                return fields.map((field, index) => {
                  const size =
                    fields.length >= 3 ? 4 : Math.floor(12 / fields.length);

                  return (
                    <div
                      key={index}
                      className={`col-lg-${size} col-md-12 col-sm-12 p-1`}
                    >
                      <Controller
                        name={field.id}
                        control={control}
                        render={(controllerProps) => (
                          <FormField
                            {...controllerProps.field}
                            id={field.id}
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder}
                            label={field.label}
                            options={field.options}
                          />
                        )}
                      />
                    </div>
                  );
                });
              } else {
                return (
                  <div key={index} className="p-1">
                    <Controller
                      name={fields.id}
                      control={control}
                      render={(controllerProps) => (
                        <FormField
                          {...controllerProps.field}
                          id={fields.id}
                          type={fields.type}
                          required={fields.required}
                          placeholder={fields.placeholder}
                          label={fields.label}
                          options={fields.options}
                        />
                      )}
                    />
                  </div>
                );
              }
            })}
          </Row>
          <Button type={"submit"} variant={"primary"}>
            Submit
          </Button>
        </Form>
      </div>
      <div className={"p-1 d-flex justify-content-end"}></div>
    </Stack>
  );
};

export default DataCollector;
