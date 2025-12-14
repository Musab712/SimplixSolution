import { Request, Response } from 'express';
import { ContactFormData, ContactFormResponse } from '../types/contact.js';
import { supabase } from '../services/supabase.js';
import { sendContactNotification } from '../services/email.js';

export const submitContactForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const formData: ContactFormData = req.body;

    const submittedAt = new Date().toISOString();

    // Insert into Supabase
    const { error: dbError } = await supabase.from('contacts').insert({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone || null,
      message: formData.message,
      submitted_at: submittedAt,
      status: 'new',
      notes: null,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError.message);
      const response: ContactFormResponse = {
        success: false,
        message: 'Unable to submit your message right now. Please try again later.',
      };
      res.status(500).json(response);
      return;
    }

    // Send success response immediately (don't wait for email)
    const response: ContactFormResponse = {
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    };

    res.status(200).json(response);

    // Send email notification asynchronously AFTER response is sent
    // This prevents the email from blocking the response
    setImmediate(async () => {
      try {
        await sendContactNotification({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          submittedAt,
        });
      } catch (emailError) {
        console.error('Email send error (non-blocking):', emailError instanceof Error ? emailError.message : emailError);
        // Email failure doesn't affect the user - data is already saved
      }
    });
  } catch (error) {
    console.error('Contact form submission error:', error instanceof Error ? error.message : error);

    const response: ContactFormResponse = {
      success: false,
      message: 'Failed to send message. Please try again later.',
    };

    res.status(500).json(response);
  }
};
