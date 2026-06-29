
# NestJS Authentication Backend Roadmap

## Goal

Build a production-ready authentication backend using NestJS that supports:

- Sign Up
- Login
- Logout
- Forgot Password
- Reset Password
- JWT Authentication
- Refresh Tokens
- Protected APIs
- Email Verification
- Role-Based Authorization

Focus on understanding **how authentication systems work internally**, not just wiring libraries together.

---

# Suggested Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Passport
- passport-jwt
- bcrypt
- class-validator
- Nodemailer (or Mailtrap for development)

---

# Stage 1 - Project Architecture

## Folder Structure

```text
src/
├── auth/
├── users/
├── prisma/
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── filters/
│   ├── interceptors/
│   └── pipes/
├── mail/
├── config/
└── main.ts
```

## Learn

- Modules
- Controllers
- Services
- Providers
- Dependency Injection
- Configuration

Questions

- Why does NestJS use Dependency Injection?
- Why split logic into modules?

---

# Stage 2 - Database Design

Tables

## User

- id
- name
- email
- passwordHash
- emailVerified
- createdAt
- updatedAt

## RefreshToken

- id
- tokenHash
- expiresAt
- revoked
- userId

## PasswordResetToken

- id
- tokenHash
- expiresAt
- used
- userId

## EmailVerificationToken

- id
- tokenHash
- expiresAt
- userId

Learn

- Relations
- Foreign keys
- Indexes
- Unique constraints

---

# Stage 3 - Validation

Use DTOs

Examples

- SignupDto
- LoginDto
- ForgotPasswordDto
- ResetPasswordDto

Learn

- ValidationPipe
- class-validator
- class-transformer

Questions

- Why validate on the server?
- Why never trust the client?

---

# Stage 4 - Signup

Flow

Client

↓

POST /auth/signup

↓

Validate

↓

Check email uniqueness

↓

Hash password

↓

Save user

↓

Generate verification token

↓

Send email

Learn

- bcrypt hashing
- Salting
- Async operations

---

# Stage 5 - Login

Flow

Validate credentials

↓

Compare bcrypt hash

↓

Generate Access Token

↓

Generate Refresh Token

↓

Persist refresh token hash

↓

Return response

Learn

- bcrypt.compare()
- JWT payloads
- Secure token generation

---

# Stage 6 - JWT

Understand

- Header
- Payload
- Signature

Learn

- JWT module
- Signing
- Verification
- Expiration

Questions

- Why isn't JWT encrypted?
- Why verify signatures?

---

# Stage 7 - Authentication Guards

Build

- JwtAuthGuard

Protect

```
GET /profile
GET /users/me
```

Learn

- Passport strategies
- Guards
- Request lifecycle

---

# Stage 8 - Authorization

Implement Roles

```
ADMIN
USER
```

Create

- Roles decorator
- Roles Guard

Learn

- RBAC
- Authorization vs Authentication

---

# Stage 9 - Refresh Tokens

Flow

Access token expires

↓

Client sends refresh token

↓

Validate

↓

Issue new access token

↓

Rotate refresh token

Learn

- Token rotation
- Revocation
- Replay attack prevention

---

# Stage 10 - Logout

Implement

POST /auth/logout

Actions

- Revoke refresh token
- Delete session
- Return success

Question

Why can't JWT access tokens always be revoked immediately?

---

# Stage 11 - Forgot Password

Flow

User submits email

↓

Generate secure token

↓

Hash token

↓

Store hash

↓

Send email

Learn

- crypto.randomBytes()
- Secure token storage

---

# Stage 12 - Reset Password

Flow

Validate token

↓

Check expiration

↓

Update password hash

↓

Invalidate reset token

↓

Invalidate refresh tokens

---

# Stage 13 - Email Verification

Flow

Signup

↓

Verification email

↓

Token validation

↓

Activate account

Learn

- One-time tokens
- Expiration handling

---

# Stage 14 - Exception Handling

Create custom exceptions

- InvalidCredentials
- EmailAlreadyExists
- InvalidToken
- Unauthorized
- Forbidden

Learn

- Exception filters
- HTTP exceptions

---

# Stage 15 - Security

Understand

- Password hashing
- Salt
- HTTPS
- CORS
- Helmet
- Rate limiting
- Brute-force protection
- SQL Injection
- XSS
- CSRF

Questions

- Why hash refresh tokens?
- Why use HTTPS?

---

# Stage 16 - Logging

Log

- Login success
- Login failure
- Password reset
- Logout
- Suspicious activity

Learn

- NestJS Logger
- Structured logging

---

# Stage 17 - Testing

Write tests

- Unit tests
- Integration tests
- Auth Guard tests
- Controller tests

Mock

- Prisma
- JWT
- Mail service

---

# Stage 18 - API Documentation

Generate

- Swagger

Document

- Request DTOs
- Response DTOs
- Error responses
- Authorization headers

---

# Stage 19 - Production Improvements

Add

- Email verification
- Resend verification
- Change password
- Device/session management
- Login history
- Account lock after repeated failures
- Refresh token rotation
- Audit logs

---

# Stage 20 - System Design Questions

Think about

- Why use refresh tokens?
- Why store hashed refresh tokens?
- Should users have multiple active sessions?
- How does logout work across devices?
- Stateless vs stateful authentication?
- Cookies vs Authorization headers?

---

# Learn These NestJS Concepts

- Modules
- Controllers
- Services
- Providers
- Dependency Injection
- Guards
- Pipes
- Interceptors
- Exception Filters
- Custom Decorators
- Passport Strategies
- ConfigModule

---

# Suggested Build Order

1. Project setup
2. Prisma schema
3. User module
4. Signup
5. Login
6. JWT strategy
7. Protected routes
8. Refresh tokens
9. Logout
10. Forgot password
11. Reset password
12. Email verification
13. Roles & authorization
14. Logging
15. Testing
16. Swagger
17. Production hardening

---

# Stretch Goals

- OAuth (Google/GitHub)
- Two-Factor Authentication (TOTP)
- WebAuthn / Passkeys
- Redis session blacklist
- Account recovery
- Session management UI
- Refresh token rotation with device tracking

---

# Final Goal

Build an authentication backend that resembles a real SaaS product. Understand every request from signup through token issuance, authorization, refresh, logout, and account recovery. Aim to explain every design decision in an interview, not just implement the endpoints.
