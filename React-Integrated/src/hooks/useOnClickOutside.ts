import { useEffect, type RefObject } from "react";

type Handler = (event: Event) => void;

function useOnClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: Handler) {
  useEffect(() => {
    if (!ref) return;

    const listener = (event: Event) => {
      const el = ref.current;
      if (!el) return;

      // Compatibility with Shadow DOM
      const path = (event as any).composedPath?.() || (event as any).path;
      if (path && path.indexOf(el) >= 0) return;

      // Target is inside the element — do not close
      if (el.contains(event.target as Node)) return;

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;