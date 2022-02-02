import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useRouter from "../../hooks/useRouter";
import Err from '../../utils/humanResp'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../Loader'
import AlternateEmailIcon from '../../assets/icons/email.svg'
import GoogleIcon from '../../assets/icons/google.svg'
import { displaySuccess } from "../../utils/toastMessage";

type FormValues = {
    email: string,
    password: string,
}

const SignIn = () => {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const { signWithProvider, login, load } = useAuth()

    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required().min(7),
      }).required();

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit:SubmitHandler<FormValues> = async ({email, password}) => {
        await login({ email, password })
            .then((res:any) => {
                if (res?.success) {
                    displaySuccess("You're connected")
                    router.push('/')
                }
                else setError(Err(res))
            })
    }

    const signGoogle = async () => {
        signWithProvider()
            .then((res:any) => {
                if (res?.success) {
                    displaySuccess("You're connected")
                    router.push('/')
                }
                else setError(res)
            })
    }

    return (
        <div className="mt-5">
            <h2 className="mb-4 text-lg">I already have an email !</h2>
            <span>Login</span>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">

                <div className="mb-7">
                    <Controller
                        control={control}
                        name="email"
                        defaultValue={""}
                        render={({ field }) => <input {...field} type="email"
                        className="bg-transparent w-3/4 block outline-none mb-1 border-b-1 mt-8 border-t-0 border-r-0 border-l-0 border-indigo-500"
                        id="email"
                        placeholder="Email..."
                    />}
                />
                    {errors.email?.type === 'required' && <span className="text-red-900 text-sm">Required</span>}
                    {errors.email?.type === 'email' && <span className="text-red-900 text-sm">Wrong format</span>}
                </div>

                <div className="mb-10">
                    <Controller
                            control={control}
                            name="password"
                            defaultValue={""}
                            render={({ field }) => <input {...field} type="password"
                            className="bg-transparent w-3/4 block mb-1 outline-none border-b-1 border-t-0 border-r-0 border-l-0 border-indigo-500"
                            id="password"
                            placeholder="Password..."
                        />}
                    />
                    {errors.password?.type === 'required' && <span className="text-red-900 text-sm">Required</span>}
                    {errors.password?.type === 'min' && <span className="text-red-900 text-sm">Too small</span>}
                </div>

                <button type="submit" disabled={load} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-2 py-2 text-center inline-flex items-center mr-2 mb-2">
                    {load ? <Loader /> : <>
                        <img src={AlternateEmailIcon} className="w-5 mr-2" alt="email"/>
                        Login by mail
                    </>}
                </button>

                <button type="button" disabled={load} className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 rounded-lg text-sm px-2 py-2 text-center inline-flex items-center mr-2 mb-2"
                onClick={signGoogle}>
                    {load ? <Loader /> : <>
                        <img src={GoogleIcon} className="w-5 mr-2" alt="google"/>
                        Login by Google
                    </>}
                </button>

                {error && <span className="text-red-900 text-sm block">{error}</span>}
            </form>
        </div>
    )
}

export default SignIn