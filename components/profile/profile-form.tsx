import { useRef } from "react";

function ProfileForm(props:any) {
  const oldPasswordRef =useRef<any>(null);
  const newPasswordRef = useRef<any>(null);

  function submitHandler(event:any) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    console.log("start change password", {
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });

    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <div className="flex justify-center">
      <form
        className="border-1 w-80 p-5 rounded-md   bg-purple-400"
        onSubmit={submitHandler}
      >
        <div className="text-black flex flex-col font-bold">
          <label htmlFor="new-password">Nouveau mot de passe </label>
          <input
            type="password"
            className="  border-2  rounded-md hover:border-green-800  p-1 border-black"
            id="new-password"
            autoComplete="new-password"
            ref={newPasswordRef}
          />
        </div>
        <div className="text-black flex flex-col font-bold">
          <label htmlFor="old-password">Ancien mot de passe</label>
          <input
            type="password"
            className="border-2 rounded-md p-1 hover:border-green-800 border-black"
            id="old-password"
            autoComplete="new-password"
            ref={oldPasswordRef}
          />
        </div>
        <div className="flex justify-center">
          <div className=" w-40 mt-5 ">
            <button
              type="submit"
              className="bg-[#ffced4] hover:scale-105 hover:ease-in-out text-black py-2 px-2  rounded-md"
            >
              Changer de mot de passe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
