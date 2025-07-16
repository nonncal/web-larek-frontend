interface IFormState {
  valid: boolean;
  errors: string[];
}

type FormError = Partial<Record<keyof IOrderForm, string>>