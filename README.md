# Realtime Chat App

A private, self-destructing chat room application built with Next.js, featuring real-time messaging, automatic room expiration, and internationalization support (English/French).

## Features

- Real-time messaging using Upstash Realtime
- Self-destructing chat rooms with automatic expiration (10 minutes)
- Private rooms limited to 2 participants
- Internationalization (i18n) with English and French support
- Dark terminal-inspired UI design
- Persistent user identity via localStorage
- Room destruction with instant notification to all participants

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query (React Query)
- **Backend**: Elysia.js (Bun runtime)
- **Database**: Upstash Redis
- **Realtime**: Upstash Realtime
- **Internationalization**: next-intl
- **Date Formatting**: date-fns

## Prerequisites

- Node.js 18+ or Bun runtime
- Upstash Redis account and credentials
- Upstash Realtime access

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/gery-guedegbe/realtime_chat_app.git>
cd realtime_chat_app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```env
UPSTASH_REDIS_REST_URL=your_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_redis_rest_token
UPSTASH_REALTIME_REST_URL=your_realtime_rest_url
UPSTASH_REALTIME_REST_TOKEN=your_realtime_rest_token
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable                      | Description                                           | Required |
| ----------------------------- | ----------------------------------------------------- | -------- |
| `UPSTASH_REDIS_REST_URL`      | Upstash Redis REST API URL                            | Yes      |
| `UPSTASH_REDIS_REST_TOKEN`    | Upstash Redis REST API token                          | Yes      |
| `UPSTASH_REALTIME_REST_URL`   | Upstash Realtime REST API URL                         | Yes      |
| `UPSTASH_REALTIME_REST_TOKEN` | Upstash Realtime REST API token                       | Yes      |
| `NEXT_PUBLIC_APP_URL`         | Application base URL (default: http://localhost:3000) | No       |

## Project Structure

```
src/
├── app/
│   ├
│   │── room/
│   │       └── [roomId]/
│   │           └── page.tsx   # Chat room page
│   ├── api/                   # API routes
│   │   ├── [[...slugs]]/      # Elysia API handler
│   │   └── realtime/          # Realtime WebSocket handler
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── language-switcher.tsx  # Language selector component
│   └── providers.tsx          # React Query & Realtime providers
├── hooks/
│   └── use-username.ts        # Username generation hook
└── lib/
    ├── client.ts              # API client (Eden)
    ├── redis.ts               # Redis client
    ├── realtime.ts            # Realtime server setup
    └── realtime-client.ts     # Realtime client hook
```

## Usage

### Creating a Room

1. On the home page, your identity is automatically generated and stored locally
2. Click "CREATE SECURE ROOM" to create a new chat room
3. Share the room URL with one other person
4. The room expires automatically after 10 minutes

### Joining a Room

1. Open the room URL shared with you
2. If the room is full (2 participants), you'll see an error message
3. Once joined, you can start messaging in real-time

### Room Management

- **Copy Room Link**: Click the "COPY" button next to the Room ID
- **Destroy Room**: Click "DESTROY NOW" to immediately delete the room and all messages
- **Auto-Destruction**: Rooms automatically expire after 10 minutes

## API Endpoints

### Room Management

- `POST /api/room/create` - Create a new chat room
- `GET /api/room/ttl?roomId={roomId}` - Get time remaining until room expiration
- `DELETE /api/room?roomId={roomId}` - Destroy a room immediately

### Messages

- `POST /api/messages?roomId={roomId}` - Send a message
- `GET /api/messages?roomId={roomId}` - Get all messages in a room

### Realtime Events

- `chat.message` - Emitted when a new message is sent
- `chat.destroy` - Emitted when a room is destroyed

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure the following:

- Node.js 18+ runtime
- Environment variables are properly configured
- Build command: `npm run build`
- Start command: `npm run start`

## Limitations

- Maximum 2 participants per room
- Rooms expire after 10 minutes
- Messages are stored in memory (Redis) and deleted when room expires
- No message history persistence beyond room lifetime

## License

This project is public and open source.
