export const SERVER_CONFIG = {
  nodeEnv: process.env.NODE_ENV || "local",
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_skills",
  cookieName: process.env.COOKIE_NAME || "mern_skills_session",
  sessionTtlMinutes: Number(process.env.SESSION_TTL_MINUTES || 30),
  absoluteSessionHours: Number(process.env.ABSOLUTE_SESSION_HOURS || 8)
};
