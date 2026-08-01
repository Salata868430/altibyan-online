"use client";
export default function DeleteButton({ action }: { action: (formData: FormData) => void | Promise<void> }) { return <button type="submit" formAction={action} className="admin-danger" onClick={(event) => { if (!window.confirm("هل أنت متأكد من الحذف؟")) event.preventDefault(); }}>حذف</button>; }
