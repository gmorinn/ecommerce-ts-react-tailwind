import { Button, Box, Grid } from '@mui/material';
import useInput from "../../hooks/useInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-phone-input-2/lib/material.css'
import * as yup from "yup";
import useRouter from "../../hooks/useRouter";
import Loader from '../Loader'
import Err from '../../utils/humanResp'
// import * as api from '../../firebase/api'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
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

            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 5 }}>
                <Grid item md={6} className="mb-4">
                    <UseFormGroup bind={firstname} control={control} />
                    {errors.firstname?.type === 'required' && <span className="text-danger">Required</span>}
                </Grid>

               <Grid item md={6} className="mb-4">
                    <UseFormGroup bind={lastname} control={control} />
                    {errors.lastname?.type === 'required' && <span className="text-danger">Required</span>}
                </Grid>

                <Grid item md={6} className="mb-4">
                    <UseFormGroup bind={password} control={control} />
                    {errors.password?.type === 'required' && <span className="text-danger">Required</span>}
                    {errors.password?.type === 'min' && <span className="text-danger">Too small</span>}
                </Grid>

                <Grid item md={6} className="mb-4">
                    <UseFormGroup bind={confirm_password} control={control} />
                    {errors.confirm_password?.type === 'required' && <span className="text-danger">Required</span>}
                    {errors.confirm_password?.type === 'min' && <span className="text-danger">Too small</span>}
                    {errors.confirm_password?.type === 'oneOf' && <span className="text-danger">Wrong password</span>}
                </Grid>

                <Grid item md={6} className="mb-4">
                    <UseFormGroup 
                        date
                        bind={birthday}
                        format="MM/dd/yyyy"
                        label="Birthday"
                    />
                </Grid>

                <Grid item md={6}>
                    <UseFormGroup bind={email} control={control} />
                    {errors.email?.type === 'required' && <span className="text-danger">Required</span>}
                    {errors.email?.type === 'email' && <span className="text-danger">Wrong format</span>}
                </Grid>

                <Grid item md={6} className="mb-4">
                    <UseFormGroup bind={phone} phone control={control}/>
                </Grid>

            </Grid>

                <Button className="w-100 px-5 pt-3 pb-3" type='submit' disabled={load} variant="outlined">
                    {load ? <Loader /> : <><Box component="i" marginRight="1rem"><AlternateEmailIcon /></Box>Register</>}
                </Button>
                {error && <span className="text-danger text-center">{error}</span>}
            </form>
        </div>
    )
}

export default SignUp