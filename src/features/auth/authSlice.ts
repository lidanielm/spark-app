import { createSlice } from '@reduxjs/toolkit'
import { userLogin, registerUser } from './authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') // delete token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        },
        setCredentials: (state, { payload }) => {
            state.userInfo = payload
        },
    },
    extraReducers: (builder) => {
        // login user
        builder.addCase(userLogin.pending, (state: any) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(userLogin.fulfilled, (state: any, { payload }: { payload: any }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.userToken
        })
        builder.addCase(userLogin.rejected, (state: any, { payload }: { payload: any }) => {
            state.loading = false
            state.error = payload
        })
        // register user
        builder.addCase(registerUser.pending, (state: any) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(registerUser.fulfilled, (state: any, { payload }: { payload: any }) => {
            state.loading = false
            state.success = true // registration successful
        })
        builder.addCase(registerUser.rejected, (state: any, { payload }: { payload: any }) => {
            state.loading = false
            state.error = payload
        })
    },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer