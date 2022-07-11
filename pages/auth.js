import { useRouter } from 'next/router';
import { getSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Loading from '../components/Loading'
import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <Loading/>;
  }

  return <AuthForm />;
}

export default AuthPage;