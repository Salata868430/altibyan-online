"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/admin/actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="admin-primary w-full cursor-pointer py-3 text-base font-bold transition duration-200 hover:opacity-95 disabled:opacity-50"
    >
      {pending ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
    </button>
  );
}

export default function LoginForm() {
  const [state, action] = useActionState(login, {});

  return (
    <form action={action} className="space-y-5">
      <label className="admin-label block text-sm font-bold">
        البريد الإلكتروني
        <input
          name="email"
          type="text"
          inputMode="email"
          autoComplete="username"
          required
          className="admin-input mt-1.5 w-full"
        />
      </label>

      <label className="admin-label block text-sm font-bold">
        كلمة المرور
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="admin-input mt-1.5 w-full"
        />
      </label>

      {state.error && (
        <div role="alert" className="admin-error rounded-xl p-3 text-sm font-bold">
          {state.error}
        </div>
      )}

      <Submit />
    </form>
  );
}
