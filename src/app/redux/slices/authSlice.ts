import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {IAuthState} from "@/app/lib/definitions";

const initialState: IAuthState = {
    authId: null,
    authState: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<IAuthState>) => {
            console.log(action.payload);
            state.authId = action.payload.authId;
            state.authState = action.payload.authState;
        },
    },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;