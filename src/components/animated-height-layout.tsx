"use client";

import { Button } from "@nextui-org/button";
import { card } from "@nextui-org/theme";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export function AnimatedHeightLayout() {
  const [showExtraContent, setShowExtraContent] = useState(false);

  const [elementRef, { height }] = useMeasure();

  const { base, header, body } = card();

  return (
    <div className="mx-auto flex flex-col items-center gap-8">
      <Button
        className="button"
        color="primary"
        onClick={() => setShowExtraContent((b) => !b)}
      >
        Toggle height
      </Button>

      <motion.div
        animate={{ height: height }}
        className={base({ className: "max-w-[400px]" })}
      >
        <div ref={elementRef}>
          <div className={header()}>
            <h1 className="font-semibold">Fake Family Drawer</h1>
          </div>

          <div
            className={body({ className: "gap-2 text-sm text-default-500" })}
          >
            <p>
              This is a fake family drawer. Animating height is tricky, but
              satisfying when it works.
            </p>
            <AnimatePresence>
              {showExtraContent && (
                <motion.p
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  This extra content will change the height of the drawer. Some
                  even more content to make the drawer taller and taller and
                  taller...
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
