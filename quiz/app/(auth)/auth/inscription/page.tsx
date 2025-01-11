import { SignUpForm } from "@/components/auth/signup/sign-up-form"
import TestimonialCard from "@/components/testimonial-card"

const SignUp =()=>{
    return(
        <div className="w-full h-full flex items-center   ">
            <div className="hidden md:flex md:w-1/2  flex-col items-center space-y-6">
            <TestimonialCard/>
            </div>
            <div className="md:w-1/2 w-full px-10 md:py-0 py-14 flex flex-col items-center space-y-6">
            <SignUpForm/>
            </div>
            
        </div>
    )
}
export default SignUp