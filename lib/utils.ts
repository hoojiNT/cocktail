import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { camelize, getCurrentInstance, toHandlerKey } from "vue";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
