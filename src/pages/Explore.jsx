import { useTheme } from "../context/ThemeContext";

import GenZExplore from "../components/themes/genz/GenZExplore";
import MillenialExplore from "../components/themes/millenial/MillenialExplore";

export default function Explore() {
  const { theme } = useTheme();

  if (theme === "genz") {
    return <GenZExplore />;
  }

  return <MillenialExplore />;
}
