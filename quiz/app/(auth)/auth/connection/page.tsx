import { SignInForm } from "@/components/auth/signin/sign-in-form"


const SignIn =()=>{
    return(
        <div className="w-full h-full flex items-center justify-center   ">
            <div className=" w-full px-10 md:py-0 py-14 flex flex-col items-center space-y-6">
            <SignInForm/>
            </div>
            
        </div>
    )
}
export default SignIn