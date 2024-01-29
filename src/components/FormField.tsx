import Form from "react-bootstrap/Form";
import { ReactNode } from "react";

export interface FieldProps {
  id: string;
  type: "text" | "textarea" | "select" | "email" | "password" | string;
  required?: boolean;
  value?: string | number | string[];
  placeholder?: string;
  label: string;
  options?: string[];
  children?: ReactNode;
}

const FieldTemplate = (props: FieldProps) => {
  return (
    <Form.Group>
      <Form.Label htmlFor={props.id}>
        {props.label}
        {": "}
        {props.required ? <span style={{ color: "red" }}>*</span> : ""}
      </Form.Label>
      {props.children}
    </Form.Group>
  );
};

const FormField = (props: FieldProps) => {
  if (
    props.type === "text" ||
    props.type === "email" ||
    props.type === "tel" ||
    props.type == "password"
  ) {
    return (
      <FieldTemplate {...props}>
        <Form.Control
          {...props}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
        />
      </FieldTemplate>
    );
  } else if (props.type === "textarea") {
    return (
      <FieldTemplate {...props}>
        <Form.Control
          {...props}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          as="textarea"
          rows={4}
        />
      </FieldTemplate>
    );
  } else if (props.type === "select") {
    return (
      <FieldTemplate {...props}>
        <Form.Select {...props} id={props.id}>
          <option value={0}>--- Select ---</option>
          {props.options?.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </Form.Select>
      </FieldTemplate>
    );
  }
};

export default FormField;
