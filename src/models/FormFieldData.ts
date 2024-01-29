export interface FormField {
  label: string;
  id: string;
  type: string;
  value?: string | number | string[];
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export type FormSection = FormField[];

export type FormFieldData = (FormField | FormSection)[];
