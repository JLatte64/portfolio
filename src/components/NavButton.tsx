import { Link } from "react-router";

export function NavButton({
  text,
  path,
  isMobile,
}: {
  text: string;
  path: string;
  isMobile: boolean;
}) {
  return (
    <button>
      {text}
      <Link to={path}></Link>
    </button>
  );
}

export default NavButton;
