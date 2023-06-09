import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { log } from '../lib/Logger';
import { slsFetch } from "../lib/Client";
import Session from '../models/Session';
import { defaultErrorHandler } from '../lib/ErrorHandler';
import { assertUserIsLoggedIn } from '../lib/Permissions';

export const sessionOptions = {
  password: process.env.KS_SECRET_COOKIE_PASSWORD ?? process.env.SECRET_COOKIE_PASSWORD,
  cookieName: process.env.KS_SECRET_COOKIE_NAME ?? 'klaudsol-cms',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  },
}

export function withSession (handler) {
  try {
    
    return withIronSessionApiRoute(handler, sessionOptions) 
    
  } catch (ex) {
    log(ex);
  }
};

export async function serverSideLogout(req) {
  const session_token = req?.user?.sessionToken ?? await assertUserIsLoggedIn(req);
  await Session.logout(session_token); 
  req.session.destroy();
}

export function getSessionCache(callback) {
  return withIronSessionSsr(async (context) => {
    const { req, res } = context;
    
    try{
      if(!req.session?.cache) {
        return {
         redirect: {
          permanent: false,
          destination: '/',
          }
        }
      } 
      if(req.session?.cache?.forcePasswordChange){ 
        await serverSideLogout(req)
        // handle the logout logic on the server-side
        return {
          redirect: {
            permanent: false,
            destination: '/'
          }
        }
      }

      const { props } = callback ? await callback(context) : { props: {} };

      // Pass data to the page via props
      return { props: { cache: req.session?.cache, ...props } }
    }
    catch(error){
      await defaultErrorHandler(error, req, res);
    }
 
    },
    sessionOptions
  );  
}
