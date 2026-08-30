"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/admin/actions";

function Submit() { const { pending } = useFormStatus(); return <button type="submit" disabled={pending} className="admin-primary w-full">{pending ? "جارٍ الدخول..." : "تسجيل الدخول"}</button>; }
export default function LoginForm() {
  const [state, action] = useActionState(login, {});
  return <form action={action} className="space-y-5"><label className="admin-label">البريد الإلكتروني<input name="email" type="email" autoComplete="email" required className="admin-input" /></label><label className="admin-label">كلمة المرور<input name="password" type="password" autoComplete="current-password" required className="admin-input" /></label>{state.error && <p role="alert" className="admin-error">{state.error}</p>}<Submit /></form>;
}
