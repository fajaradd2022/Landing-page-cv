Place the real portrait photo here as `profile.jpg` (portrait orientation, ~1200x1600px recommended).

Then in `components/Hero.tsx`, replace the placeholder block:

```tsx
<div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-charcoal-soft to-charcoal">
  <span className="font-mono text-xs tracking-widest text-gray-soft">PROFILE PHOTO</span>
</div>
```

with:

```tsx
import Image from "next/image";

<Image
  src="/images/profile.jpg"
  alt="Moh. Fajar Sodiq"
  fill
  className="object-cover"
  priority
/>
```

Also update `app/layout.tsx` Open Graph / Twitter `images` if the filename changes.
