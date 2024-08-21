import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { GithubIcon } from "@/components/icons";
import { ClientHello } from "@/features/hello/components/client-hello";
import { ServerHello } from "@/features/hello/components/server-hello";
import { CreateHello } from "@/features/hello/components/update-hello-form";

export default async function Home() {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">Next + Hono</h1>
      <div className="flex flex-col items-center gap-4">
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

        <ServerHello />
        <ClientHello />
        <CreateHello />
      </div>
      <p className="text-foreground-400">
        Full-Stack monorepo with a Next.js frontend and Hono API deployed on
        Vercel
      </p>
    </div>
  );
}
