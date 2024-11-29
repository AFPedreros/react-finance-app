"use client";

import { Icon } from "@iconify/react";
import { Card, CardBody } from "@nextui-org/card";
import { cn } from "@nextui-org/theme";
import { useMemo } from "react";

import { formatCurrency } from "@/lib/utils";

import type { CardProps } from "@nextui-org/card";

export type ActionCardProps = CardProps & {
  icon: string;
  title: string;
  color?: "primary" | "secondary" | "warning" | "danger" | "success";
  amount: string;
};

export function TransactionCard({
  color,
  title,
  icon,
  amount,
  className,
  ...props
}: ActionCardProps) {
  const colors = useMemo(() => {
    switch (color) {
      case "primary":
        return {
          card: "border-default-200",
          iconWrapper: "bg-primary-50 border-primary-100",
          icon: "text-primary",
        };
      case "secondary":
        return {
          card: "border-secondary-300",
          iconWrapper: "bg-secondary-50 border-secondary-100",
          icon: "text-secondary",
        };
      case "success":
        return {
          card: "border-success-300",
          iconWrapper: "bg-success-50 border-success-100",
          icon: "text-success-600",
        };
      case "warning":
        return {
          card: "border-warning-500",
          iconWrapper: "bg-warning-50 border-warning-100",
          icon: "text-warning-600",
        };
      case "danger":
        return {
          card: "border-danger-300",
          iconWrapper: "bg-danger-50 border-danger-100",
          icon: "text-danger",
        };

      default:
        return {
          card: "border-default-200",
          iconWrapper: "bg-default-50 border-default-100",
          icon: "text-default-500",
        };
    }
  }, [color]);

  return (
    <Card
      className={cn("border-small", colors?.card, className)}
      shadow="sm"
      {...props}
    >
      <CardBody className="flex h-full flex-row items-start gap-3 p-4">
        <div
          className={cn(
            "item-center flex rounded-medium border p-2",
            colors?.iconWrapper,
          )}
        >
          <Icon className={colors?.icon} icon={icon} width={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-medium text-default-400">{title}</p>
          <p className="text-lg">{formatCurrency(amount)}</p>
        </div>
      </CardBody>
    </Card>
  );
}