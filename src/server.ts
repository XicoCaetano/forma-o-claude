import { createApp } from "./app";
import { seedDb } from "./db";

const port = Number(process.env.PORT ?? 3000);

seedDb(25);

createApp().listen(port, () => {
  console.log(`tasks-api a correr em http://localhost:${port}`);
});
