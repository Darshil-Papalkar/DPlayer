"use server";

import {z} from "zod";
import {LOGIN_USER, REGISTER_USER} from "@/app/lib/routes.config";
import {FormBody, LoginFormState, RegisterFormState} from "@/app/lib/definitions";
import CONSTANTS from "@/app/lib/enums";

const LoginSchema = z.object({
    id: z.string(),
    email: z.coerce.string().email({
        message: "Invalid email address",
    }),
    password: z.coerce.string().min(8, {
        message: "Password should be atleast 8 characters",
    }),
});
const LoginUser = LoginSchema.omit({id: true});

export const loginUser = async (
    prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> => {
    const validateFields = LoginUser.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing Fields, Failed to Login.",
            success: {}
        };
    }

    const {email, password}: FormBody = validateFields.data;
    try {
        const body = {
            userEmail: email,
            userPassword: password
        };
        const response = await fetch(LOGIN_USER, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(!response.ok) {
            const errorText = await response.text();
            return {
                errors: {},
                message: errorText,
                success: {}
            }
        }
        const data = await response.text();
        console.log(data);
        return {
            errors: {},
            message: null,
            success: {
                id: data,
                message: CONSTANTS.SUCCESS,
            },
        };
    } catch (error: any) {
        console.error(error);
        return {
            errors: {},
            message: "Failed to Login User, please try again later!",
            success: {}
        }
    }
};

const RegisterSchema = z.object({
    id: z.string(),
    name: z.coerce.string({
        invalid_type_error: "Name cannot be empty"
    }),
    email: z.coerce.string().email({
        message: "Invalid email address",
    }),
    password: z.coerce.string().min(8, {
        message: "Password should be atleast 8 characters",
    }),
});

const RegisterUser = RegisterSchema.omit({id: true});


export const registerUser = async (
    prevState: RegisterFormState,
    formData: FormData
): Promise<RegisterFormState> => {
    const validateFields = RegisterUser.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: "Missing Fields, Failed to Register.",
            success: {}
        };
    }

    const {name, email, password}: FormBody = validateFields.data;
    try {
        const body = {
            userName: name,
            userEmail: email,
            userPassword: password
        };
        const response = await fetch(REGISTER_USER, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(!response.ok) {
            const errorText = await response.text();
            return {
                errors: {},
                message: errorText,
                success: {}
            }
        }
        const data = await response.text();
        console.log(data);
        return {
            errors: {},
            message: null,
            success: {
                id: data,
                message: CONSTANTS.SUCCESS
            },
        }
    } catch (error: any) {
        console.error(error);
        return {
            errors: {},
            message: "Failed to Register, Something went Wrong",
            success: {}
        };
    }
};
