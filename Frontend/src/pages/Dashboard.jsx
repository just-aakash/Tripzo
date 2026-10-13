import { useTheme } from "../context/ThemeContext";

import GenZDashboard from "../components/themes/genz/GenZDashboard";
import MillenialDashboard from "../components/themes/millenial/MillenialDashboard";

export default function Dashboard() {
  const { theme } = useTheme();

  if (theme === "genz") {
    return <GenZDashboard />;
  }

  return <MillenialDashboard />;
}
