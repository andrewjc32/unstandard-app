"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma/prisma";
import { signUpSchema, SignUpSchema } from "@/lib/schemas/signUpSchema";
import { Users } from "@prisma/client";
import { ActionResult } from "@/types";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { AuthError } from "next-auth";

export async function signUp(data: SignUpSchema): Promise<ActionResult<Users>> {
  try {
    const validated = signUpSchema.safeParse(data);

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { status: 'error', error: "User already exists." };
    }
    const user = await prisma.users.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return { status: 'success', data: user };
  } catch (error) {
    console.error(error);
    return { status: 'error', error: "An error occurred, please try again later." };
  }
}

export async function getUserByEmail(email: string) {
    return prisma.users.findUnique({
      where: { email }
    });
}

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });

    console.log(result);
    return { status: 'success', data: 'Logged in' };
  } catch (error) {
    console.error(error);
    if(error instanceof AuthError) {
      switch(error.type) {
        case 'CredentialsSignin': {
          return { status: 'error', error: 'Invalid credentials' };
        }
        default: {
          return { status: 'error', error: 'An error occurred, please try again later.' };
        }
      }
    } else {
      return { status: 'error', error: 'An error occurred, please try again later.' };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}
