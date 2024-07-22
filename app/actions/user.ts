"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

const client = new PrismaClient();
const userSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
});
export async function signInAction(username: string, password: string) {
    const response = userSchema.safeParse({ username, password });
    if (!response.success) {
        return { message: "Email or password doesn't meet validation!" , status : 402 };
    }

    const user = await client.user.findFirst({
        where: { username },
    });
    if (!user) {
        return { message: "Invalid email or password!" , status : 403 };
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
const isPasswordValid = password===user.password;
    if (!isPasswordValid) {
        return { message: "Invalid email or password!" ,   status : 403 };
    }

    return { message: "Sign in successful!", user  , status : 200};
}

export async function signUpAction(username: string, password: string) {
    const response = userSchema.safeParse({ username, password });
    if (!response.success) {
        return { message: "Email or password doesn't meet validation!"  , status : 402};
    }

    // Check if the user already exists
    const existingUser = await client.user.findUnique({
        where: { username },
    });

    if (existingUser) {
        return { message: "User already exists!" , status : 401 };
    }

    // Create new user
    
    const newUser = await client.user.create({
        data: {
            username,
            password,
        },
    });


    
    return { message: "User created successfully!", user: newUser , status:200 };
}
