import type { FormEvent } from "react";

export type AuthView = "login" | "signup";

export type AuthSubmitHandler = (event: FormEvent<HTMLFormElement>) => void;
