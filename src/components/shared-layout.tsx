"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

const GAMES = [
  {
    title: "The Oddysey",
    description: "Explore unknown galaxies.",
    longDescription:
      "Throughout their journey, players will encounter diverse alien races, each with their own unique cultures and technologies. Engage in thrilling space combat, negotiate complex diplomatic relations, and make critical decisions that affect the balance of power in the galaxy.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/space.png",
  },
  {
    title: "Angry Rabbits",
    description: "They are coming for you.",
    longDescription:
      "The rabbits are angry and they are coming for you. You have to defend yourself with your carrot gun. The game is not simple, you have to be fast and accurate to survive.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/rabbit.png",
  },
  {
    title: "Ghost town",
    description: "Find the ghosts.",
    longDescription:
      "You are in a ghost town and you have to find the ghosts. But be careful, they are dangerous.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/ghost.webp",
  },
  {
    title: "Pirates in the jungle",
    description: "Find the treasure.",
    longDescription:
      "You are a pirate and you have to find the treasure in the jungle. But be careful, there are traps and wild animals.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/pirate.png",
  },

  {
    title: "Lost in the mountains",
    description: "Find your way home.",
    longDescription:
      "You are lost in the mountains and you have to find your way home. But be careful, there are dangerous animals and you can get lost.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/boy.webp",
  },
];

type Game = (typeof GAMES)[number];

export function SharedLayout() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setActiveGame(null));
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveGame(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeGame ? (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              className="z-1 pointer-events-none absolute inset-0"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            />
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-10 grid place-items-center backdrop-blur-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <motion.div
                ref={ref}
                className="w-[500px] cursor-pointer overflow-hidden rounded-xl bg-content1 p-4 shadow-small"
                layoutId={activeGame.title}
              >
                <div className="flex w-full items-center gap-4">
                  <motion.img
                    alt="Game"
                    className="rounded-xl"
                    height={56}
                    layoutId={`image-${activeGame.title}`}
                    src={activeGame.image}
                    width={56}
                  />
                  <div className="flex flex-grow items-center justify-between">
                    <div>
                      <motion.h2
                        className="text-sm font-medium"
                        layoutId={`title-${activeGame.title}`}
                      >
                        {activeGame.title}
                      </motion.h2>
                      <motion.p
                        className="text-sm text-[#63635d]"
                        layoutId={`paragraph-${activeGame.title}`}
                      >
                        {activeGame.description}
                      </motion.p>
                    </div>
                    <motion.button
                      className="rounded-full bg-[#f1f0ef] px-3 py-1 text-xs font-semibold text-[#007aff]"
                      layoutId={`button-${activeGame.title}`}
                    >
                      Get
                    </motion.button>
                  </div>
                </div>
                <motion.p
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-[#63635d]"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {activeGame.longDescription}
                </motion.p>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <ul className="relative my-12 flex w-full flex-col items-center p-0">
        {GAMES.map((game, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <motion.li
            key={game.title}
            className="flex w-[386px] cursor-pointer items-center gap-4 rounded-lg p-0"
            layoutId={game.title}
            onClick={() => setActiveGame(game)}
          >
            <motion.img
              alt="Game"
              className="rounded-xl"
              height={56}
              layoutId={`image-${game.title}`}
              src={game.image}
              width={56}
            />
            <div
              className={`flex flex-grow items-center justify-between ${
                index !== GAMES.length - 1 ? "border-b border-[#d4d6d861]" : ""
              }`}
            >
              <div className="flex flex-col py-4">
                <motion.h2
                  className="text-sm font-medium"
                  layoutId={`title-${game.title}`}
                >
                  {game.title}
                </motion.h2>
                <motion.p
                  className="text-sm text-[#63635d]"
                  layoutId={`paragraph-${game.title}`}
                >
                  {game.description}
                </motion.p>
              </div>
              <motion.button
                className="rounded-full bg-[#f1f0ef] px-3 py-1 text-xs font-semibold text-[#007aff]"
                layoutId={`button-${game.title}`}
              >
                Get
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
