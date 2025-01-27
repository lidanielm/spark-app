import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import { useEffect } from 'react'
import store from '../app/store'

type AppDispatch = typeof store.dispatch

const LoginScreen = () => {
    const { loading, userInfo, error } = useSelector((state: any) => state.auth)

    const useAppDispatch = () => useDispatch<AppDispatch>()
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userInfo) {
            navigate('/user-profile')
        }
    }, [navigate, userInfo])

    const submitForm = (data: any) => {
        const dispatch = useAppDispatch()
        dispatch(userLogin(data))
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            {error}
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    className='form-input'
                    {...register('email')}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    className='form-input'
                    {...register('password')}
                    required
                />
            </div>
            <button type='submit' className='button' disabled={loading}>
                {loading ? "Loading..." : 'Login'}
            </button>
        </form>
    )
}

export default LoginScreen