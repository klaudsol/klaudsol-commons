import DB, { fromAurora, AURORA_TYPE } from "../lib/DB";
import UnauthorizedError from "../errors/UnauthorizedError";
import AppNotEnabledError from "../errors/AppNotEnabledError";
import InsufficientPermissionsError from "../errors/InsufficientPermissionsError";
import { log } from "../lib/Logger";
import Aurora from "../lib/Aurora";
import Cognito from "../lib/Cognito";

class Session {
  static fields() {
    return {
      people_id: {
        auroraType: AURORA_TYPE.LONG,
        allowOnCreate: true,
        allowOnUpdate: true,
      },
      sme_tenant_id: {
        auroraType: AURORA_TYPE.LONG,
        allowOnCreate: true,
        allowOnUpdate: true,
      },
    };
  }

  static async getSession(session) {
    if (!session) throw new UnauthorizedError("Session not found.");
    const db = new DB();
    const sql = `SELECT people_id from sessions where session = :session AND session_expiry > NOW() LIMIT 1`;
    const data = await db.executeStatement(sql, [
      { name: "session", value: { stringValue: session } },
    ]);

    if (data.records.length === 0)
      throw new UnauthorizedError("Session not found.");

    return data.records.map(([{ longValue: people_id }]) => ({
      people_id,
    }))[0];
  }

  /**
   * assert({
   *  loggedIn: true,
   *  appsEnabled: ["trucking"],
   *  userHasPermission: ["manage"]
   * });
   *
   * The goal is to resolve permission handling in the least amount of Aurora Data API requests.
   *
   */

  static async assert(conditions, token, req) {
  
    if (!token) return;
    // return if no tokens are found, which means user is not logged in. 

    try {
      switch (process.env.USER_MANAGER) {
        case "COGNITO":
         return await Cognito.assert(token, req);

        case "AURORA":
          return await Aurora.assert(conditions, token);
 
        default:
          throw new Error();
      } 
    } catch (error) {
      throw error; //throw error after logging so that the application handles the error
    }
   
  }

  static async logout(tokens) {
    try {
      switch (process.env.USER_MANAGER) {
        case "COGNITO":
         return await Cognito.logout(tokens);

        case "AURORA":
          return await Aurora.logout(tokens);
 
        default:
          throw new Error();
      } 
    } catch (error) {
      throw error; //throw error after logging so that the application handles the error
    }
  }

  constructor(rawData) {
    Object.assign(this, rawData);
  }
}

export default Session;
