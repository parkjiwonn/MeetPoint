# Meet Point

친구들과 중간 지점을 찾아 만날 장소를 추천해주는 서비스

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: Next.js 16, React 19, Tailwind CSS v4
- **Backend**: NestJS 11
- **Language**: TypeScript

## Project Structure

```
apps/
  web/       — 프론트엔드 (localhost:3000)
  server/    — 백엔드 API (localhost:3001)
packages/
  ui/        — 디자인 시스템
  shared/    — 공유 타입/유틸
  config/    — tsconfig, eslint 공유 설정
```

## Getting Started

```bash
pnpm install
pnpm dev
```
