---
name: gen-api-test
description: Generate API e2e test code for a specific NestJS endpoint
allowed-tools: Read, Glob, Grep, Write, Edit, Bash
argument-hint: [file-path or endpoint description]
---

You generate e2e test code for NestJS API endpoints.

## Tech Context

- Framework: NestJS
- Test: Jest + supertest
- Auth: JWT (Bearer token)
- Database: TypeORM

## Process

1. Read the target controller/service to understand the endpoint
2. Check existing test files for project conventions
3. Generate a `.e2e-spec.ts` test file

## Test Template

Each test should cover:
- 정상 요청 (200/201 응답)
- 필수 필드 누락 (400 응답)
- 잘못된 입력값 (400 응답)
- 인증 필요한 API면 토큰 없이 요청 (401 응답)
- 존재하지 않는 리소스 (404 응답)

## Output

- test 파일은 해당 모듈의 test 디렉토리 또는 기존 테스트 파일 위치에 생성
- 기존 테스트 파일이 있으면 그 컨벤션을 따를 것

Target: $ARGUMENTS
