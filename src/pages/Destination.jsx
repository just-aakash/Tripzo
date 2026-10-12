import { useTheme } from "../context/ThemeContext";

import GenZDestination from "../components/themes/genz/GenZDestination";
import MillenialDestination from "../components/themes/millenial/MillenialDestination";

export default function Destination() {
  const { theme } = useTheme();

  /*
    TravelMate supports two completely different
    destination page designs.

    The actual destination is obtained by the
    theme-specific component from the URL/router state.
  */

  if (theme === "genz") {
    return <GenZDestination />;
  }

  return <MillenialDestination />;
}
