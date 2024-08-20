import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { GithubIcon } from "@/components/icons";
import { Hello } from "@/features/hello/components/hello";

export default function Home() {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-6">
      <h1 className="py-8 text-5xl font-bold">Next + Hono</h1>
      <div className="flex flex-col items-center gap-4 py-8">
        <Button
          isExternal
          as={Link}
          className="w-fit text-sm"
          href="https://github.com/AFPedreros/react-hono-vercel-template"
          size="md"
          startContent={<GithubIcon />}
          variant="bordered"
        >
          {" "}
          Github
        </Button>

        <Hello />
      </div>
      <p className="text-foreground-400">
        Full-Stack monorepo with Hono API and React frontend deployed on Vercel
      </p>
    </div>
  );
}
