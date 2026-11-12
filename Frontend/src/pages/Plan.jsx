import { useTheme } from "../context/ThemeContext";

import GenZPlan from "../components/themes/genz/GenZPlan";
import MillenialPlan from "../components/themes/millenial/MillenialPlan";

export default function Plan() {
  const { theme } = useTheme();

  if (theme === "genz") {
    return <GenZPlan />;
  }

  return <MillenialPlan />;
}
