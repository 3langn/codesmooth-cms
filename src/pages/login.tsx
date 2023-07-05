import type { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import { PATH_DASHBOARD } from '@/routes/path';
import { Login } from '@/screens';

export default Login;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: PATH_DASHBOARD.home,
      },
    };
  }
  return {
    props: {
      session: null,
    },
  };
}
