import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

export const useRouter = () => {
  const pathname = window.location.href;
  const query = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  const location = useLocation();

  const navigate = useNavigate();

  const push = ({
    pathname,
    query,
  }: {
    pathname: string;
    query?: Record<string, string>;
  }) => {
    setSearchParams(query);
    navigate(pathname);
  };

  // equivlant to Next.js useRouter hook's route property
  const routes = location.pathname.split("/");

  return {
    pathname,
    push,
    routes,
    query,
  };
};
