/**
 * Form Validation Script
 * Handles real-time client-side validation for contact form
 */

export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: ValidationRule[];
}

// Validation translations (simplified - in production would come from i18n)
const translations = {
  fr: {
    required: 'Ce champ est obligatoire',
    email: 'Veuillez entrer une adresse email valide',
    phone: 'Veuillez entrer un numéro de téléphone valide',
    minLength: 'Le message doit contenir au moins 10 caractères',
    gdpr: 'Vous devez accepter l\'utilisation de vos données'
  },
  en: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    minLength: 'Message must be at least 10 characters',
    gdpr: 'You must accept the data usage policy'
  }
};

/**
 * Get validation translation
 */
function getTranslation(key: string): string {
  const lang = document.documentElement.lang || 'fr';
  return translations[lang as keyof typeof translations]?.[key as keyof typeof translations.fr] || translations.fr[key as keyof typeof translations.fr];
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  // Allow international format with +, spaces, dashes, and parentheses
  const phoneRegex = /^[0-9+\s\-\(\)]{10,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Show error message for a field
 */
export function showError(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, message: string): void {
  field.classList.add('error');
  const errorElement = field.parentElement?.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }
  field.setAttribute('aria-invalid', 'true');
}

/**
 * Clear error message for a field
 */
export function clearError(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
  field.classList.remove('error');
  const errorElement = field.parentElement?.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }
  field.setAttribute('aria-invalid', 'false');
}

/**
 * Validate a single field
 */
export function validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): boolean {
  const value = field.value.trim();
  const fieldName = field.name;
  const isRequired = field.hasAttribute('required');

  // Clear previous errors
  clearError(field);

  // Check required
  if (isRequired && !value) {
    showError(field, getTranslation('required'));
    return false;
  }

  // Skip further validation if field is empty and not required
  if (!value && !isRequired) {
    return true;
  }

  // Field-specific validation
  switch (fieldName) {
    case 'name':
      if (value.length < 2) {
        showError(field, getTranslation('required'));
        return false;
      }
      break;

    case 'email':
      if (!isValidEmail(value)) {
        showError(field, getTranslation('email'));
        return false;
      }
      break;

    case 'phone':
      if (value && !isValidPhone(value)) {
        showError(field, getTranslation('phone'));
        return false;
      }
      break;

    case 'message':
      if (value.length < 10) {
        showError(field, getTranslation('minLength'));
        return false;
      }
      break;

    case 'service_interest':
      if (!value) {
        showError(field, getTranslation('required'));
        return false;
      }
      break;
  }

  return true;
}

/**
 * Validate GDPR consent checkbox
 */
export function validateGDPR(checkbox: HTMLInputElement): boolean {
  const errorElement = document.getElementById('gdpr-error');

  if (!checkbox.checked) {
    if (errorElement) {
      errorElement.textContent = getTranslation('gdpr');
      errorElement.classList.remove('hidden');
    }
    checkbox.setAttribute('aria-invalid', 'true');
    return false;
  }

  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  }
  checkbox.setAttribute('aria-invalid', 'false');
  return true;
}

/**
 * Validate entire form
 */
export function validateForm(form: HTMLFormElement): boolean {
  let isValid = true;

  // Validate all text/email/select fields
  const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    'input:not([type="checkbox"]), textarea, select'
  );

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  // Validate GDPR checkbox
  const gdprCheckbox = form.querySelector<HTMLInputElement>('#gdpr_consent');
  if (gdprCheckbox && !validateGDPR(gdprCheckbox)) {
    isValid = false;
  }

  return isValid;
}

/**
 * Initialize form validation
 */
export function initFormValidation(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  if (!form) return;

  // Validate on blur (when field loses focus)
  const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    'input:not([type="checkbox"]), textarea, select'
  );

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      validateField(field);
    });

    // Clear error on input
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  // Validate GDPR checkbox
  const gdprCheckbox = form.querySelector<HTMLInputElement>('#gdpr_consent');
  if (gdprCheckbox) {
    gdprCheckbox.addEventListener('change', () => {
      validateGDPR(gdprCheckbox);
    });
  }
}

// Initialize on DOM load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
  });
}
