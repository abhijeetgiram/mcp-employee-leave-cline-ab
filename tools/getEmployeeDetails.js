import fs from "fs";
import { z } from "zod";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function registerGetEmployeeDetails(server) {
  server.registerTool(
    "get_employee_details",
    {
      title: "Get employee details by ID",
      description: "Return one employee and their leave requests.",
      inputSchema: { id: z.string().min(1).describe("Employee ID, e.g. E001") },
    },
    async ({ id }) => {
      const dataPath = path.join(__dirname, "../data/mock-data.json");
      const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

      const emp = data.employees.find((e) => e.id === id);
      if (!emp) {
        return { content: [{ type: "text", text: `Employee ${id} not found` }] };
      }

      const empLeaves = data.leaves.filter((l) => l.employeeId === id);
      return {
        content: [
          { type: "text", text: JSON.stringify({ ...emp, leaves: empLeaves }, null, 2) }
        ]
      };
    }
  );
}
