import Axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { config } from '../../../config';
import { parseCookies } from '../../../lib/parseCookies';

export default function InviteMember({ teamId, isError, initialUser }) {
  const Router = useRouter();
  useEffect(() => {
    if (initialUser) {
      if (!isError) {
        Router.replace(`/${initialUser.user.id}/my-teams/${teamId}`);
      }
    }
  });

  return null;
}

export async function getServerSideProps(context) {
  debugger;
  const userCookie = parseCookies(context.req);
  const user = JSON.parse(userCookie.user);
  try {
    await Axios.post(
      `${config.url}/api/teams/${context.query.teamId}/members`,
      {
        member_id: context.query.id,
        role: 'Desarrollador',
        permissions: 'view',
      },
      {
        headers: {
          Authorization: user.jwtToken,
        },
      }
    );
    return {
      props: {
        initialUser: user,
        isError: false,
        teamId: context.query.id,
      },
    };
  } catch (err) {
    return {
      props: {
        initialUser: user || null,
        isError: true,
        teamId: context.query.id,
      },
    };
  }
}
