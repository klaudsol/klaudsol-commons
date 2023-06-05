import DB from "../lib/DB";
import InsufficientPermissionsError from "../errors/InsufficientPermissionsError";

export default class Capability {
  static async getCapabilitiesByLoggedInUser(session_token, params1, params2, params3) {
    const db = new DB();

    const sql = `SELECT DISTINCT capabilities.name from people_groups 
    LEFT JOIN groups ON groups.id = people_groups.group_id
    LEFT JOIN group_capabilities ON group_capabilities.group_id = groups.id
    LEFT JOIN capabilities ON capabilities.id = group_capabilities.capabilities_id
    WHERE people_groups.people_id IN (select people_id from sessions where session = :session_token)
    AND CASE WHEN :params1 = "NULL" THEN  params1 IS NULL ELSE params1 = :params1 END
    AND CASE WHEN :params2 = "NULL" THEN  params2 IS NULL ELSE params2 = :params2 END
    AND CASE WHEN :params3 = "NULL" THEN  params3 IS NULL ELSE params3 = :params3 END`
    
    const rawCapabilites = await db.executeStatement(sql, [
      { name: "session_token", value: { stringValue: session_token } },
      { name: "params1", value: { stringValue: params1 ?? "NULL" } },
      { name: "params2", value: { stringValue: params2 ?? "NULL" } },
      { name: "params3", value: { stringValue: params3 ?? "NULL" } },
    ]);   

    const userCapabilities = rawCapabilites.records.map(
      ([{ stringValue: capability }]) => capability
    );

    return userCapabilities;
  }

  static async getCapabilitiesByGuest(params1, params2, params3) {
    const db = new DB();

    const sql = `SELECT DISTINCT capabilities.name FROM groups 
    LEFT JOIN group_capabilities ON group_capabilities.group_id = groups.id
    LEFT JOIN capabilities ON capabilities.id = group_capabilities.capabilities_id WHERE groups.name = "Guests"
    AND CASE WHEN :params1 = "NULL" THEN  params1 IS NULL ELSE params1 = :params1 END
    AND CASE WHEN :params2 = "NULL" THEN  params2 IS NULL ELSE params2 = :params2 END
    AND CASE WHEN :params3 = "NULL" THEN  params3 IS NULL ELSE params3 = :params3 END`
    
    const rawCapabilites = await db.executeStatement(sql, [
      { name: "params1", value: { stringValue: params1 ?? "NULL" } },
      { name: "params2", value: { stringValue: params2 ?? "NULL" } },
      { name: "params3", value: { stringValue: params3 ?? "NULL" } },
    ]);   

    const userCapabilities = rawCapabilites.records.map(
      ([{ stringValue: capability }]) => capability
    );

    return userCapabilities;
  }
}
