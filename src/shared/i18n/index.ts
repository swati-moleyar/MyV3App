import en from "./en";
import fr from "./fr";

export type Messages = typeof en;

export const messages: Record<string, Messages> = {
  en,
  fr,
};
