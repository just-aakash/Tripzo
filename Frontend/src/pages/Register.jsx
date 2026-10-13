import { useTheme } from "../context/ThemeContext";

import GenZRegister from "../components/themes/genz/GenZRegister";
import MillenialRegister from "../components/themes/millenial/MillenialRegister";

export default function Register() {
  const { theme } = useTheme();

  if (theme === "millennial") {
    return <MillenialRegister />;
  }

  return <GenZRegister />;
}
