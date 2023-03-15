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
          user: { firstName: "", lastName: "", forcePasswordChange: true },
        };
      } else if (authResult?.ChallengeName) {
        throw UnauthorizedError("");
      }
      access_token = authResult?.AuthenticationResult.AccessToken;
      refresh_token = authResult?.AuthenticationResult.RefreshToken;

      // get user data using access token
      const tokenParams = {
        AccessToken: access_token,
      };
  
      const userDataResult = await cognito.getUser(tokenParams).promise();

      res.setHeader("Set-Cookie", [
        `refreshToken=${refresh_token}; Path=/; HttpOnly; SameSite=strict; Max-Age=86400`,
      ]);
      
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
  
  static async updatePassword({ email, session, oldPassword, newPassword }) {
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

      if (Object.values(result.ChallengeName)) {
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
      var cognito = new CognitoIdentityServiceProvider();
      const params = {
        AccessToken: accessToken
      };
      
      await cognito.getUser(params).promise();
      return true;
      // the token is yet to expire.
    } catch (error) {
      if (error.code === "NotAuthorizedException" && error.message === "Invalid Access Token") {

        const cookies = parse(req.headers.cookie || "");
        const refreshToken = cookies.refreshToken;

        const params = {
          AuthFlow: "REFRESH_TOKEN_AUTH",
          ClientId,
          AuthParameters: {
            REFRESH_TOKEN: refreshToken,
          },
        };
        
        let access_token;
        const authResult = await cognito.initiateAuth(params).promise();
        access_token = authResult.AuthenticationResult.AccessToken;

        // automated token refreshment

        req.session.tokens.access_token = access_token;
      
        
        // note: this is temporary for aws cognito testing
        // as we might handle the renewal of accessToken here
        // (automated: detects if accessToken is valid and let the user pass, else set a new accessToken in the cache if refresh token is still valid)


        // or through separated api that only returns a new token
        // 
        
      } else {
        throw error;
        // if the refreshToken is invalid, force logout the user.
        // handle the logic later
      }
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
