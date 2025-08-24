import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function registerListEmployees(server) {
  server.registerTool(
    "list_employees",
    {
      title: "Get employee list",
      description: "Return all employees with remaining leave balance.",
      inputSchema: {}, // no inputs
    },
    async () => {
      const dataPath = path.join(__dirname, "../data/mock-data.json");
      const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
      return {
        content: [{ type: "text", text: JSON.stringify(data.employees, null, 2) }],
      };
    }
  );
}
