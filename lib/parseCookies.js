import Cookie from 'cookie';

export function parseCookies(req) {
  return Cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}
