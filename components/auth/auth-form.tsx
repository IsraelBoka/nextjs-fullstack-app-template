import { useState, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import classes from "./auth-form.module.css";


const validationschema = Yup.object().shape({
  enteredEmail: Yup.string()
    .email("Email incorrect !")
    .required("field required")
    .typeError("Email mal renseigné"),
  enteredPassword: Yup.string()
    .min(6, "Mot de passe doit être > à 6 caractères")
    .required("field required")
    .typeError("Mot de passe doit être > à 6 caractères"),
});

async function createUser(email: string, password: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  // login after signup
  const result = await signIn("credentials", {
    redirect: true,
    email: email,
    password: password,
  });

  // console.log("signup",data)
  return data;
}

function AuthForm() {
  const [errors, setErrors] = useState("");
  const [success, setSucces] = useState('');
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitSignup(email:string,password:string){
    try {
      const result = await createUser(email, password);
      console.log(result);
    } catch (error:any) {
      console.log(error.message);
      setErrors(error.message)
    }
  }
  async function submitSignin(email:string,password:string){

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    if (result) {
      if (!result.error) {
        // set some auth state
        router.replace("/profile");
      }
      else{
        console.log(result.error)
        setErrors(result.error)
      }
    }
    
  }

  async function submitHandler(event: any) {
    event.preventDefault();
    if (emailInputRef.current !== null && passwordInputRef.current !== null) {
      const enteredEmail: string = emailInputRef.current.value;
      const enteredPassword: string = passwordInputRef.current.value;

      let formdata = {
        enteredEmail,
        enteredPassword,
      };

      const isValid = await validationschema.isValid(formdata);
      try {
        validationschema.validateSync(formdata);
      } catch (err: any) {
        setErrors(err.message);
      }
      if (isValid) {
        if (isLogin) {
          submitSignin(enteredEmail,enteredPassword)
        }
        else{
          submitSignup(enteredEmail,enteredPassword)
        }
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className="flex justify-center text-green-600 ">{success}</div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="text-red-500 flex justify-end">{errors}</div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
