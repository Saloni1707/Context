File structure
```
Context/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts        # POST + GET endpoints
│
├── src/
│   └── lib/
│       └── withAlchemyst.ts   # Wrapper + memory layer
│
├── .env.local
├── package.json
└── README.md
```

Architecture overview

```
Client / Postman
     ↓
POST /api/chat  |  GET /api/chat
     ↓
withAlchemyst Wrapper (Memory Layer)
     ↓
AI SDK (generateText)
     ↓
Google Gemini Model

```
