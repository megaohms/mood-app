import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
    return <SignUp afterSignUpUrl="/new-user" redirect-url="new-user" />
}

export default SignUpPage
