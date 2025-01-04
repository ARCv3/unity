"use client";
import { ArrowDownRight, ClockArrowUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBackend } from "@/hooks/use-backend";
import { SITE_DESCRIPTION, SITE_HERO_IMAGE, SITE_TITLE } from "@/lib/definitions";

export default function Hero() {

  const {actions} = useBackend(false);

  return (
    <section className="py-10">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
        <img
            src={SITE_HERO_IMAGE}
            alt="placeholder hero"
            className="max-h-96 w-full rounded-md object-cover"
            width="96"
            height={96}
          />

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge onClick={() => {
              actions.redirectStatus();
            }} variant="outline">
              Status
              <ClockArrowUp className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {SITE_TITLE}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button onClick={() => {
                actions.redirectDash()
              }} className="w-full sm:w-auto">Dashboard</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Forms
                <ArrowDownRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}