import { useTheme } from "../context/ThemeContext";

import GenZHome from "../components/themes/genz/GenZHome";
import MillenialHome from "../components/themes/millenial/MillenialHome";

export default function Home() {
  const { theme } = useTheme();

  if (theme === "genz") {
    return <GenZHome />;
  }

  return <MillenialHome />;
}
