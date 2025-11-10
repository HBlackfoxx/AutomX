/**
 * Form Submission Script
 * Handles contact form submission to n8n webhook with loading states and error handling
 */

import { validateForm } from './form-validation';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  company: string;
  message: string;
  gdpr_consent: boolean;
  language: string;
  timestamp: string;
}

/**
 * Get n8n webhook URL from environment
 */
function getWebhookUrl(): string {
  // Try to get from meta tag (set by Astro)
  const metaTag = document.querySelector('meta[name="n8n-webhook-url"]');
  if (metaTag) {
    return metaTag.getAttribute('content') || '';
  }

  // Fallback to environment variable pattern
  return import.meta.env.PUBLIC_N8N_WEBHOOK_URL || '';
}

/**
 * Extract form data
 */
function extractFormData(form: HTMLFormElement): FormData {
  const formDataObj = new FormData(form);
  const lang = document.documentElement.lang || 'fr';

  return {
    name: formDataObj.get('name') as string || '',
    email: formDataObj.get('email') as string || '',
    phone: formDataObj.get('phone') as string || '',
    service_interest: formDataObj.get('service_interest') as string || '',
    company: formDataObj.get('company') as string || '',
    message: formDataObj.get('message') as string || '',
    gdpr_consent: formDataObj.get('gdpr_consent') === 'on',
    language: lang,
    timestamp: new Date().toISOString()
  };
}

/**
 * Show loading state
 */
function showLoadingState(form: HTMLFormElement): void {
  const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  if (submitButton) {
    submitButton.disabled = true;
    const submitText = submitButton.querySelector('.submit-text');
    const loadingText = submitButton.querySelector('.loading-text');
    if (submitText) submitText.classList.add('hidden');
    if (loadingText) loadingText.classList.remove('hidden');
  }
}

/**
 * Hide loading state
 */
function hideLoadingState(form: HTMLFormElement): void {
  const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  if (submitButton) {
    submitButton.disabled = false;
    const submitText = submitButton.querySelector('.submit-text');
    const loadingText = submitButton.querySelector('.loading-text');
    if (submitText) submitText.classList.remove('hidden');
    if (loadingText) loadingText.classList.add('hidden');
  }
}

/**
 * Show success message
 */
function showSuccessMessage(): void {
  const successElement = document.getElementById('success-message');
  const errorElement = document.getElementById('error-message');

  if (errorElement) errorElement.classList.add('hidden');
  if (successElement) {
    successElement.classList.remove('hidden');
    successElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Show error message
 */
function showErrorMessage(): void {
  const successElement = document.getElementById('success-message');
  const errorElement = document.getElementById('error-message');

  if (successElement) successElement.classList.add('hidden');
  if (errorElement) {
    errorElement.classList.remove('hidden');
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Reset form
 */
function resetForm(form: HTMLFormElement): void {
  form.reset();

  // Clear any remaining error states
  const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    'input, textarea, select'
  );
  fields.forEach((field) => {
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
  });

  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach((msg) => {
    msg.classList.add('hidden');
    msg.textContent = '';
  });
}

/**
 * Submit form data to n8n webhook
 */
async function submitToWebhook(data: FormData): Promise<boolean> {
  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    console.error('n8n webhook URL not configured');
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('Form submission error:', error);
    return false;
  }
}

/**
 * Handle form submission
 */
async function handleSubmit(event: Event): Promise<void> {
  event.preventDefault();

  const form = event.target as HTMLFormElement;

  // Hide previous messages
  const successElement = document.getElementById('success-message');
  const errorElement = document.getElementById('error-message');
  if (successElement) successElement.classList.add('hidden');
  if (errorElement) errorElement.classList.add('hidden');

  // Validate form
  if (!validateForm(form)) {
    // Focus first error field
    const firstError = form.querySelector('.error') as HTMLElement;
    if (firstError) {
      firstError.focus();
    }
    return;
  }

  // Show loading state
  showLoadingState(form);

  // Extract and submit data
  const formData = extractFormData(form);
  const success = await submitToWebhook(formData);

  // Hide loading state
  hideLoadingState(form);

  // Show result
  if (success) {
    showSuccessMessage();
    resetForm(form);

    // Track conversion (optional analytics)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submission', {
        event_category: 'Contact',
        event_label: formData.service_interest,
      });
    }
  } else {
    showErrorMessage();
  }
}

/**
 * Handle retry button click
 */
function handleRetry(): void {
  const errorElement = document.getElementById('error-message');
  if (errorElement) errorElement.classList.add('hidden');

  const form = document.getElementById('contact-form') as HTMLFormElement;
  if (form) {
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) submitButton.click();
  }
}

/**
 * Initialize form submission handler
 */
export function initFormSubmission(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  if (!form) return;

  // Handle form submit
  form.addEventListener('submit', handleSubmit);

  // Handle retry button
  const retryButton = document.getElementById('retry-button');
  if (retryButton) {
    retryButton.addEventListener('click', handleRetry);
  }

  // Handle no-JS fallback (form action attribute)
  // If JavaScript is disabled, form will POST directly to n8n webhook
  const webhookUrl = getWebhookUrl();
  if (webhookUrl) {
    form.setAttribute('action', webhookUrl);
  }
}

// Initialize on DOM load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initFormSubmission();
  });
}
