# Admin Challenge Flow - Complete Implementation Plan

## Context

The admin challenge feature has a partially built create form (4-step stepper with UI) but is missing:

- **API integration** - No server functions or tanstack hooks exist (submit handler has `TODO: Implement API call`)
- **Challenge listing page** - Currently just a single link to create page
- **Challenge detail page** - No `[id]` route exists
- **Detail tabs** - Overview, Requirements, Participants tabs
- **Participant detail modal** - View individual participant submissions
- **Edit flow** - No edit page exists
- **Form data mismatch** - Form types don't match API (e.g., `projectTitle` vs `nameEn`, string types vs numeric IDs)

## Key Decisions

- **Match API schema exactly** - Remove form fields not in API (judges, skills, successCriteria, challengeType), add missing ones (nameAr, juniorsCapacity)
- **Adjust stepper steps** - Reorganize to better map to API data structure
- **Use lookup endpoints** - Existing `useLookup` hook + `getLookup` server function for Level, Category

## API Schema Summary

- **Enums**: AccessCostType (1=Free|2=Points|3=Subscription), ChallengeParticipantStatus (1|2|3), RankingType (1-6), IconType (1-12)
- **AddChallengeRequest**: `{ challengeDetails, guideSteps[], goals[], requirements[], evaluations[], prizeDistributions[] }`
- **AddChallengeModel**: `{ id?, nameEn, nameAr, description, levelId, categoryId, juniorsCapacity, startDate, endDate, registerationDeadline, icon (IconType), accessCostType }`
- **GetChallengeDetailsModel**: `{ challengeDetails (ListModel), guideSteps[], goals[], requirements[], evaluations[], prizeDistributions[] }`
- **GetAllChallengeParticipantModel**: `{ id, careerNameAr/En, juniorName, evaluation, status, registerationDate, submissionDate, actionDate }`
- **GetChallengeParticipantDetailsModel**: same + `projectLink, additionalNotes`
- **EvaluateChallengeRequest**: `{ id: number, evaluation: number }`

## Existing Reusable Code

- **Lookup hook**: `app/tanstack/useLookup.ts` - `useLookup("/api/Lookup/Level")`, `useLookup("/api/Lookup/Category")`
- **Lookup server**: `app/server/getLookUps.ts` - returns `{ value: number, label: string }[]`
- **Lookup type**: `app/types/LookUp.ts` - `Lookup { value: number, label: string }`
- **customFetch**: `app/server/lib/customFetch.ts`
- **Components**: Button, Input, Select, Textarea, MainCard, Modal, Breadcrumb, Tabs, Skeleton, Jumbotron, ProjectCard, DetailCard, EnhancedTable, InfoSection, FormStepper
- **PATH_ICON config**: `app/configs/constants` - maps icon keys to image paths

---

## Implementation Steps

### Step 1: Server Functions

Create `app/(pages)/(loged-in)/admin/server/challenges/`:

| File                              | Method | Endpoint                                    |
| --------------------------------- | ------ | ------------------------------------------- |
| `createAdminChallenge.ts`         | POST   | `/api/admin-challenge`                      |
| `updateAdminChallenge.ts`         | PUT    | `/api/admin-challenge`                      |
| `getAdminChallenges.ts`           | GET    | `/api/admin-challenge` (paginated + search) |
| `getAdminChallengeById.ts`        | GET    | `/api/admin-challenge/{id}`                 |
| `deleteAdminChallenge.ts`         | DELETE | `/api/admin-challenge/{id}`                 |
| `getChallengeParticipants.ts`     | GET    | `/api/admin-challenge/participants`         |
| `getChallengeParticipantById.ts`  | GET    | `/api/admin-challenge/participants/{id}`    |
| `evaluateChallengeParticipant.ts` | PUT    | `/api/admin-challenge/evaluate`             |
| `index.ts`                        | -      | Re-exports all                              |

Pattern: `app/(pages)/(loged-in)/admin/server/collaborations/createAdminCollaboration.ts`

### Step 2: Query Keys

Add to `app/configs/queryKeys.ts` under `admin`:

```ts
challenges: {
  all: (params: PaginationParams) => ["admin", "challenges", params] as const,
  byId: (id: number) => ["admin", "challenges", id] as const,
  list: ["admin", "challenges"] as const,
  participants: (params: PaginationParams) => ["admin", "challenges", "participants", params] as const,
  participantById: (id: number) => ["admin", "challenges", "participant", id] as const,
},
```

### Step 3: Tanstack Hooks

Create `app/(pages)/(loged-in)/admin/tanstack/challenges/useChallenges.ts` + `index.ts`:

- `useGetAdminChallenges(params)` - useQuery for list
- `useGetAdminChallengeById(id)` - useQuery for detail
- `useCreateAdminChallenge()` - useMutation, invalidate list
- `useUpdateAdminChallenge()` - useMutation, invalidate list
- `useDeleteAdminChallenge()` - useMutation, invalidate list
- `useGetChallengeParticipants(params)` - useQuery
- `useGetChallengeParticipantById(id)` - useQuery
- `useEvaluateChallengeParticipant()` - useMutation, invalidate participants

Export from `app/(pages)/(loged-in)/admin/tanstack/index.ts`

### Step 4: Rework Form Types & Schema

Update `app/(pages)/(loged-in)/admin/challenges/_components/types.ts`:

- Align `ChallengeFormData` to API fields:
  - `nameEn`, `nameAr`, `description`
  - `levelId: number`, `categoryId: number` (populated from lookups)
  - `juniorsCapacity: number`
  - `startDate`, `endDate`, `registerationDeadline` (Date | null)
  - `icon: number` (IconType 1-12)
  - `accessCostType: number` (1=Free, 2=Points, 3=Subscription)
  - Remove: `projectTitle`, `challengeType`, `difficultyLevel`, `category` (strings), `skills[]`, `judges[]`, `successCriteria[]`, `isPremium`, `pointsCost`, `isSubscriptionOnly`, `kpPoints`, `gems`
  - Keep: `instructions` → maps to `guideSteps`, `requirements`, `evaluationCriteria` → `evaluations`, `prizes` → `prizeDistributions`
  - Prize type: `{ rank: RankingType, titleEn, titleAr, xp, points }` (remove money/gems/label, add titleEn/titleAr/points)

Update `challenge.schema.ts` to match new types with step-specific schemas.

### Step 5: Rework Stepper Steps

New 4-step flow (keeping 4 steps, reorganized to match API):

1. **Overview** - nameEn, nameAr, description, levelId (from Level lookup), categoryId (from Category lookup), juniorsCapacity, dates, icon selector, accessCostType (Free/Points/Subscription toggle)
2. **Project Details** - guideSteps (instructions) + goals (what we're building)
3. **Requirements** - requirements list + evaluations (criteria name + percentage)
4. **Prizes** - prizeDistributions (rank, titleEn, titleAr, xp, points)

Update components:

- `StepBasicInfo.tsx` - Use `useLookup("/api/Lookup/Level")` and `useLookup("/api/Lookup/Category")` for dynamic Select options. Replace string fields with numeric IDs. Add nameAr, juniorsCapacity. Replace premium toggle with accessCostType selector.
- `StepProjectDetails.tsx` - Add goals section alongside instructions (guideSteps)
- `StepRequirements.tsx` - Remove successCriteria, keep requirements + evaluations. Rename evaluationCriteria fields to match API (titleEn, percentage)
- `StepPrizes.tsx` - Update prize fields to match API: titleEn, titleAr, xp, points, rank

### Step 6: Wire up useCreateEditChallenge Hook

Update `app/(pages)/(loged-in)/admin/challenges/_hooks/useCreateEditChallenge.ts`:

- Accept optional `initialData` + `challengeId` for edit mode
- Import `useCreateAdminChallenge` / `useUpdateAdminChallenge` mutations
- Map `ChallengeFormData` → `AddChallengeRequest` shape on submit
- Navigate to detail page on success using `useRouter`
- Remove simulated API call

### Step 7: Challenge Listing Page

Rewrite `app/(pages)/(loged-in)/admin/challenges/page.tsx` following `collaborations/page.tsx`:

- Breadcrumb: Home > Challenges
- Jumbotron header
- Tabs: All Challenges, Active, Completed (with counts from API)
- Search input + "+ New Challenge" button
- Grid of ProjectCard components → link to `/admin/challenges/[id]`
- Loading skeletons, empty state, error state
- Uses `useGetAdminChallenges` hook

### Step 8: Challenge Detail Page

Create `app/(pages)/(loged-in)/admin/challenges/[id]/page.tsx` following `collaborations/[id]/page.tsx`:

- Breadcrumb: Home > Challenges > [Challenge Name]
- `DetailCard` header: icon, title, description, prize summary badges, due date, participant count
- Edit button → `/admin/challenges/[id]/edit`
- 3 tabs: Overview, Requirements, Participants
- Uses `useGetAdminChallengeById`

### Step 9: Detail Tab Components

Create in `challenges/_components/`:

**OverviewTab.tsx**:

- "What We're Building" section using `InfoSection` (numbered) with goals
- "Prizes Distribution" section: prize cards with medal images, amounts, badge titles

**RequirementsTab.tsx**:

- "Requirements" using `InfoSection` (checked) with requirements
- "Important Guidelines" using `InfoSection` (bullet) with evaluations descriptions

**ParticipantsTab.tsx**:

- Header with "Total Participants" count badge + search input
- `EnhancedTable` with columns: PARTICIPANT (name + career), LEVEL, REGISTERED, STATUS (colored badge), SUBMITTED, ACTION (View)
- Status mapping: 1=Registered (gray), 2=In Progress (orange), 3=Submitted (green)
- Click "View" opens `ParticipantDetailModal`
- Uses `useGetChallengeParticipants`

### Step 10: Participant Detail Modal

Create `challenges/_components/ParticipantDetailModal.tsx`:

- Uses shared `Modal` component from `@components`
- Two top tabs: challenge name | "Junior Profile"
- Participant info: avatar, name, path, level badge
- Info cards row: Registration date, Status badge, Submitted date
- "Submitted Work" section: Project Submission card with View/Download/Delete links (using `projectLink`)
- Uses `useGetChallengeParticipantById`

### Step 11: Edit Flow

Create `app/(pages)/(loged-in)/admin/challenges/[id]/edit/page.tsx`:

- Fetch challenge via `useGetAdminChallengeById(id)`
- Map API response → `ChallengeFormData` (reverse of submit mapping)
- Pass `initialData` + `challengeId` to `CreateEditChallenge`
- `CreateEditChallenge.tsx` updated to accept optional props for edit mode

### Step 12: Update CreateEditChallenge for Edit Mode

Modify `CreateEditChallenge.tsx`:

- Accept optional `initialData` and `challengeId` props
- Pass to `useCreateEditChallenge` hook
- Change header text: "Create Challenge" vs "Edit Challenge"
- Submit button: "Create" vs "Update"

### Step 13: Exports & Wiring

- Update `challenges/_components/index.ts` - export new tab components + modal
- Update `admin/tanstack/index.ts` - export challenges hooks
- Update create page if needed for layout consistency

---

## Files to Modify

| File                                                                          | Change                                    |
| ----------------------------------------------------------------------------- | ----------------------------------------- |
| `app/configs/queryKeys.ts`                                                    | Add `challenges` keys under `admin`       |
| `app/(pages)/(loged-in)/admin/challenges/page.tsx`                            | Rewrite listing page                      |
| `app/(pages)/(loged-in)/admin/challenges/_components/types.ts`                | Align to API schema                       |
| `app/(pages)/(loged-in)/admin/challenges/_schema/challenge.schema.ts`         | Rework validation                         |
| `app/(pages)/(loged-in)/admin/challenges/_hooks/useCreateEditChallenge.ts`    | API integration + edit mode               |
| `app/(pages)/(loged-in)/admin/challenges/_components/CreateEditChallenge.tsx` | Edit mode support                         |
| `app/(pages)/(loged-in)/admin/challenges/_components/StepBasicInfo.tsx`       | Use lookups, match API fields             |
| `app/(pages)/(loged-in)/admin/challenges/_components/StepProjectDetails.tsx`  | Add goals section                         |
| `app/(pages)/(loged-in)/admin/challenges/_components/StepRequirements.tsx`    | Remove successCriteria, align eval fields |
| `app/(pages)/(loged-in)/admin/challenges/_components/StepPrizes.tsx`          | Match API prize fields                    |
| `app/(pages)/(loged-in)/admin/challenges/_components/index.ts`                | New exports                               |
| `app/(pages)/(loged-in)/admin/tanstack/index.ts`                              | Export challenges                         |

## Files to Create

| File                                                      | Purpose                |
| --------------------------------------------------------- | ---------------------- |
| `admin/server/challenges/createAdminChallenge.ts`         | POST create            |
| `admin/server/challenges/updateAdminChallenge.ts`         | PUT update             |
| `admin/server/challenges/getAdminChallenges.ts`           | GET list               |
| `admin/server/challenges/getAdminChallengeById.ts`        | GET by id              |
| `admin/server/challenges/deleteAdminChallenge.ts`         | DELETE                 |
| `admin/server/challenges/getChallengeParticipants.ts`     | GET participants       |
| `admin/server/challenges/getChallengeParticipantById.ts`  | GET participant detail |
| `admin/server/challenges/evaluateChallengeParticipant.ts` | PUT evaluate           |
| `admin/server/challenges/index.ts`                        | Re-exports             |
| `admin/tanstack/challenges/useChallenges.ts`              | React Query hooks      |
| `admin/tanstack/challenges/index.ts`                      | Re-exports             |
| `admin/challenges/[id]/page.tsx`                          | Detail page            |
| `admin/challenges/[id]/edit/page.tsx`                     | Edit page              |
| `admin/challenges/_components/OverviewTab.tsx`            | Overview tab           |
| `admin/challenges/_components/RequirementsTab.tsx`        | Requirements tab       |
| `admin/challenges/_components/ParticipantsTab.tsx`        | Participants tab       |
| `admin/challenges/_components/ParticipantDetailModal.tsx` | Participant modal      |

## Colors

Use Tailwind theme colors from globals.css (not hardcoded hex):

- `dark-blue-main`, `blue-main`, `purple-main` for primary actions
- `text-gray-*`, `border-gray-*` for neutral elements

## Verification

1. `/admin/challenges` → listing with search, tabs, challenge cards
2. Click "+ New Challenge" → 4-step form with lookup-populated selects → submits to API
3. Click challenge card → detail page with Overview/Requirements/Participants tabs
4. Participants tab → table → "View" opens modal with participant details
5. Edit button → pre-filled form → updates via PUT
6. `npx tsc --noEmit` → no TypeScript errors
