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


/* Deprecated.
 * Use assert instead.
 *
 **/
export function assertUserIsLoggedIn(req) {
  let session_token;
  let access_token;
  if (process.env.USER_MANAGER === "AURORA" && 
     (session_token = req.session?.tokens?.session_token)) {

    return session_token; 

  } else if(process.env.USER_MANAGER === "COGNITO" && 
   (access_token = req.session?.tokens?.access_token)){
    
    return access_token;
  }
  else {
    throw new UnauthorizedError();                  
  };    
}

export function assertAppIsEnabled(req, appName) {
  //TODO  
}

export function assertUserHasPermission(req, permissionName) {
  //TODO  
}

/**
 * assert({
 *  loggedIn: true,
 *  appsEnabled: ["trucking"],
 *  userHasPermission: ["manage"]
 * });
 * 
 */
 
export function getToken(req) {

  if(process.env.USER_MANAGER === "AURORA"){
       return req.session?.tokens?.session_token;
  }
  else if(process.env.USER_MANAGER === "COGNITO"){
       return req.session?.tokens?.access_token;
    
  }  
};

/* 
 * This is just a syntactic sugar of Session.assert
 */

export async function assert(conditions, req) {
  
    const token = getToken(req);
    await Session.assert(conditions, token, req);
    
};

export async function assertUserCan(capabilities, req){
    let currentCapabilities;
    const session_token = req.session?.tokens?.session_token;

    if(session_token){
        currentCapabilities =  await Capability.getCapabilitiesByLoggedInUser(session_token);
    } else{
        // If we can't find the user's ID, we can assume they are a guest.
        currentCapabilities =  await Capability.getCapabilitiesByGuest();
    }

    if (!currentCapabilities.includes(capabilities)) {
      throw new InsufficientPermissionsError();
    }
}
