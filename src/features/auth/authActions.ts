import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL =
    process.env.NODE_ENV !== 'production'
        ? 'http://127.0.0.1:5000'
        : import.meta.env.VITE_SERVER_URL

const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }: any, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                `${backendURL}/api/user/login`,
                { email, password },
                config
            )

            // store user's token in local storage
            localStorage.setItem('userToken', data.userToken)

            return data
        } catch (error: any) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

const registerUser = createAsyncThunk(
    'auth/register',
    async ({ firstName, email, password }: { firstName: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            await axios.post(
                `${backendURL}/api/user/register`,
                { firstName, email, password },
                config
            )
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export { userLogin, registerUser }