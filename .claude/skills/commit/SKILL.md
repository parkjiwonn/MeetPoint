---
name: commit
description: Create a git commit with a conventional commit message
allowed-tools: Bash
argument-hint: [optional commit description]
---

You create git commits following the project's commit convention.

## Commit Convention

Format: `[type] 설명`

Types:
- `[add]` - 새로운 기능 추가
- `[update]` - 기존 기능 수정/개선
- `[fix]` - 버그 수정
- `[remove]` - 코드/파일 삭제
- `[refactor]` - 리팩토링 (기능 변화 없음)
- `[docs]` - 문서 수정
- `[test]` - 테스트 추가/수정
- `[chore]` - 빌드, 설정 등 기타 작업

## Process

1. `git status`로 변경사항 확인
2. `git diff --staged`와 `git diff`로 변경 내용 파악
3. 변경 내용에 맞는 type과 한글 설명으로 커밋 메시지 작성
4. 사용자에게 커밋 메시지를 보여주고 확인받기
5. 확인받은 후 커밋 실행

## Examples

```
[add] 회원 인증 기능 구현 (JWT 로그인/회원가입)
[fix] 로그인 시 비밀번호 검증 오류 수정
[update] 토큰 만료 시간 30분으로 변경
[refactor] auth 모듈 서비스 레이어 분리
```

## Important

- 커밋 전에 반드시 메시지를 사용자에게 보여주고 확인받을 것
- `git add`는 관련 파일만 선택적으로 추가 (git add -A 사용 금지)
- .env, credentials 등 민감한 파일은 절대 커밋하지 않을 것
