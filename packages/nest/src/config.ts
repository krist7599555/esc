export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo: {
    collection: process.env.MONGO_COLLECTION,
  },
  sso: {
    id: process.env.SSO_ID,
    secret: process.env.SSO_SECRET,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
