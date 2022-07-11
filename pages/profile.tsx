import React from 'react'
import { useRouter } from 'next/router';
import { getSession } from "next-auth/react";
import { useEffect, useState } from 'react';


function Profile({datastringify}:any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getSession().then((session) => {
        if (!session) {
          router.replace('/');
        }
        else {
            setIsLoading(false);
          }
      });
    }, [router]);
    if (isLoading) {
        return <p>Loading...</p>;
      }
    
  
  return (
    <div>
        {datastringify}
        <br/>
        test
    </div>
  )
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient
export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const sessionuser = await getSession(ctx)
    console.log(sessionuser?.user?.email)
    const emailuser = (sessionuser?.user?.email) 
    const data  = await prisma.user.findUnique({
        where:{
            email: JSON.stringify(emailuser)
        },
    })

    const datastringify = JSON.stringify(data)
    return {
        props: {
            datastringify
        }
    }
}
export default Profile