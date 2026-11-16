import { useEffect, useRef, useState, type RefObject } from "react";
import { moduleSectionId } from "../utils/moduleSectionId";

type UsePermissionModuleScrollSpyOptions = {
  moduleNames: string[];
  initialModule?: string;
  /** Re-bind observer when search/filter changes the DOM. */
  observeKey?: string;
};

type UsePermissionModuleScrollSpyResult = {
  activeModule: string;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
  navigateToModule: (moduleName: string) => void;
};

export const usePermissionModuleScrollSpy = ({
  moduleNames,
  initialModule = "",
  observeKey = "",
}: UsePermissionModuleScrollSpyOptions): UsePermissionModuleScrollSpyResult => {
  const [activeModule, setActiveModule] = useState(
    () => initialModule || moduleNames[0] || "",
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingToModuleRef = useRef(false);

  const moduleNamesKey = moduleNames.join("|");

  useEffect(() => {
    const container = scrollContainerRef.current;
    const names = moduleNamesKey === "" ? [] : moduleNamesKey.split("|");
    if (!container || names.length === 0) {
      return;
    }

    const sectionElements = names
      .map((moduleName) =>
        container.querySelector(`#${CSS.escape(moduleSectionId(moduleName))}`),
      )
      .filter((element): element is Element => element !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToModuleRef.current) {
          return;
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );

        const topVisible = visible[0]?.target.getAttribute("data-module");
        if (topVisible) {
          setActiveModule(topVisible);
        }
      },
      {
        root: container,
        rootMargin: "-10% 0px -60% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [moduleNamesKey, observeKey]);

  const navigateToModule = (moduleName: string) => {
    setActiveModule(moduleName);
    const container = scrollContainerRef.current;
    const section = container?.querySelector(
      `#${CSS.escape(moduleSectionId(moduleName))}`,
    );

    if (!container || !(section instanceof HTMLElement)) {
      return;
    }

    isScrollingToModuleRef.current = true;
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      isScrollingToModuleRef.current = false;
    }, 450);
  };

  return {
    activeModule,
    scrollContainerRef,
    navigateToModule,
  };
};
