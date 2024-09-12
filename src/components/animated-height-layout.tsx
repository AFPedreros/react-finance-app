"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

export function AnimatedHeightLayout() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [ref, { height }] = useMeasure();

  return (
    <div className="mx-auto flex flex-col items-center gap-8">
      <Button
        className="button"
        color="primary"
        onClick={() => setShowExtraContent((b) => !b)}
      >
        Toggle height
      </Button>

      <motion.div animate={{ height: height }} className="overflow-hidden">
        <Card ref={ref} className="max-w-[400px]">
          <CardHeader>
            <h1 className="font-semibold">Fake Family Drawer</h1>
          </CardHeader>

          <CardBody className="text-sm text-default-500">
            <p>
              This is a fake family drawer. Animating height is tricky, but
              satisfying when it works.
            </p>
            {showExtraContent && (
              <p>
                This extra content will change the height of the drawer. Some
                even more content to make the drawer taller and taller and
                taller...
              </p>
            )}
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
