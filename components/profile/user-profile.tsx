import ProfileForm from "./profile-form";

function UserProfile() {

  async function changePasswordHandler(passwordData:Object) {
    console.log("change password: call api endpoint", passwordData);
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <section className="">
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
