import { useRef } from "react";

import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import "./DataCollector.css";

import {
  FormField as LFormField,
  FormFieldData,
} from "../../models/FormFieldData";
import FormField from "../../components/FormField";

import { saveFromFieldData } from "../../store/slices/DataCollectorSlice";
import { useAppDispatch } from "../../hooks/StoreHooks";

import { Controller, FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface DataCollectorProps {
  FormFieldData: FormFieldData;
}

const DataCollector = (props: DataCollectorProps) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

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
    navigate("collected");
  };

  /** This function builds validation rules, we can extend this function in
   * future to take validation rules from json metadata.
   * */
  function getValidationRules(fields: LFormField) {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegExp = /^[0-9\s()+-]+$/;

    return {
      required: {
        value: fields.required,
        message: "Field is required",
      },
      pattern:
        fields.type === "email"
          ? {
              value: emailRegExp,
              message: "Not a valid email",
            }
          : fields.type === "tel"
            ? {
                value: phoneRegExp,
                message: "Not a valid phone number",
              }
            : undefined,
      maxLength: {
        value: 100,
        message: "Max length is 100 characters",
      },
    };
  }

  const DataCollectorField = ({ fieldData }: { fieldData: LFormField }) => {
    return (
      <Controller
        name={fieldData.id}
        control={control}
        rules={getValidationRules(fieldData)}
        render={(controllerProps) => (
          <>
            <FormField
              {...controllerProps.field}
              id={fieldData.id}
              type={fieldData.type}
              required={fieldData.required}
              placeholder={fieldData.placeholder}
              label={fieldData.label}
              options={fieldData.options}
            />
            {errors[fieldData.id] && (
              <div className={"text-danger"}>
                {errors[fieldData.id]?.message}
              </div>
            )}
          </>
        )}
      />
    );
  };

  return (
    <Stack gap={1} className={"col-lg-6 center"}>
      <div className="p-1">
        <h1 role={"banner"}>Personal Data Collector</h1>
        <hr />
      </div>
      <div className="p-1">
        <Form>
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
                      <DataCollectorField fieldData={field} />
                    </div>
                  );
                });
              } else {
                return (
                  <div key={index} className="p-1">
                    <DataCollectorField fieldData={fields} />
                  </div>
                );
              }
            })}
          </Row>
        </Form>
      </div>
      <div className={"p-1 d-flex justify-content-end"}>
        <Button
          role="button"
          onClick={handleSubmit(onSubmit)}
          variant={"primary"}
        >
          Submit
        </Button>
      </div>
    </Stack>
  );
};

export default DataCollector;
