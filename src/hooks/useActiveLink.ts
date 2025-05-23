'use client'
import { usePathname } from "next/navigation";
// ----------------------------------------------------------------------

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
  const location = usePathname();

  const isExternalLink = path.includes('http');

  const normalize = (url: string) => url.replace(/\/+$/, ''); // remove trailing slashes

  const currentPath = normalize(location || '');
  const targetPath = normalize(path);

  const normalActive = currentPath === targetPath;
  const deepActive = currentPath.startsWith(targetPath);

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink,
  };
}
