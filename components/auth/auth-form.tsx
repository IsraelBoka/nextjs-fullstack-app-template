import { useState, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as Yup from "yup";


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
    <section className='flex flex-col justify-center'>
      <h1 className="flex justify-center">{isLogin ? "Connectez-vous" : "Inscrivez-vous"}</h1>
      <div className="flex justify-center mt-5">
      <form onSubmit={submitHandler} className="border-1 w-80 p-5 rounded-md   bg-purple-400">
        <div className="flex justify-center text-green-600 ">{success}</div>
        <div className='text-black flex flex-col font-bold'>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" className='border-2  rounded-md hover:border-green-800  p-1 border-black' required ref={emailInputRef} />
        </div>
        <div className='text-black flex flex-col font-bold'>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            className="border-2  rounded-md hover:border-green-800  p-1 border-black"
            ref={passwordInputRef}
          />
        </div>
        <div className="text-black flex justify-end">{errors}</div>
        <div className='flex flex-col justify-center'>
          <button className="flex justify-center bg-black hover:scale-105 mb-5">{isLogin ? "Connexion" : "Créer un compte"}</button>
          <button
            type="button"
            className='bg-[#ffced4] hover:scale-105 hover:ease-in-out text-black py-2 px-2  rounded-md'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Créer un compte" : "Vous avez déjà un compte"}
          </button>
        </div>
      </form>

      </div>
    </section>
  );
}

export default AuthForm;
