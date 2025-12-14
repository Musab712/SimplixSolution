const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export const submitContactForm = async (
  data: ContactFormData
): Promise<ContactFormResponse> => {
  const response = await fetch(`${API_URL}/contact/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result: ContactFormResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to submit form');
  }

  return result;
};
