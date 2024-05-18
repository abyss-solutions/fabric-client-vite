import LoginButton from "@/components/LoginButton";
import { AnalysisNavbar } from "@/components/shared/AnalysisNavbar";
import { useLocation } from "react-router-dom";

export const HomePage = () => {
  const location = useLocation();
  return (
    <>
      <AnalysisNavbar />
      <main>
        <h1>Fabric Client Vite</h1>
        <LoginButton />
      </main>
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </>
  );
};
