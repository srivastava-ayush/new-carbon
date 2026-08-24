"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarRange,
  Check,
  FileText,
  FolderKanban,
  Plug,
  Rocket,
  Target,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WorkspaceReadyProps {
  brandName: string;
  onEnterDashboard: () => void;
  onInvite: () => void;
}

interface Task {
  icon: React.ElementType;
  title: string;
  description: string;
  tag: "Recommended" | "Optional";
  done: boolean;
}

export function WorkspaceReady({
  brandName,
  onEnterDashboard,
  onInvite,
}: WorkspaceReadyProps) {
  const displayName = brandName || "your organization";

  const tasks: Task[] = [
    {
      icon: Plug,
      title: "Connect your ERP",
      description: "Link SAP, NetSuite or Dynamics to auto-import spend and activity data.",
      tag: "Recommended",
      done: false,
    },
    {
      icon: FileText,
      title: "Upload utility bills",
      description: "Share your electricity and gas invoices to complete Scope 2.",
      tag: "Recommended",
      done: false,
    },
    {
      icon: Users,
      title: "Invite teammates",
      description: "Bring your sustainability, finance and operations colleagues in.",
      tag: "Recommended",
      done: true,
    },
    {
      icon: Target,
      title: "Configure Scope 3",
      description: "Map suppliers, travel and cloud spend to the categories you selected.",
      tag: "Recommended",
      done: false,
    },
    {
      icon: Building2,
      title: "Add facility details",
      description: "Layer in floor area and meter numbers for each of your sites.",
      tag: "Optional",
      done: false,
    },
    {
      icon: CalendarRange,
      title: "Schedule your first report",
      description: "We'll draft it as soon as your data is flowing.",
      tag: "Optional",
      done: false,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
          className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary shadow-[0_10px_30px_rgba(99,91,255,0.35)]"
        >
          <Check className="size-8 text-primary-foreground" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          {displayName} is ready.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-6 text-muted-foreground"
        >
          Your workspace is configured with your frameworks, emission factors and
          reporting calendar. Here&apos;s what to do next.
        </motion.p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tasks.map((task, i) => {
          const Icon = task.icon;
          return (
            <motion.div
              key={task.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.07, duration: 0.35 }}
              className="group relative flex flex-col rounded-xl border border-border bg-background p-4.5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={
                    task.done
                      ? "flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
                      : "flex size-9 items-center justify-center rounded-lg bg-accent-muted text-primary"
                  }
                >
                  <Icon className="size-4.5" />
                </span>
                <Badge variant={task.done ? "soft" : "muted"}>{task.tag}</Badge>
              </div>
              <h3 className="mt-3 flex items-center gap-1.5 text-[0.9375rem] font-semibold text-foreground">
                {task.title}
                {task.done && <Check className="size-4 text-emerald-500" strokeWidth={3} />}
              </h3>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {task.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.35 }}
        className="mt-12 flex flex-col items-center gap-3"
      >
        <Button size="lg" onClick={onEnterDashboard} className="min-w-[14rem]">
          <Rocket className="size-4" />
          Go to your dashboard
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="ghost" size="lg" onClick={onInvite}>
          <Users className="size-4" />
          Invite teammates
        </Button>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <FolderKanban className="size-3.5" />
          We&apos;ve also queued a guided setup checklist inside the workspace.
        </p>
      </motion.div>
    </div>
  );
}
