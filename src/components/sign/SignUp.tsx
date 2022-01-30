import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useRouter from "../../hooks/useRouter";
import Loader from '../Loader'
import Err from '../../utils/humanResp'
import AlternateEmailIcon from '../../assets/icons/email.svg'
import { useAuth } from "../../hooks/useAuth";
import { useState } from 'react';
import { displaySuccess } from '../../utils/toastMessage';

type FormValues = {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    confirm_password: string,
    phone: string | null,
    birthday: string | null
}

const SignUp = () => {

    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const { signup, load } = useAuth()

    const schema = yup.object({
        firstname: yup.string().required().min(3),
        lastname: yup.string().required().min(3),
        email: yup.string().email().required(),
        birthday: yup.string(),
        phone: yup.string(),
        password: yup.string().required().min(7),
        confirm_password: yup.string().required().min(7)
            .oneOf([yup.ref('password'), null], 'Password is different.'),
      }).required();


    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const onSubmit:SubmitHandler<FormValues> = async data => {
        await signup({ email: data.email,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        password: data.password,
                        confirm_password: data.confirm_password,
                        phone: data.phone,
                        birthday: data.birthday
                    }).then((res:any) => {
                            if (res?.success) {
                                displaySuccess("You're connected")
                                router.push('/')
                            }
                            else setError(Err(res))
                    })
        }

    return (
        <div className="mt-5">
            <h2 className="mb-4">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
                <div className="mb-5 grid grid-cols-2 gap-3">
                <div className="mb-7">
                        <Controller
                            control={control}
                            name="firstname"
                            render={({ field }) => <input {...field} type="text"
                            className="bg-transparent w-3/4 block outline-none mb-1 border-b-1 border-t-0 border-r-0 border-l-0 border-indigo-500"
                            id="firsntame"
                            placeholder="Firstname..."
                        />}
                    />
                        {errors.firstname?.type === 'required' && <span className="text-red-900 text-sm">Required</span>}
                        {errors.firstname?.type === 'min' && <span className="text-red-900 text-sm">Too small</span>}
                    </div>

                    <div className="mb-7">
                        <Controller
                            control={control}
                            name="lastname"
                            render={({ field }) => <input {...field} type="text"
                            className="bg-transparent w-3/4 block outline-none mb-1 border-b-1 border-t-0 border-r-0 border-l-0 border-indigo-500"
                            id="firsntame"
                            placeholder="Lastname..."
                        />}
                    />
                        {errors.lastname?.type === 'required' && <span className="text-red-900 text-sm">Required</span>}
                        {errors.lastname?.type === 'min' && <span className="text-red-900 text-sm">Too small</span>}
                    </div>

                    <div className="mb-7">
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => <input {...field} type="email"
                            className="bg-transparent w-3/4 block outline-none mb-1 border-b-1 border-t-0 border-r-0 border-l-0 border-indigo-500"
                            id="email"
                            placeholder="Email..."
                        />}
                    />
                        {errors.email?.type === 'required' && <span className="text-red-900 text-sm">Required</span>}
                        {errors.email?.type === 'email' && <span className="text-red-900 text-sm">Wrong format</span>}
                    </div>

                    <div className="mb-7">
                        <Controller
                                control={control}
                                name="password"
                                render={({ field }) => <input {...field} type="password"
                                className="bg-transparent w-3/4 block mb-1 outline-none border-b-1 border-t-0 border-r-0 border-l-0 border-indigo-500"
                                id="password"
                                placeholder="Password..."
                            />}
                        />
                        {errors.password?.type === 'required' && <span className="text-red-900 text-sm">Required</span>}
                        {errors.password?.type === 'min' && <span className="text-red-900 text-sm">Too small</span>}
                    </div>

                    <div className="mb-7">
                        <Controller
                                control={control}
                                name="confirm_password"
                                render={({ field }) => <input {...field} type="password"
                                className="bg-transparent w-3/4 block mb-1 outline-none border-b-1 border-t-0 border-r-0 border-l-0 border-indigo-500"
                                id="confirm_password"
                                placeholder="Confirm Password..."
                            />}
                        />
                        {errors.confirm_password?.type === 'oneOf' && <span className="text-red-900 text-sm">Wrong password</span>}
                        {errors.confirm_password?.type === 'required' && <span className="text-red-900 text-sm">Required</span>}
                        {errors.confirm_password?.type === 'min' && <span className="text-red-900 text-sm">Too small</span>}
                    </div>
            </div>

                <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-2 py-2 text-center inline-flex items-center mr-2 mb-2">
                    {load ? <Loader /> : <>
                        <img src={AlternateEmailIcon} className="w-5 mr-2" alt="register"/>
                        Register
                    </>}
                </button>
                {error && <span className="ext-red-900 text-sm">{error}</span>}
            </form>
        </div>
    )
}

export default SignUp