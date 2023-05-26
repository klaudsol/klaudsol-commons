import DB from "../lib/DB";
import InsufficientPermissionsError from "../errors/InsufficientPermissionsError";

export default class Capability {
  static async getCapabilitiesByLoggedInUser(session_token, params1, params2, params3) {
    const db = new DB();

    let sql = `SELECT DISTINCT capabilities.name from people_groups 
    LEFT JOIN groups ON groups.id = people_groups.group_id
    LEFT JOIN group_capabilities ON group_capabilities.group_id = groups.id
    LEFT JOIN capabilities ON capabilities.id = group_capabilities.capabilities_id
    WHERE people_groups.people_id IN (select people_id from sessions where session = :session_token)
    AND params1 = :params1 AND params2 = :params2 AND params3 = :params3`;

    const rawCapabilites = await db.executeStatement(sql, [
      { name: "session_token", value: { stringValue: session_token } },
      { name: "params1", value: (params1 ? { stringValue: params1 } : { isNull: true }) },
      { name: "params2", value: (params2 ? { stringValue: params2 } : { isNull: true }) },
      { name: "params3", value: (params3 ? { stringValue: params3 } : { isNull: true }) },
    ]);

    const userCapabilities = rawCapabilites.records.map(
      ([{ stringValue: capability }]) => capability
    );

    return userCapabilities;
  }

  static async getCapabilitiesByGuest(params) {
    const db = new DB();

    let sql = `SELECT DISTINCT capabilities.name FROM groups 
    LEFT JOIN group_capabilities ON group_capabilities.group_id = groups.id
    LEFT JOIN capabilities ON capabilities.id = group_capabilities.capabilities_id WHERE groups.name = "Guests"`;

    if (params.length > 0) {
        for (let i = 0; i < params.length; i++) {
            if(params[i]) {
                sql += ` AND params${i + 1} = ${params[i]}`;
            } else {
                sql += ` AND params${i + 1} IS NULL`;
            }
        }
    }

    const rawCapabilites = await db.executeStatement(sql, []);

    const userCapabilities = rawCapabilites.records.map(
      ([{ stringValue: capability }]) => capability
    );

    return userCapabilities;
  }
}
