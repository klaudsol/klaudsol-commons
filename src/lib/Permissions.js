/**
 * MIT License

Copyright (c) 2022 KlaudSol Philippines, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

**/


import UnauthorizedError from '../errors/UnauthorizedError';
import InsufficientPermissionsError from '../errors/InsufficientPermissionsError';
import Capability from '../models/Capability';
import Session from '../models/Session';
import { verifyToken } from '../lib/JWT';

const BEARER_LENGTH = 7;

/* DEPRECATED 
 * Use assertUserCan instead.
 **/
export function assertUserIsLoggedIn(req) {
  let session_token;
  if (session_token = req.session?.session_token) {
    return session_token; 
  } else {
    throw new UnauthorizedError();                  
  };    
}

/* DEPRECATED 
 * Use assertUserCan instead.
 **/
export function assertAppIsEnabled(req, appName) {
}

/* DEPRECATED 
 * Use assertUserCan instead.
 **/
export function assertUserHasPermission(req, permissionName) {
}

/* DEPRECATED 
 * Use assertUserCan instead.
 * assert({
 *  loggedIn: true,
 *  appsEnabled: ["trucking"],
 *  userHasPermission: ["manage"]
 * });
 * 
 */
 
export function getSessionToken(req) {
  return req.session?.session_token;   
};

/* DEPRECATED 
 * Use assertUserCan instead.
 * This is just a syntactic sugar of Session.assert
 */

export async function assert(conditions, req) {
  
    const sessionToken = getSessionToken(req);
    await Session.assert(conditions, sessionToken);
  
};

export async function assertUserCan(capabilities, req, ...params){
    let currentCapabilities;
    let bearerSession;


    if (req.headers && req.headers.authorization) {
      const { authorization } = req.headers;
      const bearerToken = authorization.substring(BEARER_LENGTH); //Remove "Bearer" text 
      const decodedToken = verifyToken(bearerToken);
      bearerSession = decodedToken.session;
    }

    //bearerSession - extracted directly from headers
    //req?.user - derived from middleware (seee Middleware#tokenVerifier). Note that we do not always use the Middleware module.
    //req?.session - if using IronSession (defaut implementation of KlaudSol CMS)

    const session_token = bearerSession ?? req?.user?.sessionToken ?? req?.session?.session_token;

    if(session_token){
        currentCapabilities =  await Capability.getCapabilitiesByLoggedInUser(session_token, params);
        //console.log('currentCapabiities');
        //console.log(currentCapabilities);
    } else{
        // If we can't find the user's ID, we can assume they are a guest.
        currentCapabilities =  await Capability.getCapabilitiesByGuest(params);
    }

    if (!currentCapabilities.includes(capabilities)) {
      throw new InsufficientPermissionsError();
    }
}
