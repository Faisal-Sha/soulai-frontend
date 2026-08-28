# SoulPlus AI V2 — planned ERD

**This is not a migration.** Do not run it. It is the target schema so we add one table (one feature) at a time.

Visual board (FigJam): [SoulPlus V2 planned ERD](https://www.figma.com/board/6LeVkl0m7qxS4KSj9djZGU)

**Now in the database:** `soul_profiles` (migrations `001` + `002`).

**Rule:** child tables use `owner_profile_id → soul_profiles.id`. Auth is only the login door.

## Add next, in this order

| Next migration | Feature to wire first | Tables |
|---|---|---|
| `003` | Paywall / home paid-trial-unpaid | `subscriptions`, `stripe_events` |
| `004` | Account · Notifications | `notification_preferences` |
| `005` | People add / list / report | `people`, `people_reports` |
| `006` | Readings + home daily note | `readings`, `reading_chapters`, `daily_notes` |
| `007` | Saved insights | `saved_insights` |
| `008` | Chat history + top-up credits | `chat_threads`, `chat_messages`, `chat_wallets`, `chat_credit_ledger` |

When a row is added, seed 1:1 side tables (`notification_preferences`, `chat_wallets`) in that same feature migration — not before those tables exist.

## Target diagram

```mermaid
erDiagram
    direction LR

    authUsers ||--o| soulProfiles : "links when signup"
    soulProfiles ||--o| subscriptions : "has billing"
    soulProfiles ||--o| notificationPreferences : "has prefs"
    soulProfiles ||--o| chatWallets : "has credits"
    soulProfiles ||--o{ chatCreditLedger : "records"
    soulProfiles ||--o{ chatThreads : "owns"
    chatThreads ||--o{ chatMessages : "contains"
    soulProfiles ||--o{ people : "adds"
    people ||--o| peopleReports : "generates"
    soulProfiles ||--o| readings : "has portrait"
    readings ||--|{ readingChapters : "contains"
    soulProfiles ||--o{ dailyNotes : "receives"
    soulProfiles ||--o{ savedInsights : "bookmarks"

    authUsers {
        uuid id PK
        string email UK
    }

    soulProfiles {
        uuid id PK
        uuid authUserId UK "FK auth.users, nullable"
        string email UK
        string fullName
        date birthDate
        time birthTime
        string birthPlace
        json quizAnswers
        json knowAnswers
        datetime quizCompletedAt
    }

    subscriptions {
        uuid id PK
        uuid ownerProfileId PK, FK "1:1"
        string status
        string planType
        string stripeSubscriptionId UK
        datetime currentPeriodEnd
    }

    notificationPreferences {
        uuid ownerProfileId PK, FK
        string frequency
        bool morningNote
        time morningTime
    }

    people {
        uuid id PK
        uuid ownerProfileId FK
        string fullName
        date birthDate
        string status
    }

    peopleReports {
        uuid id PK
        uuid personId FK, UK
        uuid ownerProfileId FK
        string status
        json content
        uuid shareToken UK
    }

    readings {
        uuid id PK
        uuid ownerProfileId FK, UK
        string status
    }

    readingChapters {
        uuid id PK
        uuid readingId FK
        string chapterId
        json content
        datetime openedAt
    }

    dailyNotes {
        uuid id PK
        uuid ownerProfileId FK
        date noteDate
        string headline
    }

    savedInsights {
        uuid id PK
        uuid ownerProfileId FK
        string quote
        string source
        string sourceKind
    }

    chatThreads {
        uuid id PK
        uuid ownerProfileId FK
        string externalThreadId UK
        string title
    }

    chatMessages {
        uuid id PK
        uuid threadId FK
        uuid ownerProfileId FK
        string role
        string content
    }

    chatWallets {
        uuid ownerProfileId PK, FK
        int includedRemaining
        int purchasedBalance
    }

    chatCreditLedger {
        uuid id PK
        uuid ownerProfileId FK
        int delta
        string reason
    }
```

`stripe_events` is webhook idempotency only (no FK to profiles). Leave it off the diagram.

## Not in V2

V1 `quiz_leads`, `profiles`, `admins`, `saved_matrices`, `diary_entries`, analytics. Stay in `src/legacy/supabase/`.
