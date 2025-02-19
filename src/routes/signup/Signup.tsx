import { Link } from "react-router-dom";
import bg from "../../assets/bg.jpg";
import { useRef, useContext, useState } from "react";
// import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { signupInputs, signupSchema } from "./models";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export function Signup() {
  const {
    register,
    handleSubmit,
    // watch,

    formState: { errors },
  } = useForm<signupInputs>({ resolver: yupResolver(signupSchema) });

  const onSubmit: SubmitHandler<signupInputs> = (data) => console.log(data);

  const { dispatch }: any = useContext(AuthContext);

  // refs
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [location, setlocation] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const checkboxRef = useRef<HTMLInputElement>(null);

  const [wrongAuth, setWrongAuth] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const [step, setStep] = useState(1);

  // function to make the password visible
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    const inputElement1 = passwordRef.current;
    const inputElement2 = confirmPasswordRef.current;

    if (inputElement1 && inputElement2) {
      if (inputElement1.type === "password") {
        inputElement1.type = "text";
        inputElement2.type = "text";
      } else {
        inputElement1.type = "password";
        inputElement2.type = "password";
      }
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const first_name = firstNameRef.current?.value;
  //   const last_name = lastNameRef.current?.value;

  //   const password = passwordRef.current?.value;
  //   const confirmPassword = confirmPasswordRef.current?.value;
  //   // const phone_number = phoneNumberRef.current?.value;
  //   // const location = locationRef.current?.value;

  //   if (password !== confirmPassword) {
  //     setWrongAuth(true);
  //     console.error();
  //     setAuthMessage("Password confirmation does not match.");

  //     return;
  //   }

  //   if (step == 1) {
  //     try {
  //       const response = await axios.post(import.meta.env.VITE_REGISTER_URL, {
  //         first_name,
  //         last_name,
  //         email,
  //         password,
  //       });

  //       if (response.status === 200) {
  //         setStep(2);
  //         setWrongAuth(false);
  //       } else {
  //         console.log(response.data);
  //         setWrongAuth(true);
  //         setAuthMessage(response.data.message);
  //       }
  //     } catch (error: any) {
  //       setWrongAuth(true);
  //       setAuthMessage(error.response.data.message);
  //     }
  //   } else if (step == 2) {
  //     try {
  //       console.log(email);
  //       const response = await axios.post(
  //         import.meta.env.VITE_REGISTER_INFO_URL,
  //         {
  //           email,
  //           location,
  //           phone_number,
  //         }
  //       );
  //       if (response.status === 200) {
  //         dispatch({
  //           type: "LOGIN",
  //           payload: {
  //             // email: email,
  //             token: response.data.token,
  //             id: response.data.id,
  //           },
  //         });
  //       } else {
  //         setWrongAuth(true);
  //         setAuthMessage(response.data.message);
  //       }
  //     } catch (error: any) {
  //       setWrongAuth(true);
  //       setAuthMessage(error.response.data.message);
  //     }
  //   }
  // };

  return (
    <main className="my-10 flex flex-col lg:flex-row gap-10 items-center justify-center">
      <div className="filter-active--secondary">
        <div className="w-fit mb-3">
          <h1 className="capitalize text-3xl font-bold">Sign up</h1>
          <small className="capitalize font-thing">welcome</small>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="font-bold">
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: "anticipate" }}
              >
                <div className="flex flex-col md:flex-row gap-6 mb-2.5">
                  <div>
                    <label htmlFor="firstName">First name*</label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="first name"
                      className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-2"
                      // required
                      // ref={firstNameRef}
                      {...register("firstName")}
                    />

                    {errorSpan("firstName", errors)}
                  </div>
                  <div>
                    <label htmlFor="lastName">Last name*</label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="last name"
                      className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-2"
                      // required
                      // ref={lastNameRef}
                      {...register("lastName")}
                    />
                    {errorSpan("lastName", errors)}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 mb-2.5">
                  <div>
                    <label htmlFor="email">Email*</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="email"
                      className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
                      // required
                      {...register("email")}
                      // onChange={(e) => setEmail(e.target.value)}
                      // value={email !== undefined ? email : ""}
                    />
                    {errorSpan("email", errors)}
                  </div>
                  <div>
                    <label htmlFor="email">Phone number</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      placeholder="phone number"
                      className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
                      // required
                      {...register("phoneNumber")}
                      // onChange={(e) => setEmail(e.target.value)}
                      // value={email !== undefined ? email : ""}
                    />
                    {errorSpan("phoneNumber", errors)}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-start mb-2.5">
                  <div>
                    <label htmlFor="password">Password*</label>
                    <input
                      // type="password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="password"
                      className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
                      // required
                      {...register("password")}
                      // ref={passwordRef}
                    />
                    {errorSpan("password", errors)}
                    <input
                      type="checkbox"
                      className="me-3"
                      ref={checkboxRef}
                      id="showpassword"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                    <label htmlFor="showpassword">Show password</label>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword">
                      Confirm your password*
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="confirm password"
                      className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
                      // required
                      {...register("passwordConfirmation")}
                      // ref={confirmPasswordRef}
                    />
                    {errorSpan("passwordConfirmation", errors)}
                    {/* {wrongAuth && (
                      <p className="text-red-700 my-2 ">{authMessage}</p>
                    )} */}
                  </div>
                </div>
                <div className="mt-auto w-full text-right">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="border-2 border-black bg-redish font-bold py-1 px-4"
                  >
                    Submit
                  </motion.button>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                exit={{ opacity: 0 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: "anticipate" }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div>
                    <label htmlFor="">Enter Your Location</label>
                    <input
                      type="text"
                      id="location"
                      placeholder="Location"
                      className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
                      onChange={(e) => setlocation(e.target.value)}
                      value={location}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Enter Your Phone Number</label>
                    <input
                      type="number"
                      placeholder="Number"
                      className="block px-5 py-2 text-md text-black placeholder:text-sm focus:outline-none font-bold caret-grayish rounded-sm my-3"
                      value={phone_number}
                      onChange={(e) => setPhone_number(e.target.value)}
                      maxLength={10}
                    />
                  </div>
                </div>

                {wrongAuth && (
                  <p className="text-red-700 my-2 ">{authMessage}</p>
                )}
                <div className="mt-auto w-full text-right">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="border-2 border-black bg-blueish font-bold py-1 px-4"
                  >
                    Signup
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        <br />
        <p className="mt-2 text-sm font-normal">
          Have an account?
          <span className="font-bold underline">
            <Link to="/login"> Login</Link>
          </span>
        </p>
      </div>
      <div>
        <img src={bg} alt="" />
      </div>
    </main>
  );
}

const errorSpan = (fieldName: string, errors: any) => {
  return (
    <div className="text-sm text-red-400">
      {errors[fieldName] && <span>{errors[fieldName].message}</span>}
    </div>
  );
};
