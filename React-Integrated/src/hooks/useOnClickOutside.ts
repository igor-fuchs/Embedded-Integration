import { useEffect, type RefObject } from "react";

type Handler = (event: Event) => void;

function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>, 
  handler: Handler,
  ignoreRefs?: RefObject<HTMLElement | null>[]
) {
  useEffect(() => {
    if (!ref) return;

    const listener = (event: Event) => {
      const el = ref.current;
      if (!el) return;

      // Check if click is on any ignored element
      if (ignoreRefs) {
        for (const ignoreRef of ignoreRefs) {
          if (ignoreRef.current?.contains(event.target as Node)) {
            return;
          }
        }
      }

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
  }, [ref, handler, ignoreRefs]);
}

export default useOnClickOutside;