import fs from "fs";
import { z } from "zod";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function registerApproveLeave(server) {
  server.registerTool(
    "approve_leave",
    {
      title: "Approve leave",
      description: "Approve a pending leave and update balance.",
      inputSchema: {
        employeeId: z.string().min(1),
        leaveId: z.string().min(1)
      }
    },
    async ({ employeeId, leaveId }) => {
      const file = path.join(__dirname, "../data/mock-data.json");
      const data = JSON.parse(fs.readFileSync(file, "utf-8"));

      const emp = data.employees.find((e) => e.id === employeeId);
      if (!emp) {
        return { content: [{ type: "text", text: `Employee ${employeeId} not found` }] };
      }

      const leave = data.leaves.find((l) => l.id === leaveId && l.employeeId === employeeId);
      if (!leave) {
        return { content: [{ type: "text", text: `Leave ${leaveId} for ${employeeId} not found` }] };
      }

      if (leave.status === "approved") {
        return { content: [{ type: "text", text: `Leave ${leaveId} already approved` }] };
      }

      if (emp.leaveBalance < leave.days) {
        return { content: [{ type: "text", text: `Insufficient leave balance` }] };
      }

      // Update data
      leave.status = "approved";
      emp.leaveBalance -= leave.days;

      fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");

      return {
        content: [
          { type: "text", text: JSON.stringify({ message: "approved", leave, employee: emp }, null, 2) }
        ]
      };
    }
  );
}
