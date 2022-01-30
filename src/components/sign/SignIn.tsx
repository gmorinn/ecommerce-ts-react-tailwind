import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useInput from "../../hooks/useInput";
import useRouter from "../../hooks/useRouter";
// import * as api from '../firebase/api'
import Err from '../../utils/humanResp'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../Loader'
import AlternateEmailIcon from '../../assets/icons/email.svg'
import UseFormGroup from "../../hooks/useForm";
import { displaySuccess } from "../../utils/toastMessage";

const styles = {
    outline: '0',
    borderWidth:'0 0 1px',
    borderColor: 'black',
}

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

    const email = useInput("", "email", "email", "Email...", "w-100", styles)
    const password = useInput("", "password", "password", "Password...", "w-100", styles)

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

    // const signGoogle = async (data) => {
    //     await api.SignWithGoogle(signWithProvider)
    // }

    return (
        <div className="mt-5">
            <h2 className="mb-4">I already have an email !</h2>
            <span>Login</span>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">

                <div className="mb-4">
                    <UseFormGroup bind={email} control={control} />
                    {errors.email?.type === 'required' && <span className="text-danger">Required</span>}
                    {errors.email?.type === 'email' && <span className="text-danger">Wrong format</span>}
                </div>

                <div className="mb-4">
                    <UseFormGroup bind={password} control={control} />
                    {errors.password?.type === 'required' && <span className="text-danger">Required</span>}
                    {errors.password?.type === 'min' && <span className="text-danger">Too small</span>}
                </div>
               
                <button type="submit" className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-2 py-2 text-center inline-flex items-center mr-2 mb-2">
                    {load ? <Loader /> : <>
                        <img src={AlternateEmailIcon} className="w-5"/>
                        Login by mail
                    </>}
                </button>

                {/* <Button size="small" className="w-100 px-5 pt-3 pb-3 mb-2" variant="contained" color='error' disabled={load} onClick={signGoogle}>
                    {load ? <Loader /> : <><Box component="i" marginRight="1rem"><GoogleIcon /></Box>Login with Google</>}
                </Button> */}

                {error && <span className="text-danger">{error}</span>}
            </form>
        </div>
    )
}

export default SignIn