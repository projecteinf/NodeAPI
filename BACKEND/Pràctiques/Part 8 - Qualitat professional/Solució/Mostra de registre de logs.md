S'ha utilitzat una eina de beautify per tal de millorar la lectura del log
## combined.log

```json
{
  "code": "ESOCKET",
  "level": "error",
  "message": "Failed to connect to localhost:1433 - Could not connect (sequence)",
  "name": "ConnectionError",
  "originalError": {
    "code": "ESOCKET"
  },
  "stack": "ConnectionError: Failed to connect to localhost:1433 - Could not connect (sequence)\n    at /home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/mssql/lib/tedious/connection-pool.js:86:17\n    at Connection.err (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1812:9)\n    at Object.onceWrapper (node:events:634:26)\n    at Connection.emit (node:events:519:28)\n    at Connection.emit (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1974:18)\n    at <anonymous> (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1834:14)\n    at process.processTicksAndRejections (node:internal/process/task_queues:84:11)",
  "timestamp": "2026-06-25 09:45:15"
}
{
  "level": "info",
  "message": "GET /tracks/3C0DAE72-1984-4CC7-83D5-B511A6614661 500 66 - 17.444 ms",
  "timestamp": "2026-06-25 09:45:15"
}
{
  "level": "warn",
  "message": "Operation [404] - NOT_FOUND: Track does not exist",
  "timestamp": "2026-06-25 09:51:46"
}
{
  "level": "info",
  "message": "GET /tracks/3C0DAE72-1984-4CC7-83D5-B511A6614661 404 53 - 7.850 ms",
  "timestamp": "2026-06-25 09:51:46"
}
```
## error.log

```json
{
  "code": "ESOCKET",
  "level": "error",
  "message": "Failed to connect to localhost:1433 - Could not connect (sequence)",
  "name": "ConnectionError",
  "originalError": {
    "code": "ESOCKET"
  },
  "stack": "ConnectionError: Failed to connect to localhost:1433 - Could not connect (sequence)\n    at /home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/mssql/lib/tedious/connection-pool.js:86:17\n    at Connection.err (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1812:9)\n    at Object.onceWrapper (node:events:634:26)\n    at Connection.emit (node:events:519:28)\n    at Connection.emit (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1974:18)\n    at <anonymous> (/home/isard/Projectes/NodeAPI/Applications/HelloWorld/mini-api/node_modules/tedious/src/connection.ts:1834:14)\n    at process.processTicksAndRejections (node:internal/process/task_queues:84:11)",
  "timestamp": "2026-06-25 09:45:15"
}
```

