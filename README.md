Setup Instructions
1.Clone the Repository
```
git clone https://github.com/Saloni1707/Context.git
cd Context
```
2.Install Dependencies
``npm install``

3.Add Environment Variables

Create a .env.local file in root:

```GOOGLE_API_KEY=your_google_gemini_api_key_here```

4.Run the Server
```npm run dev```


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
