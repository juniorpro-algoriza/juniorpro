import Link from "next/link";

const StylePage = () => {
  return (
    <main>
      <ul>
        <li>
          <Link href="/style-guide/button">Button</Link>
        </li>
        <li>
          <Link href="/style-guide/input">Input</Link>
        </li>
        <li>
          <Link href="/style-guide/tabs">Tabs</Link>
        </li>
        <li>
          <Link href="/style-guide/colors">Colors</Link>
        </li>
      </ul>
    </main>
  );
};

export default StylePage;
