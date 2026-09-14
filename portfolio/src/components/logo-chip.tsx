import Image from "next/image";

/**
 * Third-party marks (employers, universities) arrive in inconsistent
 * colors — some brand-blue, some black, one an SVG with its own palette.
 * A small neutral card normalizes all of them so they read cleanly in
 * both themes instead of clashing with whichever one is active.
 */
export function LogoChip({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-2">
      <span className="flex h-7 w-14 items-center justify-center rounded bg-white">
        <Image
          src={src}
          alt={alt}
          width={48}
          height={20}
          className="max-h-5 w-auto object-contain"
        />
      </span>
      <span className="text-xs text-[var(--color-fg-muted)]">{label}</span>
    </div>
  );
}
