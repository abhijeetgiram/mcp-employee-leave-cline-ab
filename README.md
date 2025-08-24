# Employee Leave MCP App With Cline Agent

## mcp-employee-leave-cline-ab (<domain>-employee-leave-<client>-ab)
A lightweight MCP server in Node.js, integrated with Cline, to manage employee leave requests and approvals.

## Getting Started

### Create a project

> mkdir mcp-employee-leave-cline-ab

> cd mcp-employee-leave-cline-ab

> npm init -y

> npm i @modelcontextprotocol/sdk zod

> node server.js

Employee Leave MCP server (stdio) ready.

### Create server.js

### Add npm scripts (optional)

```
{
  "type": "module",
  "scripts": {
    "start": "node server.js"
  }
}
```

### Wire it up in Cline (VS Code)

Cline looks for MCP servers in its cline_mcp_settings.json

```
{
  "mcpServers": {
    "mcp-employee-leave-cline-ab": {
      "disabled": false,
      "timeout": 60,
      "type": "stdio",
      "command": "node",
      "args": [
        "/Users/abhijeetgiram/Workspace/Personal/mcp-employee-leave-cline-ab/server.js"
      ]
    }
  }
}
```

### Use it from Cline

In a Cline chat, just ask things like:

- “Show me the employee list.” → Cline calls list_employees

- “Get details of E002.” → Cline calls get_employee_details with { id: "E002" }

- “Approve leave L1002 for E002.” → Cline calls approve_leave with { employeeId: "E002", leaveId: "L1002" }

## Model Context Protocol (MCP)

- It’s a new open standard by Anthropic that defines how AI models, tools, and apps can talk to each other.

- Think of it like a “plugin protocol” for AI assistants.

- MCP Server = Your code (like the employee leave manager we built).

- MCP Client = Something that talks to the server (Cline, Claude, or any AI agent).

- They communicate over:

    - stdio (local processes, great for Cline in VS Code)
    - or HTTP/WebSocket (remote deployment, so web apps / React can call it).

- MCP turns your Node.js script into a “tool plugin” for AI assistants.


# Mock data

{
  "employees": [
    { "id": "E001", "name": "Tony Stark", "dept": "Engineering", "leaveBalance": 14 },
    { "id": "E002", "name": "Bruce Wayne", "dept": "Sales", "leaveBalance": 10 },
    { "id": "E003", "name": "Chris Evans", "dept": "HR", "leaveBalance": 8 }
  ],
  "leaves": [
    { "id": "L1001", "employeeId": "E001", "from": "2025-08-26", "to": "2025-08-28", "days": 3, "status": "pending" },
    { "id": "L1002", "employeeId": "E002", "from": "2025-09-02", "to": "2025-09-03", "days": 2, "status": "pending" }
  ]
}


## Miscellaneous

https://app.cline.bot/dashboard

> pwd

`/Users/abhijeetgiram/Workspace/Personal/mcp-employee-leave-cline-ab`