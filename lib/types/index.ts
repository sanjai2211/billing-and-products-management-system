export interface DynamicInputFieldProps {
  form: any;
  data: {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    description?: string;
    component : string
  };
}

export interface FetchApiParams {
  endpoint: string;
  method?: string;
  data?: any;
}
