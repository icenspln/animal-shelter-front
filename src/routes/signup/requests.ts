import {axiosInstance} from "../../api/axios";
import { signupData } from "./models";




export const signup = (data: signupData) => {
     axiosInstance.get("/auth/register",{data} )
}