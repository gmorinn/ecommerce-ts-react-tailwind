import { FC, lazy } from "react";
const SignIn = lazy(() => import("../components/sign/SignIn"))
const SignUp = lazy(() => import( "../components/sign/SignUp"))

const Sign:FC = () => {
    return (
        <div className="mb-5 grid grid-cols-2 gap-3">
            <SignIn />
            <SignUp />
        </div>
    )
}

export default Sign