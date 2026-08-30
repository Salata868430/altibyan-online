"use client";
import { useFormStatus } from "react-dom";
export default function SubmitButton({ label = "حفظ" }: { label?: string }) { const { pending } = useFormStatus(); return <button type="submit" disabled={pending} className="admin-primary">{pending ? "جارٍ الحفظ..." : label}</button>; }
