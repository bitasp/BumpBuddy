# 04_User_Flows.md

# BumpBuddy — User Flows

**Version:** 1.0 (MVP)

---

# Purpose

This document defines how users move through BumpBuddy.

The goal is to keep every interaction simple, warm, and effortless.

For the MVP, we are optimizing for:

- Minimal taps
- Fast requests
- Clear actions
- Emotional connection

---

# Primary Users

## 🤰 Mom

### Goal

Quickly ask for support without needing to type or explain.

---

## ❤️ Supporter

### Goal

Know exactly what Mom needs and respond immediately.

---

# MVP App Structure

```
Splash

↓

Role Selection

↓

───────────────

🤰 Mom

OR

❤️ Supporter

───────────────
```

---

# Mom Journey

## Flow

```
Open App

↓

Splash

↓

Choose "I'm Mom"

↓

Home

↓

Select Situation

↓

Story Card

↓

Notify Support

↓

Request Sent

↓

Return Home
```

---

## Home Screen

Purpose:

Allow Mom to express how she feels with one tap.

Options:

- 💧 I'm Thirsty
- 🍎 I'm Hungry
- 😴 I Need Rest
- 🤢 I'm Feeling Nauseous
- ❤️ I Need a Hug
- 🚶 I Want a Walk
- 😊 I'm Okay

---

## Situation Selected

Example:

```
💧 I'm Thirsty
```

↓

Story Card appears.

---

## Story Card

Contents

- Mom illustration
- Dumpling Baby
- Friendly message

Example

> "Mom is feeling thirsty...
>
> Can we have some water?"

Primary CTA

```
Notify Support ❤️
```

---

## Request Sent

Contents

- Baby smiling
- Confirmation message

Example

> "Message sent!
>
> Your supporter has been notified."

CTA

```
Done
```

↓

Returns to Home.

---

# Supporter Journey

## Flow

```
Open App

↓

Splash

↓

Choose "I'm a Supporter"

↓

Requests

↓

Open Request

↓

Accept

↓

Complete Task

↓

Confirmation

↓

Requests
```

---

# Requests Screen

Shows active requests.

Example

```
💧 Mom needs water

2 mins ago
```

or

```
😴 Mom needs some rest
```

---

# Request Details

Displays:

Illustration

Message

Suggested action

Example

```
Mom is feeling thirsty.

Could you bring her a glass of water?
```

Primary CTA

```
I'm On It ❤️
```

---

# Completion Screen

After helping Mom

```
Done ✅
```

↓

Baby celebrates.

Message

> "Thank you for taking care of Mom!"

Returns to Requests.

---

# Request Lifecycle

```
Mom selects situation

↓

Story Card

↓

Notify Support

↓

Supporter receives request

↓

Supporter accepts

↓

Supporter completes

↓

Mom receives confirmation

↓

Flow complete
```

---

# Screen Inventory

## Shared

- Splash
- Role Selection

---

## Mom

- Home
- Story Card
- Request Sent

---

## Supporter

- Requests
- Request Details
- Completion

---

# Navigation Rules

## Mom

Always returns to Home after a request.

No nested navigation.

---

## Supporter

Always returns to Requests after completing a task.

---

# MVP Principles

- One primary action per screen
- Minimal text
- Large tap targets
- Friendly illustrations
- No typing
- No forms
- No unnecessary settings
- Complete a request in under 30 seconds

---

# Future (Post MVP)

These are intentionally excluded from Version 1.

- User accounts
- Notifications
- Firebase sync
- Chat
- Voice messages
- Daily check-ins
- Progress tracking
- History
- Multiple supporters
- Pregnancy timeline
- Smart reminders
- Animations beyond simple transitions

---

# Success Criteria

For Mom

- Express a need in less than 10 seconds.

For Supporter

- Understand the request immediately.
- Complete the action with one confirmation tap.

For Both

- Feel emotionally connected through the Dumpling Baby and simple, caring interactions.

---

# MVP Definition

A successful MVP allows:

- Mom to request support in one tap.
- Supporter to receive and acknowledge the request.
- Both users to complete the interaction quickly and positively.

If this flow feels effortless and delightful, BumpBuddy has achieved its Version 1 goal.