import express from "express";
import client from "prom-client";
import compression from "compression";


const app = express();
const port = 3000;

app.use(compression());

// Registro de métricas
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duración de solicitudes HTTP",
  labelNames: ["route", "method", "status_code"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2]
});
register.registerMetric(httpRequestDuration);

app.get("/api/login", async (req, res) => {
  const end = httpRequestDuration.startTimer();
  await new Promise(r => setTimeout(r, Math.random() * 500));
  end();
  res.status(200).send("Inicio de sesión exitoso");
});

app.get("/health", (req, res) => res.status(200).send("OK"));
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => console.log(`Microservicio de Usuarios corriendo en puerto ${port}`));
