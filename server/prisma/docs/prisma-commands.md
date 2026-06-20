c:\Users\user\Desktop\React+SystemDesign\React Interview Projects\features\login-flow\server\prisma\prisma_commands.md
# Prisma Commands Reference

This document describes all available Prisma commands with examples.

---

## `prisma generate`

**What it does**: Generates Prisma Client based on your schema.prisma file, creating type-safe database access.

**When to use**: After modifying your schema.prisma file to update the Prisma Client.

**Example**:
```bash
pnpm run prisma:generate
```

---

## `prisma migrate dev`

**What it does**: Creates a new migration file and applies it to your development database.

**When to use**: During development when you make schema changes and want to create migrations.

**Example**:
```bash
pnpm run prisma:migrate:dev
# With custom migration name:
pnpm run prisma:migrate:dev -- --name add_user_model
```

---

## `prisma migrate deploy`

**What it does**: Applies all pending migrations to the database.

**When to use**: In production or staging environments to apply schema changes safely.

**Example**:
```bash
pnpm run prisma:migrate:deploy
```

---

## `prisma migrate reset`

**What it does**: Resets the database by dropping and recreating it, then applies all migrations. **Warning: Deletes all data!**

**When to use**: During development when you want to reset your database to a clean state.

**Example**:
```bash
pnpm run prisma:migrate:reset
```

---

## `prisma db push`

**What it does**: Pushes schema changes directly to the database without creating migration files.

**When to use**: For rapid prototyping only (not recommended for production).

**Example**:
```bash
pnpm run prisma:db:push
# To accept data loss warnings:
pnpm run prisma:db:push -- --accept-data-loss
```

---

## `prisma db seed`

**What it does**: Runs the seed script to populate the database with initial data.

**When to use**: After resetting the database or when you need to populate it with test data.

**Example**:
```bash
pnpm run prisma:db:seed
```

---

## `prisma studio`

**What it does**: Opens Prisma Studio - a browser-based GUI for exploring and editing your database.

**When to use**: When you want to visually inspect or modify your database data.

**Example**:
```bash
pnpm run prisma:studio
```

---

## `prisma validate`

**What it does**: Validates your schema.prisma file for syntax errors and issues.

**When to use**: To check if your schema is valid before generating or migrating.

**Example**:
```bash
pnpm run prisma:validate
```

---

## `prisma format`

**What it does**: Formats your schema.prisma file with consistent code style.

**When to use**: To keep your schema file clean and readable.

**Example**:
```bash
pnpm run prisma:format
```