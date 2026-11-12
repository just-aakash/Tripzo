import { useTheme } from "../context/ThemeContext";

import GenZLogin from "../components/themes/genz/GenZLogin";
import MillenialLogin from "../components/themes/millenial/MillenialLogin";

export default function Login() {
  const { theme } = useTheme();

  if (theme === "genz") {
    return <GenZLogin />;
  }

  return <MillenialLogin />;
}
