"use client";

import {useFormState} from "react-dom";
import {loginUser, redirectToDashboard, registerUser} from "@/app/lib/actions";
import {useState} from "react";
import {FormState, LoginFormState, RegisterFormState} from "@/app/lib/definitions";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";

const initialLoginState: LoginFormState = {message: null, errors: {}, success: {}};
const initialRegisterState: RegisterFormState = {message: null, errors: {}, success: {}};

const FormContainer = () => {
    const [formType, setFormType] = useState<FormState>("login");

    const [loginState, loginDispatch] = useFormState(loginUser, initialLoginState);
    const [registerState, registerDispatch] = useFormState(registerUser, initialRegisterState);

    // const {authId, authState} = useAppSelector(state => state.auth);

    // console.log(authId, authState);

    // const authDispatch = (userId: string | null) => {
    //     const userPayload: IAuthState = {
    //         authId: userId,
    //         authState: true
    //     }
    //     useAppDispatch(setAuthState(userPayload));
    //     // redirect("/dashboard", RedirectType.push);
    // }

    // if(loginState.success?.message?.toLowerCase().includes(TYPES.SUCCESS)) {
    //     const userId = loginState.success?.id;
    //     console.log(userId);
    //     authDispatch(userId ?? "");
    // }

    // if(registerState.success?.message?.toLowerCase().includes(TYPES.SUCCESS)) {
    //     const userId = registerState.success?.id;
    //     console.log(userId);
    //     authDispatch(userId ?? "");
    // }

    const skipHandler = () => {
        console.log("Skip");
        // authDispatch(null);
        redirectToDashboard();
    };

    const handleFormToggle = () => {
        setFormType(prevState => prevState === 'login' ? "register" : "login");
    }

    return (
        <div className={`login-card ${formType} max-w-sm rounded-2xl overflow-hidden shadow-lg`}>
            <div className="login-card-inner">
                <form className="customForm-login flex flex-col justify-center" action={loginDispatch}>
                    <div className="text-3xl text-center mb-4 text-nowrap">Welcome Back</div>
                    <hr className="mb-4"/>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        placeholder="Email*"
                        className="custom-form-input text-lg px-5 py-2 border-solid border-white border rounded-md my-2"
                        defaultValue=""
                        aria-describedby="email-error"
                        required
                    />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {loginState.errors?.email &&
                            loginState.errors.email.map((error: string) => (
                                <p className="mt-1 mb-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="off"
                        placeholder="Password*"
                        className="custom-form-input text-lg px-5 py-2 border-solid border-white border rounded-md my-2"
                        minLength={8}
                        defaultValue=""
                        aria-describedby="password-error"
                        required
                    />
                    <div id="password-error" aria-live="polite" aria-atomic="true">
                        {loginState.errors?.password &&
                            loginState.errors.password.map((error: string) => (
                                <p className="mt-1 mb-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    <div
                        className="flex items-center space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {loginState.message && (
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                                <p className="text-sm text-red-500">{loginState.message}</p>
                            </>
                        )}
                    </div>
                    <div className="flex flex-row justify-between flex-nowrap mt-2">
                        <button
                            type="submit"
                            className="text-lg px-5 py-2 border-solid border-white border rounded-md my-2 w-fit "
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={skipHandler}
                            className="text-lg px-5 py-2 border-solid border-white border rounded-md my-2 w-fit "
                        >
                            Skip
                        </button>
                    </div>
                    <div className="formFooter mt-3 flex justify-between">
                        <p>Don't Have an Account?</p>
                        <p onClick={handleFormToggle}>Register Here</p>
                    </div>
                </form>
                <form className="customForm-register flex flex-col justify-center" action={registerDispatch}>
                    <div className="text-3xl text-center mb-4 text-nowrap">Register Here</div>
                    <hr className="mb-4"/>
                    <input
                        id="registerName"
                        name="name"
                        type="name"
                        autoComplete="off"
                        placeholder="Name*"
                        className="custom-form-input text-lg px-5 py-2 border-solid border-white border rounded-md my-2"
                        defaultValue=""
                        aria-describedby="name-error"
                        required
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {registerState.errors?.name &&
                            registerState.errors.name.map((error: string) => (
                                <p className="mt-1 mb-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    <input
                        id="registerEmail"
                        name="email"
                        type="email"
                        autoComplete="off"
                        placeholder="Email*"
                        className="custom-form-input text-lg px-5 py-2 border-solid border-white border rounded-md my-2"
                        defaultValue=""
                        aria-describedby="email-error"
                        required
                    />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {registerState.errors?.email &&
                            registerState.errors.email.map((error: string) => (
                                <p className="mt-1 mb-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    <input
                        id="registerPassword"
                        name="password"
                        type="password"
                        autoComplete="off"
                        placeholder="Password*"
                        className="custom-form-input text-lg px-5 py-2 border-solid border-white border rounded-md my-2"
                        minLength={8}
                        defaultValue=""
                        aria-describedby="password-error"
                        required
                    />
                    <div id="password-error" aria-live="polite" aria-atomic="true">
                        {registerState.errors?.password &&
                            registerState.errors.password.map((error: string) => (
                                <p className="mt-1 mb-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    <div
                        className="flex items-center space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {registerState.message && (
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                                <p className="text-sm text-red-500">{registerState.message}</p>
                            </>
                        )}
                    </div>
                    <div className="flex flex-row justify-between flex-nowrap mt-2">
                        <button
                            type="submit"
                            className="text-lg px-5 py-2 border-solid border-white border rounded-md my-2 w-fit "
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={skipHandler}
                            className="text-lg px-5 py-2 border-solid border-white border rounded-md my-2 w-fit "
                        >
                            Skip
                        </button>
                    </div>
                    <div className="formFooter mt-3 flex justify-between">
                        <p>Already Have an Account?</p>
                        <p onClick={handleFormToggle}>Login Here</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormContainer;
