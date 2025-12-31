import app from "./app.js";

console.log("Testing app import...");
console.log("App routes:", app._router?.stack?.filter(r => r.route).map(r => r.route.path));
console.log("App loaded successfully!");
