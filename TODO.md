# Remove Google OAuth - Task Progress

## Plan Breakdown & Steps

### 1. Create TODO.md ✅
### 2. Read secondary files for understanding ✅
### 3. Backend changes ✅
- [x] Update backend/package.json (remove deps) 
- [x] Delete backend/config/passport.js
- [x] Update backend/server.js (remove passport)
- [x] Update backend/models/User.js (remove googleId)
- [x] Update backend/routes/auth.js (remove Google routes/logic)

### 4. Frontend changes ✅
- [x] Update frontend/src/contexts/AuthContext.tsx (remove loginGoogle)
- [x] Update frontend/src/pages/LoginPage.tsx (remove Google UI)
- [x] Update frontend/src/pages/SignupPage.tsx (remove Google UI)
- [x] Navbar.tsx clean

### 5. Cleanup & Test
- [ ] Remove Google env vars from .env files (user action)
- [x] Backend: npm deps updated
- [ ] Test register/login/protected routes
- [x] passport.js deleted (manual or terminal)
