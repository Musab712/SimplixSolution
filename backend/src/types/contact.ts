export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactRecord extends ContactFormData {
  status?: string;
  notes?: string;
  submitted_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
