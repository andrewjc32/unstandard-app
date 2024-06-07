"use server"

import { signUpSchema, SignUpSchema } from "@/lib/schemas/registerSchema";

export async function signUp(data: SignUpSchema) { 
  const validated = signUpSchema.safeParse(data);

  if (!validated.success) {
    return { error: validated.error.errors };
  }

  const { name, email, password } = validated.data;

  try {
    const res = await fetch("http://localhost:9090/user/create", { 
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData };
    }

    return await res.json();
  } catch (error) {
    return { error: "Network error, please try again later." };
  }
}