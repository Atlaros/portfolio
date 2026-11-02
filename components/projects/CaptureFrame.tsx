import Image from "next/image";
import type { ReactNode } from "react";
import { CAPTURE_SIZE } from "@/lib/i18n/showcase";

function CaptureFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute top-3 right-0 -bottom-2 left-5 rounded-2xl border border-blue/25 bg-blue/10"
      />
      <div className="relative overflow-hidden rounded-2xl border border-cyan/25 bg-surface-raised shadow-[0_24px_64px_rgb(11_16_27/0.45)]">
        {children}
      </div>
    </div>
  );
}

function CaptureImage({ src, alt }: { src: string; alt: string }) {
  const size = CAPTURE_SIZE[src] ?? { width: 1024, height: 490 };

  return (
    <Image
      src={src}
      alt={alt}
      width={size.width}
      height={size.height}
      sizes="(min-width: 1280px) 640px, 100vw"
      className="h-auto w-full bg-[#eceff3] object-contain"
    />
  );
}

export { CaptureFrame, CaptureImage };
