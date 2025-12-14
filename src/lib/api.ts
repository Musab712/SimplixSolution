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
  // Create an AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    const response = await fetch(`${API_URL}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Check if response is ok before parsing
    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `Server error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response isn't JSON, use status text
        const text = await response.text();
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Parse successful response
    const result: ContactFormResponse = await response.json();
    return result;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle network errors, CORS errors, timeouts, etc.
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your connection and try again.');
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout: The server took too long to respond. Please try again.');
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again later.');
  }
};
