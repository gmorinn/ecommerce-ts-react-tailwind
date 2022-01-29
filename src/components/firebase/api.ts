import { firebase, googleAuthProvider } from './firebase'
import moment from 'moment'
import Err from '../../utils/humanResp'
import { SignUpParams, SignWithSocialMediaParams } from '../../utils/types'

// type SignupWithMailAndPasswordProps = {
//     firstname: string
//     lastname: string
//     email: string
//     password: string
//     confirm_password: string
//     birthday?: string
//     phone?: string
//     signup: (reqBody:SignUpParams) => Promise<any>
// }

// export const SignupWithMailAndPassword = async ({ firstname, lastname, email, password, confirm_password, birthday, phone, signup }:SignupWithMailAndPasswordProps) => {
//     const body = {
//         firstname,
//         lastname,
//         email,
//         password,
//         confirm_password,
//         phone,
//         birthday: birthday ? moment(birthday).format('DD-MM-YYYY') : null,
//     }
//     await signup(body)
//         .then((res:any) => {
//             if (!res?.success) { throw Err(res) }
//         })
// }


// export const SignWithGoogle = async (signWithProvider:(payload:SignWithSocialMediaParams) => Promise<any> ) => {
//     await firebase
//         .auth()
//         .signInWithPopup(googleAuthProvider)
//         .then(async (res:any) => {
//             if (res && res.additionalUserInfo && res.user) {
//                 if (res.user.multiFactor.user) {
//                     const payload = {
//                         firstname: res.additionalUserInfo.profile.given_name,
//                         lastname: res.additionalUserInfo.profile.family_name,
//                         email: res.additionalUserInfo.profile.email,
//                         firebase_provider: res.additionalUserInfo.providerId,
//                         firebase_uid: res.user.multiFactor.user.uid,
//                         firebase_id_token: res.user.multiFactor.user.accessToken,
//                     }
//                     await signWithProvider(payload)
//                         .catch((err:any) => { throw Err(err) })
//                 }
//             }
//         })
// }