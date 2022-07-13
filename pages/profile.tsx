import React from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { PrismaClient, User } from "@prisma/client";
import ProfileForm from "../components/profile/user-profile"
import Loading from "../components/Loading";
import Link from "next/link";
const prisma = new PrismaClient();



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sessionuser = await getSession(ctx);
  const testuser5 = String(sessionuser?.user?.email)
  const data =  await prisma.user.findUnique({
    select:{
        id:true,
        email:true,
        firstName: true,
        lastName: true,
    },
    where: {
      email: testuser5,
    },
  });
  return {
    props: {
      data,
    },
  };
};
function Profile(data : any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);
  if (isLoading) {
    return <div className="flex justify-center">
            <Loading/>
    </div>;
  }

  return (
    <div>
        <pre>
            Bienvenue : {data.data?.email}
        </pre>
        <Link href={'./profilepassword'}>
        <a>Changement de mdp</a>
        </Link>
      
    </div>
  );
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export default Profile;
