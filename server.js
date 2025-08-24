import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Import tools
import registerListEmployees from "./tools/listEmployees.js";
import registerGetEmployeeDetails from "./tools/getEmployeeDetails.js";
import registerApproveLeave from "./tools/approveLeave.js";

// --- MCP server setup ---
const server = new McpServer({
  name: "mcp-employee-leave-cline-ab",
  version: "1.0.0"
});

// Register tools
registerListEmployees(server);
registerGetEmployeeDetails(server);
registerApproveLeave(server);

// --- Connect over stdio (for local clients like Cline) ---
const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Employee Leave MCP server (stdio) and Cline agent ready!");
