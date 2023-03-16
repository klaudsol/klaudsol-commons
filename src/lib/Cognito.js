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
const UserPoolId = process.env.USER_POOL_ID;

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
          // note: The session token is exclusively intended for responding to challenges and can only be obtained if a challenge exists.
          user: {
            username: authResult.ChallengeParameters.USER_ID_FOR_SRP,
            firstName: authResult.userAttributes?.find(attr => attr.Name === "given_name")?.Value || "",
            lastName: authResult.userAttributes?.find(attr => attr.Name === "family_name")?.Value || "",
            roles: [], // decode accessToken using JWT library to get the user's groups belong
            capabilities: authResult.userAttributes?.find(attr => attr.Name === "custom:capabilities")?.Value.split(",") || [],
            forcePasswordChange: true,
          },
        };
      } else if (authResult?.ChallengeName) {
        throw UnauthorizedError("");
        // We should throw an error if any challenge exists, except for 'NEW_PASSWORD_REQUIRED,'
        // as continuing with the operation would only result in incomplete data that is intended solely for responding to challenges.
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
   
      // We should store the refreshToken in a cookie and then use the 'parse' function from the 'cookie' 
      // library to extract it at a later stage in our code. This will allow us to refresh our accessToken.
      
      return {
        access_token,
        user: {
          username: userDataResult.Username,
          firstName: userDataResult.UserAttributes.find(attr => attr.Name === "given_name")?.Value || "",
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

  static async assert(req) {
    const cognito = new CognitoIdentityServiceProvider();
    try {
      if(req.session.cache.forcePasswordChange){
       const sessionToken = req.session.session_token;
       const username = req.session.cache.username;
       
      // If a newly logged-in user in Cognito has a challenge status of 'NEW_PASSWORD_REQUIRED', 
      // they will only receive a sessionToken that is exclusively intended for responding to challenges. 
      // At this stage, we only have the sessionToken we obtained in the challenge for assertion.
      // in this case, use authflow ADMIN_NO_SRP_AUTH to verify if the sessionToken is still valid.

      // assert using session_token

      const params = {
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        UserPoolId,
        ClientId,
        AuthParameters: {
          USERNAME: username,
          SESSION: sessionToken
        }
      };

      await cognito.adminInitiateAuth(params).promise();

      return true
      }
      else{

      // assert using access_token

      const accessToken = req.session.cache.access_token;
                
      const params = {
        AccessToken: accessToken
      };
      
      await cognito.getUser(params).promise();

      return true;
      }

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
  

  static async logout( token ) {
    try {
      // If a newly logged-in user in Cognito has a challenge status of 'NEW_PASSWORD_REQUIRED', 
      // they will only receive a sessionToken that is exclusively intended for responding to challenges. 
      // At this stage, we are using the sessionToken we obtained in the challenge to logout the user if the forcePasswordChange is true.
      // else accessToken.

      const cognito = new CognitoIdentityServiceProvider();
      const params = {
        AccessToken: token,
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
