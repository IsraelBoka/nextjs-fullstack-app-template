import React from 'react'
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from '../components/Loading';
import UserProfile from '../components/profile/user-profile';

type Props = {}

const Profilepassword = (props: Props) => {
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
        <UserProfile/>
    </div>
  )
}

export default Profilepassword