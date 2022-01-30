import useInput from "../../hooks/useInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useRouter from "../../hooks/useRouter";
import Loader from '../Loader'
import Err from '../../utils/humanResp'
// import * as api from '../../firebase/api'
import AlternateEmailIcon from '../../assets/icons/email.svg'
import { useAuth } from "../../hooks/useAuth";
import UseFormGroup from "../../hooks/useForm";
import { useState } from 'react';
import { displaySuccess } from '../../utils/toastMessage';

const styles = {
    outline: '0',
    borderWidth:'0 0 1px',
    borderColor: 'black',
}

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

    const firstname = useInput("", "firstname", "text", "Firstname...", "w-100", styles)
    const lastname = useInput("", "lastname", "text", "Lastname...", "w-100", styles)
    const email = useInput("", "email", "email", "Email...", "w-100", styles)
    const password = useInput("", "password", "password", "Password...", "w-100", styles)
    const confirm_password = useInput("", "confirm_password", "password", "Confirm password...", "w-100", styles)
    const phone = useInput("", "phone", "phone", "Phone number...", "w-100")
    const birthday = useInput(null, "birthday", "date", "Birthday...", "w-100")

    const onSubmit:SubmitHandler<FormValues> = async data => {
        await signup({ email: data.email,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        password: data.password,
                        confirm_password: data.confirm_password,
                        phone: data.phone,
                        birthday: data.birthday
                    }) .then((res:any) => {
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
                <div className="mb-4">
                    <UseFormGroup bind={firstname} control={control} />
                    {errors.firstname?.type === 'required' && <span className="text-danger">Required</span>}
                </div>

               <div className="mb-4">
                    <UseFormGroup bind={lastname} control={control} />
                    {errors.lastname?.type === 'required' && <span className="text-danger">Required</span>}
                </div>

                <div className="mb-4">
                    <UseFormGroup bind={password} control={control} />
                    {errors.password?.type === 'required' && <span className="text-danger">Required</span>}
                    {errors.password?.type === 'min' && <span className="text-danger">Too small</span>}
                </div>

                <div className="mb-4">
                    <UseFormGroup bind={confirm_password} control={control} />
                    {errors.confirm_password?.type === 'required' && <span className="text-danger">Required</span>}
                    {errors.confirm_password?.type === 'min' && <span className="text-danger">Too small</span>}
                    {errors.confirm_password?.type === 'oneOf' && <span className="text-danger">Wrong password</span>}
                </div>

                <div className="mb-4">
                    <UseFormGroup 
                        date
                        bind={birthday}
                        format="MM/dd/yyyy"
                        label="Birthday"
                    />
                </div>

                <div>
                    <UseFormGroup bind={email} control={control} />
                    {errors.email?.type === 'required' && <span className="text-danger">Required</span>}
                    {errors.email?.type === 'email' && <span className="text-danger">Wrong format</span>}
                </div>

                <div className="mb-4">
                    <UseFormGroup bind={phone} phone control={control}/>
                </div>

            </div>

                <button type="submit" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                    {load ? <Loader /> : <>
                        <img src={AlternateEmailIcon} className="w-5"/>
                        Register
                    </>}
                </button>
                {error && <span className="text-danger text-center">{error}</span>}
            </form>
        </div>
    )
}

export default SignUp