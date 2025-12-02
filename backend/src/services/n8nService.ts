import axios, { AxiosError } from 'axios';
import { ContactFormData } from '../types/contact.js';

export interface N8nWebhookPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
}

export const triggerN8nWorkflow = async (
  formData: ContactFormData
): Promise<void> => {
  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

  if (!N8N_WEBHOOK_URL) {
    throw new Error('N8N_WEBHOOK_URL environment variable is not set');
  }

  try {
    const payload: N8nWebhookPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      submittedAt: new Date().toISOString(),
    };

    const response = await axios.post(N8N_WEBHOOK_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });

    // n8n webhooks typically return 200 on success
    if (response.status !== 200) {
      throw new Error(`n8n webhook returned status ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // n8n returned an error response
        throw new Error(
          `n8n webhook error: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`
        );
      } else if (axiosError.request) {
        // Request was made but no response received
        throw new Error('n8n webhook request failed: No response received');
      } else {
        // Error setting up the request
        throw new Error(`n8n webhook request setup failed: ${axiosError.message}`);
      }
    }
    throw error;
  }
};
