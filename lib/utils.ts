import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** cn merges conditional class names while preserving Tailwind conflict rules. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
