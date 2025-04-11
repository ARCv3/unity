"use client";

import { useBackend } from "@/hooks/use-backend"
import { useEffect, useState } from "react"
import { InsightCard } from "./insight-card";
import { useSelectedGuildState } from "@/hooks/use-selected-guild-state";
import {Insight} from "@/lib/definitions";

export function InsightList(

) {

  const emptyInsightList : Insight[] = []
  const { actions } = useBackend(false)
  const [insights, setInsights] = useState(emptyInsightList)
  const { guild } = useSelectedGuildState();

  useEffect(() => {
    
    actions.fetchInsights(guild).then( x => {
      setInsights(x)
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guild]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        {insights.map(insight => {
          return <InsightCard key={insight._id} insight={insight}/>
        })}
      </div>
    </div>
  )

}