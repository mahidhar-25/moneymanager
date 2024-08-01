import { Account, Users } from "@/types/LendingManager";
import { z } from "zod";

const userSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, { message: "Name must be at least 3 characters long." }),
    phoneNo: z
        .string()
        .trim()
        .length(10, { message: "Phone number must be exactly 10 digits." }),
    state: z.string().trim().min(1, { message: "State is required." }),
    city: z.string().trim().min(1, { message: "City is required." }),
    pincode: z.string().trim().min(1, { message: "Pincode is required." }),
    address: z.string().trim().min(1, { message: "Address is required." }),
});

type UserWithoutId = Omit<Users, "id">;

export function userSchemaValidation(user: UserWithoutId) {
    const result = userSchema.safeParse(user);

    if (!result.success) {
        const errors = result.error.errors.map((err) => {
            return {
                path: err.path.join("."),
                message: err.message,
            };
        });

        console.log("Validation Errors:", errors);
        return errors;
    }

    console.log("Validation Success:", result.data);
    return null; // No errors, validation passed
}

const accountSchema = z.object({
    username: z
        .string()
        .trim()
        .nonempty({ message: "Username is required and cannot be empty" }),
    principal: z.number().min(1, { message: "Principal must be at least 1" }),
    interestRate: z
        .number()
        .min(0, { message: "Interest rate cannot be negative" }),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date().nullable(),
    compounded: z.boolean({ required_error: "Compounded is required" }),
    forNoOfYears: z
        .number()
        .min(0, { message: "Number of years cannot be negative" }),
    userId: z.string().trim().cuid({ message: "User ID must be a valid CUID" }),
});

type AccountWithOutDates = Omit<Account, "id" | "createdAt" | "updatedAt">;

export function accountSchemaValidation(account: AccountWithOutDates) {
    const result = accountSchema.safeParse(account);

    if (!result.success) {
        const errors = result.error.errors.map((err) => {
            return {
                path: err.path.join("."),
                message: err.message,
            };
        });

        console.log("Validation Errors:", errors);
        return errors;
    }

    console.log("Validation Success:", result.data);
    return null; // No errors, validation passed
}
