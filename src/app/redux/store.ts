import {configureStore, PayloadAction} from "@reduxjs/toolkit";
import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux";
import authReducer from "@/app/redux/slices/authSlice";
import {AppDispatch, IAuthState, RootState} from "@/app/lib/definitions";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export const useAppDispatch: (authState: PayloadAction<IAuthState, "auth/setAuthState">) => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;