import DB from "../lib/DB";
import InsufficientPermissionsError from "../errors/InsufficientPermissionsError";
import Aurora from "../lib/Aurora";
import Cognito from "../lib/Cognito";


export default class Capability {
  static async getCapabilitiesByLoggedInUser(token) {
    try {
      switch (process.env.USER_MANAGER) {
        case "COGNITO":
         return await Cognito.getCapabilitiesByLoggedInUser(token);

        case "AURORA":
          return await Aurora.getCapabilitiesByLoggedInUser(token);
 
        default:
          throw new Error();
      } 
    } catch (error) {
      throw error; //throw error after logging so that the application handles the error
    }
  }

  static async getCapabilitiesByGuest() {
    const db = new DB();

    const sql = `SELECT DISTINCT capabilities.name FROM groups 
    LEFT JOIN group_capabilities ON group_capabilities.group_id = groups.id
    LEFT JOIN capabilities ON capabilities.id = group_capabilities.capabilities_id WHERE groups.name = "Guests"`;

    const rawCapabilites = await db.executeStatement(sql, []);

    const userCapabilities = rawCapabilites.records.map(
      ([{ stringValue: capability }]) => capability
    );

    return userCapabilities;
  }
}
