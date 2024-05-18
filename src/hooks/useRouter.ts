import { useLocation, useNavigate } from "react-router-dom";

export const useRouter = () => {
  const query = window.location.href;
  const pageId = query.split("/");
  const pathname = window.location.href;

  const location = useLocation();

  const push = useNavigate();

  // equivlant to Next.js useRouter hook's route property
  const routes = location.pathname.split("/");

  return {
    query,
    pageId,
    pathname,
    push,
    routes,
  };
};
