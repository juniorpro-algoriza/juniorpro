// TODO: use correct colors from globals.css
// !! Always end style varibles with `style`, see `.vscode/settings.json` for more details
// !! For example: `const buttonStyle = "..."` and not `const buttonStyle(s)`
// TODO: Add a state variable with a select/radio input for the user to choose a size for the button;

import { Button } from "@components";
import { Star } from "lucide-react";
import { containerStyle } from "../styles";

const ButtonStylePage = () => {
  return (
    <>
      <div className={containerStyle}>
        <Button variant="primary" size="medium">
          Primary Button
        </Button>
        <Button variant="secondary" size="small">
          Secondary Button
        </Button>
        <Button variant="tertiary" size="small">
          Tertiary Button
        </Button>
        <Button variant="destructive" size="small">
          Destructive Button
        </Button>
        <Button variant="primary" size="small" icon={<Star />}>
          With Icon
        </Button>
      </div>
    </>
  );
};

export default ButtonStylePage;
