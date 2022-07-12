import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function MainNavigation() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }

  return (
    <header className="">
      <nav className="flex p-5  items-center">
        <div  className="flex-1">
        <Link href="/">
          <a>
            <div>Proximi</div>
          </a>
        </Link>

        </div>
        <ul className="flex items-center">
          {!session && !loading && (
            <li className="text-black rounded-md py-2 px-2 bg-purple-200 cursor-pointer hover:bg-purple-400">
        <Link href="/auth">
          <a>Login</a>
        </Link>
            </li>
          )}
          {session && (
            <li className="cursor-pointer hover:underline text-purple-200 flex mr-5">
              <Link href="/profile">
                <a>profile</a>
              </Link>
            </li>
          )}
          {session && (
            <li className="text-black rounded-md py-2 px-2 bg-purple-200 cursor-pointer hover:bg-purple-400">
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
