# Upgrade Notes — Phase 3 → Phase 4

1. Keep your existing MongoDB URI:
   `mongodb://127.0.0.1:27017/mern_skills`
2. Run the new server `npm install`.
3. Run `npm run seed:superadmin` once.
4. Start the API and client.
5. Existing USER accounts remain valid.
6. The new profile avatar field is added automatically by MongoDB/Mongoose.
7. The new Dashboard and AppSettings collections are created on first use.
