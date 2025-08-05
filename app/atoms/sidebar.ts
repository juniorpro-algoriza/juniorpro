// atoms/sidebar.ts
import { atom } from 'jotai';

// Base atoms
export const isMobileAtom = atom(false);
export const isOpenAtom = atom(true);

// Derived atom for toggle functionality
export const toggleSidebarAtom = atom(null, (get, set) => {
  const currentIsOpen = get(isOpenAtom);
  set(isOpenAtom, !currentIsOpen);
});

// Combined sidebar state atom for convenience
export const sidebarStateAtom = atom((get) => ({
  isOpen: get(isOpenAtom),
  isMobile: get(isMobileAtom),
}));

// Hook for easier usage
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);
  const toggleSidebar = useSetAtom(toggleSidebarAtom);

  return {
    isOpen,
    isMobile,
    toggleSidebar,
    setIsOpen,
    setIsMobile,
  };
};

// Alternative hook if you only need to read the state
export const useSidebarState = () => useAtomValue(sidebarStateAtom);

// Alternative hook if you only need the toggle function
export const useSidebarToggle = () => useSetAtom(toggleSidebarAtom);
