"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button, Input, Label } from "@meet-point/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 인증 로직 연결
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-lg">
      {/* 헤더 */}
      <div className="mb-xl">
        <h1 className="text-2xl font-bold">로그인</h1>
        <p className="mt-sm text-sm text-muted-foreground">
          이메일과 비밀번호로 로그인하세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
        {/* 이메일 */}
        <div className="flex flex-col gap-sm">
          <Label htmlFor="email">이메일</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-sm">
          <Label htmlFor="password">비밀번호</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              className="pl-10 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* 로그인 상태 유지 / 비밀번호 찾기 */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className="size-4 rounded border-border accent-primary"
            />
            로그인 상태 유지
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground underline"
          >
            비밀번호 찾기
          </Link>
        </div>

        {/* 로그인 버튼 */}
        <Button type="submit" className="mt-sm w-full">
          로그인
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-primary font-medium underline">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
}
