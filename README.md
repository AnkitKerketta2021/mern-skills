# MERN SKILLS

<img src="" alt="preview1" width="720"/>
<img src="" alt="preview2" width="720"/>
<img src="" alt="preview3" width="720"/>

## Included

### Auth / security
- HTTP-only cookie sessions
- MongoDB-backed sessions with hashed tokens
- 30-minute idle client timeout + 8-hour absolute client timeout
- Protected routes + role routes
- `USER`, `ADMIN`, `SUPER_ADMIN`
- Helmet, CORS, validation and rate limiting
- Super Admin seed script

### User workspace
- Fixed top navigation
- Responsive collapsible sidebar
- Active route states
- Dashboard, Projects, Settings, Assets, Todos, My Skills, Calendar
- Learnings, Top Concepts, Gallery, What's New
- Profile Settings placeholder
- Avatar upload stored in MongoDB as image data for this demo
- Global API loading indicator
- Route-level loader
- 404, 403 and UI error fallbacks
- Luxury glass cards, hover motion, responsive layout and reduced-motion support

### Super Admin
Only `SUPER_ADMIN` can access:
- Users
- Dashboards
- Admin Settings

Users:
- Search
- Role filter
- Active/inactive filter
- Role update
- Activate/deactivate

Dashboards:
- Create
- Read
- Update
- Delete
- Status / visibility

Admin Settings:
- Maintenance mode
- Registration toggle
- Global announcement
- Default theme
- Extensible settings navigation

## Run locally

### 1. MongoDB
Install MongoDB Community Server and keep MongoDB running.

Compass connection:
`mongodb://127.0.0.1:27017/mern_skills`

### 2. Server

```bash
cd server
npm install
npm run seed:superadmin
npm run dev
```

Default local Super Admin:
- Email: `superadmin@mernskills.local`
- Password: `ChangeMe@12345`

**Change this password immediately for anything beyond local demo use.**
You can override it through `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD`.

### 3. Client

```bash
cd client
npm install
npm run dev
```

Open:
`http://localhost:5173`

## Important production note

The demo avatar feature stores a small image data URL directly in MongoDB because the requirement is to prove the complete frontend → API → DB workflow. For production, move image binaries to object storage or GridFS and store only the asset reference in MongoDB.

The in-memory rate limiter from Phase 3 is suitable for local development but should be replaced by a distributed store such as Redis for horizontally scaled production.

A production deployment with separate frontend/API sites also needs a deployment-specific CSRF/cookie strategy.

## Environment switching

Keep local and production MongoDB/API URLs in the appropriate `.env` files. Do not commit real credentials or secrets.
