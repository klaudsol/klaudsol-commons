import AWS from "aws-sdk";
import { CognitoIdentityServiceProvider } from "aws-sdk";
import UnauthorizedError from "../errors/UnauthorizedError";
import RecordNotFound from "../errors/RecordNotFound";
import { parse } from "cookie";

AWS.config.update({
  accessKeyId: process.env.AURORA_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AURORA_AWS_SECRET_ACCESS_KEY,
  region: process.env.AURORA_AWS_REGION,
});
const ClientId = process.env.COGNITO_CLIENT_ID;

class Cognito {
  static async login({ email, password, res }) {
    try {

      let access_token;
      let refresh_token;
      // authenticate user and obtain session and access tokens
      const cognito = new CognitoIdentityServiceProvider();
      const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      };
      const authResult = await cognito.initiateAuth(params).promise();
  
      // handle new password challenge
      if (authResult?.ChallengeName === "NEW_PASSWORD_REQUIRED") {
        return {
          session_token: authResult.Session,
          // note: this session token is only used for responding challenges and can only acquire if a challenge exists.
          user: {
            firstName: authResult.userAttributes?.find(attr => attr.Name === "given_name")?.Value || "",
            lastName: authResult.userAttributes?.find(attr => attr.Name === "family_name")?.Value || "",
            roles: [], // decode accessToken using JWT library to get the user's groups belong
            capabilities: authResult.userAttributes?.find(attr => attr.Name === "custom:capabilities")?.Value.split(",") || [],
            forcePasswordChange: true,
          },
        };
      } else if (authResult?.ChallengeName) {
        throw UnauthorizedError("");
        // throw error if any challenge exists other except for "NEW_PASSWORD_REQUIRED"
        // as we dont want the operation to continue because it will only return incomplete data which only meant for responding challenges
      }
      access_token = authResult?.AuthenticationResult.AccessToken;
      refresh_token = authResult?.AuthenticationResult.RefreshToken;

      const tokenParams = {
        AccessToken: access_token,
      };
  
      const userDataResult = await cognito.getUser(tokenParams).promise();

      res.setHeader("Set-Cookie", [
        `refreshToken=${refresh_token}; Path=/; HttpOnly; SameSite=strict; Max-Age=86400`,
      ]);
   
      // store the refreshToken in the cookie
      // we might extract this somewhere in our code using parse from library "cookie" to refresh our accessToken
      
      return {
        access_token,
        user: {
          firstName: userDataResult.UserAttributes.find(attr => attr.Name === "given_name")?.Value || userDataResult.Username,
          lastName: userDataResult.UserAttributes.find(attr => attr.Name === "family_name")?.Value || "",
          roles: [], 
          capabilities: userDataResult.UserAttributes.find(attr => attr.Name === "custom:capabilities")?.Value.split(",") || [],
          forcePasswordChange: false, // user has successfully logged in, so forcePasswordChange is false
        },
      };
    } catch (error) {
      if (error.code === "NotAuthorizedException") {
        throw new UnauthorizedError(error.message);
      } else if (error.code === "InvalidPasswordException") {
        throw new RecordNotFound(error.message);
      } else {
        throw error;
      }
    }
  }
  
  static async updatePassword({ email, session, oldPassword, newPassword, forcePasswordChange }) {
    try {
      
      if (!oldPassword || !newPassword)
        throw new UnauthorizedError("Passwords are required.");

      const cognito = new CognitoIdentityServiceProvider();

      const params = {
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        ClientId,
        ChallengeResponses: {
          USERNAME: email,
          NEW_PASSWORD: newPassword,
          PASSWORD: oldPassword,
        },
        Session: session,
      };

      const result = await cognito.respondToAuthChallenge(params).promise();

      if (result?.ChallengeName) {
        throw new UnauthorizedError();
      }

      // If successful, the result will contain accessToken and refreshToken
      // that can be used for subsequent authenticated requests.

      // return false, which means forceChangePassword is set to false.
      return false;
    } catch (error) {
      if (error.code === "NotAuthorizedException") {
        throw new UnauthorizedError(error.message);
      } else if (error.code === "InvalidPasswordException") {
        throw new RecordNotFound(error.message);
      } else {
        throw error;
      }
    }
  }

  static async assert( accessToken , req) {
    try {

      if(req.session.cache.forcePasswordChange) return;
        
     // If a new logged in user in cognito has challenge "NEW_PASSWORD_REQUIRED"
     // the user will only receive sessionToken exclusively for responding challenges.
     // at this state, our accessToken is empty so we cannot pass the assert.
      
      var cognito = new CognitoIdentityServiceProvider();
      const params = {
        AccessToken: accessToken
      };
      
      const userData = await cognito.getUser(params).promise(); 
      return true;
      // the token is yet to expire.
    } catch (error) {
       throw error;
      // uncomment to automate token refreshment when using assert()
      // or handle the renewal of token somewhere.

      // if (error.code === "NotAuthorizedException" && error.message === "Invalid Access Token") {

      //   const cookies = parse(req.headers.cookie || "");
      //   const refreshToken = cookies.refreshToken;

      //   const params = {
      //     AuthFlow: "REFRESH_TOKEN_AUTH",
      //     ClientId,
      //     AuthParameters: {
      //       REFRESH_TOKEN: refreshToken,
      //     },
      //   };
        
      //   let access_token;
      //   const authResult = await cognito.initiateAuth(params).promise();
      //   access_token = authResult.AuthenticationResult.AccessToken;

      //   req.session.tokens.access_token = access_token;
        
      // } else {
      //   throw error;
      //   // if the refreshToken is invalid, force logout the user.
      //   // handle the logic later
      // }
    }
  };
  

  static async logout( access_token ) {
    try {
      const cognito = new CognitoIdentityServiceProvider();
      const params = {
        AccessToken: access_token,
      };
      await cognito.globalSignOut(params).promise();
    } catch (error) {
      throw error;
      // throw expiredTokenError here
    }
  }
  
  static async getCapabilitiesByLoggedInUser( access_token ){
   try {

      const cognito = new CognitoIdentityServiceProvider();
      const params = {
        AccessToken: access_token
      };
      
    const userDataResult =  await cognito.getUser(params).promise();
  
    const capabilities = userDataResult.UserAttributes.find(attr => attr.Name === "custom:capabilities")?.Value.split(",") || [];

    return capabilities;
  }
  catch(error){
    if (error.code === "NotAuthorizedException") {
      throw new UnauthorizedError(error.message);    
    } else {
      throw error;
    }
  }
}
}

export default Cognito;
