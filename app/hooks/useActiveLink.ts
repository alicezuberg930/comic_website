import { useLocation } from "react-router";
// ----------------------------------------------------------------------

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
  const location = useLocation();

  const isExternalLink = path.includes('http');

  const normalize = (url: string) => url.replace(/\/+$/, ''); // remove trailing slashes

  const currentPath = normalize(location.pathname || '');
  const targetPath = normalize(path);

  const normalActive = currentPath === targetPath;
  const deepActive = currentPath.startsWith(targetPath);

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink,
  };
}
