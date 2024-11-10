"use client";

import { useBackend } from "@/hooks/use-backend"
import { useEffect, useState } from "react"
import { InsightCard } from "./insight-card";
import { useGlobalState } from "@/hooks/use-global-state";


export function InsightList(

) {

  const { hooks, actions } = useBackend()
  const [insights, setInsights] = useState([])
  const { guild, setGuild } = useGlobalState();

  useEffect(() => {
    
    console.log(guild)

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