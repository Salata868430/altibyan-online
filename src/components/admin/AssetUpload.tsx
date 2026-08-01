"use client";
import { ChangeEvent, useActionState, useState } from "react";
import Image from "next/image";
import { uploadAsset } from "@/app/admin/actions";
export default function AssetUpload() {
  const [preview, setPreview] = useState(""); const [state, action, pending] = useActionState(uploadAsset, {});
  const choose = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (preview) URL.revokeObjectURL(preview); setPreview(file ? URL.createObjectURL(file) : ""); };
  return <form action={action} className="admin-card space-y-4"><h2 className="text-xl font-black">رفع صورة</h2><p className="admin-muted text-sm">JPG أو PNG أو WebP، بحد أقصى 5MB. انسخ الرابط الناتج إلى حقل رابط الصورة قبل الحفظ.</p><input name="file" type="file" accept="image/jpeg,image/png,image/webp" required onChange={choose} className="admin-input" />{preview && <div className="relative h-44 w-full"><Image src={preview} alt="معاينة الصورة قبل الرفع" fill unoptimized className="rounded-xl object-contain" /></div>}{state.error && <p className="admin-error">{state.error}</p>}{state.success && <p className="admin-success break-all">{state.success}</p>}<button type="submit" disabled={pending} className="admin-secondary">{pending ? "جارٍ الرفع..." : "رفع الصورة"}</button></form>;
}
