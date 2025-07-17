import { IOrderForm } from "../Order";

export type FormError = Partial<Record<keyof IOrderForm, string>>