# SAWIHA Manual Testing Guide

This guide explains how to test the system from the beginning, including where to go in the app, what action to take, what should happen, and how each action should affect the rest of the system.

Use this as a manual QA checklist before release, after major changes, or when you want to confirm that all modules are connected correctly.

## 1. Start The System

### Where

Project folder:

```bash
c:\Users\user\Desktop\Projects AZM\juniorpro_azure
```

### How

1. Open a terminal in the project folder.
2. Install dependencies if needed:

   ```bash
   pnpm install
   ```

3. Check `.env.local` and make sure the backend API URL is correct.
4. Start the frontend:

   ```bash
   pnpm dev
   ```

5. Open the browser at the local URL shown in the terminal, usually:

   ```text
   http://localhost:3000
   ```

### Expected

- The app opens without a blank screen.
- No fatal errors appear in the browser console.
- API requests go to the correct backend.
- Public pages can be opened without login.

## 2. Prepare Test Accounts

Create or prepare these accounts for testing:

| Role                  | Test Email Example                | Main Area                |
| --------------------- | --------------------------------- | ------------------------ |
| Admin                 | admin.test@example.com            | `/admin/dashboard`       |
| Junior                | aoe24.business@gmail.com          | `/junior/dashboard`      |
| Contributor / Enabler | mrahmed2466@gmail.com             | `/contributor/dashboard` |
| Project Manager       | ahmed.osama.engineering@gmail.com | `/project-manager/paths` |

If the backend already has seeded accounts, use those first. If not, create accounts from the sign-up page where possible.

## 3. Authentication Testing

## 3.1 Create A Junior Account

### Where

Open:

```text
http://localhost:3000/auth/sign-up
```

### How

1. Select the Junior role if the form asks for a role.
2. Fill the required fields:
   - Name
   - Email
   - Password
   - Confirm password
   - Any required profile fields
3. Click the sign-up/register button.
4. If OTP/email verification appears, enter the OTP.
5. If there is a resend OTP button, test it once.
6. After verification, go to:

   ```text
   http://localhost:3000/auth/login
   ```

7. Login with the new junior email and password.

### Expected

- Account is created successfully.
- Invalid fields show validation messages.
- Duplicate email is rejected.
- OTP verification succeeds.
- After login, the user is redirected to:

  ```text
  /junior/dashboard
  ```

- Junior sidebar and junior dashboard appear.

### System Impact

- A new junior user should exist in the backend.
- Junior-specific APIs should return data for this user.
- The junior should not be able to access admin or contributor pages.

## 3.2 Login

### Where

```text
http://localhost:3000/auth/login
```

### How

1. Enter valid email and password.
2. Click login.
3. Repeat with wrong password.
4. Repeat with an email that does not exist.

### Expected

- Valid login redirects based on role:
  - Admin: `/admin/dashboard`
  - Junior: `/junior/dashboard`
  - Contributor: `/contributor/dashboard`
  - Project Manager: `/project-manager/paths`
- Wrong credentials show an error.
- The app stores the auth session correctly.

## 3.3 Logout

### Where

Inside any logged-in dashboard.

### How

1. Click the user/profile area or logout button in the sidebar/header.
2. Confirm logout if a confirmation appears.
3. Try opening the previous dashboard URL again.

### Expected

- User is logged out.
- Auth cookies/session are cleared.
- Opening a protected route redirects to:

  ```text
  /auth/login
  ```

## 3.4 Forgot And Reset Password

### Where

Start from:

```text
http://localhost:3000/auth/login
```

Then use the forgot password link. The app also has reset password routes under:

```text
/auth/reset-password
/auth/verify-reset-password
```

### How

1. Click Forgot Password.
2. Enter a valid email.
3. Submit.
4. Enter OTP or reset token if required.
5. Set a new password.
6. Login with the new password.
7. Try the old password.

### Expected

- Reset request is accepted for valid email.
- New password works.
- Old password no longer works.
- Invalid OTP/token is rejected.

## 4. Public Website Testing

Test these pages before login.

| Page                         | URL                   |
| ---------------------------- | --------------------- |
| Home                         | `/home` or `/`        |
| Public Paths                 | `/paths`              |
| Public Path Details          | `/paths/[id]`         |
| Pricing                      | `/pricing`            |
| Public Challenges            | `/challenges`         |
| Public Challenge Details     | `/challenges/[id]`    |
| Public Collaborations        | `/collaboration`      |
| Public Collaboration Details | `/collaboration/[id]` |

### How

1. Open each page.
2. Click cards, details buttons, and main navigation links.
3. Try actions such as join, subscribe, or start.
4. Resize browser to mobile width.

### Expected

- Pages load without login.
- Details pages open correctly.
- Protected actions ask the user to login.
- Images load.
- Mobile layout does not overlap.
- Empty states appear if there is no data.

## 5. Role Permission Testing

### Where

Use these URLs after logging in with each role:

```text
/admin/dashboard
/junior/dashboard
/contributor/dashboard
/project-manager/paths
```

### How

1. Login as Junior.
2. Try opening `/admin/dashboard`.
3. Try opening `/contributor/dashboard`.
4. Logout.
5. Repeat the same checks for Admin, Contributor, and Project Manager.

### Expected

- Junior can access only junior pages.
- Contributor can access only contributor pages.
- Project Manager can access project manager pages.
- Admin can access admin pages.
- Wrong role is redirected away.
- Logged-out user is redirected to `/auth/login`.

## 6. Admin Module Testing

Admin is the source of most system data. Test admin first because junior and contributor flows depend on admin-created data.

Login as Admin and start from:

```text
http://localhost:3000/admin/dashboard
```

## 6.1 Admin Dashboard

### Where

```text
/admin/dashboard
```

### How

1. Open the dashboard.
2. Check cards, charts, totals, and recent activity.
3. Refresh the page.

### Expected

- Dashboard loads successfully.
- Numbers match backend data.
- No junior-only or contributor-only controls appear.

## 6.2 Learning Paths

### Where

```text
/admin/paths
/admin/paths/new-path
/admin/paths/[id]
```

### How

1. Go to `/admin/paths`.
2. Click create/new path.
3. Fill path data:
   - Title
   - Description
   - Level
   - Duration
   - Status
   - Any required fields
4. Save the path.
5. Open the created path details.
6. Edit the path.
7. Add missions if the page provides mission controls.
8. Complete or publish the path if available.
9. Open the public path page:

   ```text
   /paths
   ```

### Expected

- Created path appears in admin list.
- Edited values are saved.
- Published/completed path appears for juniors/public users.
- Draft path should not appear publicly if the system supports draft behavior.

### System Impact

- Junior path list should show the path when it is available.
- Junior should be able to join the path.
- Dashboard current path data should update after junior joins.

## 6.3 Missions

### Where

Missions are managed from the admin path area, mainly:

```text
/admin/paths
/admin/paths/[id]
```

### How

1. Open a path.
2. Create a mission.
3. Fill all mission steps:
   - Info
   - Guide
   - Criteria
   - Resources
   - Solution
4. Submit with empty required fields to test validation.
5. Save a valid mission.
6. Edit the mission.
7. Delete the mission if delete is available.

### Expected

- Required fields are validated.
- Valid mission appears under the correct path.
- Junior can see the mission inside the path.
- Edited mission data appears for juniors.

## 6.4 Challenges

### Where

```text
/admin/challenges
/admin/challenges/create
/admin/challenges/[id]
/admin/challenges/[id]/edit
```

### How

1. Go to `/admin/challenges`.
2. Create a new challenge.
3. Fill:
   - Basic info
   - Project details
   - Prizes
   - Requirements
4. Save/publish the challenge.
5. Open `/challenges` as public or junior.
6. Login as Junior and join the challenge.
7. Submit the challenge as Junior.
8. Return as Admin.
9. Open challenge participants.
10. Evaluate the participant submission.

### Expected

- Challenge appears in admin list.
- Published challenge appears publicly/junior side.
- Junior can join once.
- Junior submission appears for admin review.
- Evaluation changes the junior participant status.

### System Impact

- Junior challenge page should update after join/submission.
- Junior dashboard challenge widget should reflect the active challenge.
- Achievements/XP may update if connected by backend rules.

## 6.5 Collaborations

### Where

```text
/admin/collaborations
/admin/collaborations/create
/admin/collaborations/[id]
/admin/collaborations/[id]/edit
```

### How

1. Go to `/admin/collaborations`.
2. Create a collaboration.
3. Fill:
   - Project overview
   - Requirements
   - Roles/team
   - Tasks for roles
4. Save it as draft.
5. Change it to ready/published if the button exists.
6. Login as Junior.
7. Open:

   ```text
   /junior/collaborations
   ```

8. Open the collaboration details.
9. Request or join a role.
10. Return as Admin.
11. Open applicants/participants.
12. Accept or reject the junior.
13. Login again as Junior.
14. Check task board.
15. Submit a task.
16. Return as Admin and accept/reject the task.

### Expected

- Draft collaboration stays internal.
- Ready collaboration appears to juniors/public users.
- Junior role request appears in admin applicants.
- Accepted junior can see role tasks.
- Task status changes correctly:
  - Not Started
  - In Progress
  - Under Review
  - Rejected
  - Completed

### System Impact

- Junior dashboard current collaboration should update.
- Admin collaboration participant list should update.
- Task board should reflect each status change.

## 6.6 Badges

### Where

```text
/admin/badges
/admin/badges/create
/admin/badges/[id]/edit
```

### How

1. Open `/admin/badges`.
2. Create a badge.
3. Fill badge data and image/icon if required.
4. Save.
5. Edit it.
6. Delete it if allowed.
7. Login as Junior.
8. Open:

   ```text
   /junior/achievements
   ```

### Expected

- Badge appears in admin list.
- Badge appears in junior achievements when earned or available.
- Edit/delete updates the related views.

## 6.7 Levels

### Where

```text
/admin/levels
```

### How

1. Open `/admin/levels`.
2. Create a level.
3. Fill required XP/level data.
4. Save.
5. Edit the level.
6. Delete it if allowed.
7. Check junior dashboard and achievements.

### Expected

- Level appears in admin list.
- Junior level/progress uses the updated level rules.
- Invalid XP ranges or required fields are rejected.

## 6.8 Subscription Plans And Features

### Where

```text
/admin/subscription
/pricing
/contributor/subscription
```

### How

1. Login as Admin.
2. Open `/admin/subscription`.
3. Create a plan/package.
4. Add features.
5. Set pricing.
6. Save.
7. Open `/pricing`.
8. Login as Contributor.
9. Open `/contributor/subscription`.
10. Subscribe or upgrade using the test payment flow.

### Expected

- Plan appears in admin subscription list.
- Plan appears on public pricing page.
- Contributor can select the plan.
- Payment success activates or updates subscription.
- Failed payment does not activate subscription.

## 6.9 Project Managers

### Where

```text
/admin/project-managers
/admin/project-managers/create
/admin/project-managers/[id]
/admin/project-managers/[id]/edit
```

### How

1. Open `/admin/project-managers`.
2. Create a project manager.
3. Fill required profile/account fields.
4. Save.
5. Open project manager details.
6. Check overview, juniors, and enablers tabs.
7. Edit the project manager.
8. Delete if allowed.

### Expected

- Project manager appears in list.
- Details page loads correctly.
- Tabs show correct related data.
- Edited data is reflected everywhere.

## 7. Junior Module Testing

Login as Junior and start from:

```text
http://localhost:3000/junior/dashboard
```

## 7.1 Junior Dashboard

### Where

```text
/junior/dashboard
```

### How

1. Open the dashboard.
2. Check:
   - Welcome banner
   - Stats cards
   - Daily goals
   - Current path
   - Current challenge
   - Current collaboration
   - XP/level/streaks
3. Refresh the page.

### Expected

- Dashboard loads.
- Empty widgets show useful empty states.
- Data changes after joining paths, challenges, or collaborations.

## 7.2 Junior Paths

### Where

```text
/junior/paths
/junior/paths/[id]
/junior/paths/[id]/current
/junior/paths/[id]/current/[pathDetailsId]
```

### How

1. Open `/junior/paths`.
2. Search/filter if available.
3. Open a path.
4. Click join/start.
5. Open current path.
6. Open a mission.
7. Read guide/resources/criteria.
8. Submit work.
9. Try submitting empty or invalid work.
10. Return to dashboard.

### Expected

- Junior can see available paths.
- Joining a path creates a current path.
- Current mission is available.
- Invalid submission is blocked.
- Valid submission is saved.
- Dashboard progress updates.

## 7.3 Junior Challenges

### Where

```text
/junior/challenges
/junior/challenges/[id]
```

### How

1. Open `/junior/challenges`.
2. Open a challenge.
3. Join the challenge.
4. Submit required work.
5. Try duplicate join.
6. Try invalid submission.
7. Check participants tab if available.

### Expected

- Join succeeds once.
- Duplicate join is blocked or shows already joined state.
- Submission changes status to under review.
- Admin can see the submission.

## 7.4 Junior Collaborations

### Where

```text
/junior/collaborations
/junior/collaborations/[id]
```

### How

1. Open `/junior/collaborations`.
2. Open a collaboration.
3. Review overview and requirements.
4. Request a role.
5. Confirm request status is pending.
6. Ask Admin to accept the request.
7. Refresh as Junior.
8. Open task board.
9. Start a task.
10. Submit task.
11. Ask Admin to accept or reject.

### Expected

- Role request is created.
- Pending/accepted/rejected states are visible.
- Accepted junior can work on tasks.
- Submitted task appears under review.
- Accepted task becomes completed.
- Rejected task returns with rejected status.

## 7.5 Junior Achievements

### Where

```text
/junior/achievements
```

### How

1. Open achievements page.
2. Check:
   - Badge collection
   - Level collection
   - Milestones
   - Streaks
   - Recent achievements
3. Complete a mission/challenge/task if possible.
4. Refresh achievements.

### Expected

- Achievements page loads.
- Empty state appears for new junior.
- Progress changes after completed activity if backend rules support it.

## 8. Contributor Module Testing

Login as Contributor and start from:

```text
http://localhost:3000/contributor/dashboard
```

## 8.1 Contributor Dashboard

### Where

```text
/contributor/dashboard
```

### How

1. Open dashboard.
2. Check:
   - Your juniors
   - Upcoming sessions
   - Tracking cards
3. Refresh the page.

### Expected

- Contributor sees only assigned juniors.
- Dashboard data loads without API errors.
- Empty states appear if no juniors exist.

## 8.2 Contributor Juniors

### Where

```text
/contributor/juniors
```

### How

1. Open `/contributor/juniors`.
2. Add a junior if the button exists.
3. Invite a junior if invite flow exists.
4. Search/filter juniors if available.
5. Open junior card/details if available.

### Expected

- Added/invited junior appears in contributor list.
- Contributor does not see unrelated juniors.
- Invalid email or duplicate invite is rejected.

## 8.3 Contributor Subscription

### Where

```text
/contributor/subscription
```

### How

1. Open subscription page.
2. View current subscription.
3. Choose a package.
4. Subscribe or upgrade.
5. Complete test payment.
6. Test failed/cancelled payment if possible.

### Expected

- Current subscription is visible.
- Successful payment activates the selected plan.
- Failed payment keeps old subscription unchanged.
- Admin-created packages are visible here.

## 9. Project Manager Module Testing

Login as Project Manager and start from:

```text
http://localhost:3000/project-manager/paths
```

### Where

```text
/project-manager/paths
/project-manager/challenges
/project-manager/collaborations
```

### How

1. Open each project manager page.
2. Confirm data loads.
3. Try available management actions.
4. Try opening admin-only URLs.

### Expected

- Project Manager can access allowed project manager pages.
- Project Manager cannot access unrelated restricted pages unless the backend intentionally allows it.
- Lists, filters, and details load correctly.

## 10. Cross-Module End-To-End Tests

These tests confirm that modules affect each other correctly.

## 10.1 Admin Path To Junior Progress

### Steps

1. Admin creates a learning path.
2. Admin adds missions.
3. Admin publishes/completes the path.
4. Junior opens `/junior/paths`.
5. Junior joins the path.
6. Junior submits a mission.
7. Junior opens `/junior/dashboard`.

### Expected

- Path appears for Junior.
- Joined path becomes current path.
- Mission submission is saved.
- Dashboard progress updates.

## 10.2 Admin Challenge To Junior Submission

### Steps

1. Admin creates a challenge.
2. Junior joins it.
3. Junior submits work.
4. Admin opens challenge participants.
5. Admin evaluates the submission.
6. Junior reopens challenge page.

### Expected

- Junior status moves from joined to under review to completed/evaluated.
- Admin and Junior see the same final status.

## 10.3 Admin Collaboration To Junior Task Completion

### Steps

1. Admin creates collaboration with roles and tasks.
2. Admin makes collaboration ready.
3. Junior requests a role.
4. Admin accepts Junior.
5. Junior opens task board.
6. Junior submits task.
7. Admin accepts or rejects task.
8. Junior checks task status.

### Expected

- Role request moves from pending to accepted/rejected.
- Accepted Junior sees tasks.
- Task status updates correctly across admin and junior views.

## 10.4 Admin Plan To Contributor Subscription

### Steps

1. Admin creates subscription package.
2. Public user opens `/pricing`.
3. Contributor opens `/contributor/subscription`.
4. Contributor subscribes or upgrades.

### Expected

- New plan appears in pricing and contributor subscription.
- Contributor subscription changes after successful payment.

## 11. Validation Tests For Every Form

Use this checklist on every create/edit form:

- Submit empty form.
- Submit form with only one required field missing.
- Submit invalid email.
- Submit invalid URL.
- Submit invalid date.
- Submit invalid number.
- Submit very long text.
- Double-click submit.
- Cancel form/modal.
- Refresh page after saving.

### Expected

- Required validation appears.
- Invalid values are blocked.
- Duplicate records are not created by double-click.
- Success message appears after save.
- Error message appears after failed API call.
- Saved data remains after refresh.

## 12. UI And Browser Testing

Test the app in:

- Desktop width
- Tablet width
- Mobile width

Check:

- Sidebar open/close
- Header/user menu
- Breadcrumbs
- Tabs
- Modals
- Date picker
- Select dropdown
- Search
- Filters
- Pagination
- Toast messages
- Loading states
- Empty states
- Error states

### Expected

- No overlapping text.
- No broken layout.
- Buttons show loading/disabled state during submit.
- Modals close correctly.
- Browser back/forward works, especially for URL-based modals and tabs.

## 13. Technical Checks

Run these before final approval:

```bash
pnpm build
pnpm format:check
pnpm lint
```

### Expected

- Build passes.
- Formatting passes.
- Lint has no blocking issues.
- No TypeScript errors.

Note: this project does not currently define a `test` script in `package.json`, so manual testing is the main available QA path unless automated tests are added later.

## 14. Final Release Checklist

Mark each item as pass or fail.

| Area                           | Pass/Fail | Notes |
| ------------------------------ | --------- | ----- |
| App starts successfully        |           |       |
| Public pages work              |           |       |
| Sign up works                  |           |       |
| Login works                    |           |       |
| Logout works                   |           |       |
| Reset password works           |           |       |
| Role permissions work          |           |       |
| Admin paths work               |           |       |
| Admin missions work            |           |       |
| Admin challenges work          |           |       |
| Admin collaborations work      |           |       |
| Admin badges work              |           |       |
| Admin levels work              |           |       |
| Admin subscription works       |           |       |
| Admin project managers work    |           |       |
| Junior dashboard works         |           |       |
| Junior paths work              |           |       |
| Junior challenges work         |           |       |
| Junior collaborations work     |           |       |
| Junior achievements work       |           |       |
| Contributor dashboard works    |           |       |
| Contributor juniors work       |           |       |
| Contributor subscription works |           |       |
| Project manager pages work     |           |       |
| Cross-module updates work      |           |       |
| Mobile responsive layout works |           |       |
| Build passes                   |           |       |
| Format check passes            |           |       |
| Lint passes                    |           |       |
