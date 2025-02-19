import {object, string,number, ref} from "yup"

export type signupData = {
     firstName: string,
     lastName: string,
     email: string,
     password: string,
     phoneNumber: string

}
export type signupInputs = {
     firstName: string,
     lastName: string,
     email: string,
     password: string,
     passwordConfirmation: string,
     phoneNumber?: string 
}

export const signupSchema = object({
     firstName: string().matches(/^[a-z]+$/i,"wrong name").max(15).required("field required"),
     lastName: string().matches(/^[a-z]+$/i,"wrong name").max(15).required("field required"),
     email: string().email().required("field required"),
     password: string().min(4).max(255).required("field required"),
     passwordConfirmation: string().oneOf([ref("password")], "passwords must match")
     .min(4).max(255).required("field required"),
     phoneNumber: string().optional().test(
      'matches-regex',
      'wrong phone number',
      (value) => !value || /^\d+$/.test(value) // Allow empty or match regex
    )
     // .matches(/^\d+$/, "Wrong number")
})
