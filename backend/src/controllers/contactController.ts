import { Request, Response } from 'express';
import { ContactFormData, ContactFormResponse } from '../types/contact.js';
import { triggerN8nWorkflow } from '../services/n8nService.js';

export const submitContactForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const formData: ContactFormData = req.body;

    // Trigger n8n workflow
    await triggerN8nWorkflow(formData);

    const response: ContactFormResponse = {
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Contact form submission error:', error);

    const response: ContactFormResponse = {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again later.',
    };

    res.status(500).json(response);
  }
};
