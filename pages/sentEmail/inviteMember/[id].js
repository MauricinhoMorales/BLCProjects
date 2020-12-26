import Axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { config } from '../../../config';
import { parseCookies } from '../../../lib/parseCookies';

export default function InviteMember({
  teamId,
  isError,
  initialUser,
  setUser,
}) {
  const Router = useRouter();
  useEffect(() => {
    const userCookie = document.cookie;
    let user;
    if (!userCookie.user) {
      user = null;
    } else {
      user = JSON.parse(userCookie.user);
    }
    if (initialUser || user) {
      if (!isError) {
        Router.replace(
          `/${initialUser.user.id || user.user.id}/my-teams/${teamId}`
        );
      }
    } else {
      Router.replace(`/login?teamId=${teamId}`);
    }
  });

  return null;
}

export async function getServerSideProps(context) {
  const userCookie = parseCookies(context.req);
  let user;
  if (!userCookie.user) {
    user = null;
  } else {
    user = JSON.parse(userCookie.user);
  }
  try {
    await Axios.post(
      `${config.url}/api/teams/${context.query.teamId}/addMember`,
      {
        member_id: context.query.id,
        role: 'Desarrollador',
        permissions: 'view',
      }
    );
    return {
      props: {
        initialUser: user,
        isError: false,
        teamId: context.query.teamId,
      },
    };
  } catch (err) {
    return {
      props: {
        initialUser: user || null,
        isError: true,
        teamId: context.query.teamId,
      },
    };
  }
}
