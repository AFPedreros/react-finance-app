"use client";

import { motion, SpringOptions, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

import { formatCurrency } from "@/lib/utils";

type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
}: AnimatedNumberProps) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    formatCurrency(current.toString()),
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={className}>{display}</motion.span>;
}
