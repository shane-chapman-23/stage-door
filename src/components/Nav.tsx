import { Link } from "react-router";

export default function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/newsletters">Newsletters</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
