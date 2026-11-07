import { useTheme } from "../context/ThemeContext";

import GenZBudgetIntelligence from "./themes/genz/GenZBudgetIntelligence";
import MillenialBudgetIntelligence from "./themes/millenial/MillenialBudgetIntelligence";

export default function BudgetIntelligence({ destination }) {
  const { theme } = useTheme();

  if (theme === "genz") {
    return <GenZBudgetIntelligence destination={destination} />;
  }

  return <MillenialBudgetIntelligence destination={destination} />;
}
