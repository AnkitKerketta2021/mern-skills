# Phase 4

This phase turns the authenticated demo into a reusable application shell.

## Routing map

Public:
- `/`
- `/login`
- `/signup`

Protected:
- `/dashboard`
- `/projects`
- `/profile/settings`
- `/assets`
- `/todos`
- `/my-skills`
- `/calendar`
- `/learnings`
- `/top-concepts`
- `/gallery`
- `/whats-new`

Super Admin:
- `/admin/users`
- `/admin/dashboards`
- `/admin/settings`

Fallback:
- `/unauthorized`
- catch-all 404
- React ErrorBoundary

## API map

- `GET /api/v1/auth/me`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/logout-all`
- `PATCH /api/v1/profile/avatar`
- `GET /api/v1/admin/users`
- `PATCH /api/v1/admin/users/:id`
- `GET /api/v1/admin/dashboards`
- `POST /api/v1/admin/dashboards`
- `PATCH /api/v1/admin/dashboards/:id`
- `DELETE /api/v1/admin/dashboards/:id`
- `GET /api/v1/admin/settings`
- `PATCH /api/v1/admin/settings`

All admin endpoints are protected by authentication and `SUPER_ADMIN` RBAC middleware.
