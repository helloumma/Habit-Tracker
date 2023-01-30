import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <h1>Index</h1>
      <Link to="/result">Result</Link>
    </main>
  );
}
