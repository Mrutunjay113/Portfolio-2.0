"use client";

import { useEffect, useRef, useState } from "react";

interface EmailCopyProps {
  email: string;
}

/** Big editorial email: click copies it to the clipboard and shows a short confirmation. */
export function EmailCopy({ email }: EmailCopyProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [user, domain] = email.split("@");

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard blocked/unavailable: fall back to the user's mail client.
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${email}`}
        className="group inline-flex cursor-pointer flex-wrap items-baseline gap-x-[0.25em] text-left text-[clamp(26px,7.6vw,100px)] leading-none font-medium tracking-[-0.055em]"
      >
        <span className="bg-[linear-gradient(var(--signal),var(--signal))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-expo-out group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">
          {user}
        </span>
        <span className="serif font-normal tracking-normal text-signal">@</span>
        <span className="bg-[linear-gradient(var(--signal),var(--signal))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-expo-out group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">
          {domain}
        </span>
      </button>

      <span
        aria-hidden
        className={
          "mono ml-3.5 inline-block align-middle transition-[opacity,transform] duration-300 " +
          (copied ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0")
        }
      >
        Copied to clipboard ✓
      </span>
      <span role="status" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
