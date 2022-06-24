import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import GithubIcon from "./GithubIcon";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <header className="bg-primary-100 relative z-30 border-b flex items-center px-5 h-14">
        <a className="text-lg font-semibold">Feint</a>
        <div style={{ maxWidth: "400px" }} className="flex-1 px-5">
          <div className="border flex bg-theme rounded">
            <SearchIcon className="mx-3" width={15} />
            <input placeholder="Search..." className="p-1 bg-theme rounded" />
          </div>
        </div>
        <div className="ml-auto">
          <a href="https://github.com/feint-gg/nex">
            <GithubIcon />
          </a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-primary-100 p-5 border-t">
        <div className="text-center">Feint.gg © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
