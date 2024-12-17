import { MemberLabel } from "@/components/ui/MemberLabel";
import { useBackend } from "@/hooks/use-backend";
import { ConfigInsight, DEFAULT_USER_RESPONSE, Insight, ModmailInsight } from "@/lib/definitions";
import { timeAgo } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function InsightCard({
  insight
}: {
  insight: Insight
}) {

  return (
    <a href={``}>
      <div className="aspect-video p-5 rounded-xl bg-muted/50 flex flex-col">
        <h1 className="text-2xl flex-1 font-bold text-center" >{insight.tagline}</h1>
        <div style={{flex: 5}} className="flex flex-col justify-center">
          {
            (() => {

              if (insight)
                switch (insight.type) {
                  case 'config':
                    return <InsightConfigCard insight={insight as ConfigInsight} />
                  case 'modmail':
                    return <InsightModmailCard insight={insight as ModmailInsight} />
                  default:
                    return <InsightLoadingcard />

                  }

              return <InsightLoadingcard />
            })()

          }
        </div>
        <div className="flex justify-between">
          <p className="dark:opacity-10 text-xs">{insight._id}</p>
          <p className="dark:opacity-10 text-xs">{timeAgo(Number(insight.date)*1000)}</p>
        </div>
      </div>
    </a>
  );

}


export function InsightNumStat({
  data,
  tagline
} : {

  data: number,
  tagline: string

}) {
  
  return (
    <div className="bg-slate-600 bg-opacity-5 rounded-lg  p-3 m-3">
      <h2 className="font-black text-xl dark:text-white stroke-black stroke-3">
        {data}
      </h2>
      <p className="dark:text-white">{tagline}</p>
    </div>
  )
}

export function InsightStringStat({
  data,
  descriptor
}: {
  data: string,
  descriptor: string
}) {

  return (
    <div className="bg-slate-600 bg-opacity-5 rounded-lg  p-3 m-1">
      <p className="dark:text-white text-xs">{descriptor}</p>
      <p className="font-black text-s dark:text-white stroke-black stroke-3">
        {data}
      </p>
    </div>
  )

}

export function InsightUserStat({
  userid
} : {

  userid: string

}) {

  const { actions } = useBackend(false);
  const [ user, setUser ] = useState(DEFAULT_USER_RESPONSE);

  useEffect(() => {

    actions.fetchUser(userid).then(x => {
      setUser(x);
    })

  }, [userid])
  
  return (
    <div className="bg-slate-600 bg-opacity-5 rounded-lg  p-3 m-3">
      <p className="mb-2">Started by:</p>
      <MemberLabel user={user} placement="right"/>
    </div>
  )
}

export function InsightModmailCard({
  insight
}: {
  insight: ModmailInsight
}) {

  return (
    <div style={{flex: 5}} className="flex flex-col justify-center">

      {/* className="flex-1 flex flex-wrap justify-center align-items-center" */}

      <div className="flex">

        <div className="flex flex-col flex-1">
          <InsightNumStat data={insight.data.messages} tagline={"Messages"}/>
          <InsightNumStat data={insight.data.participants} tagline={"Participants"}/>
        </div>

        <div className="flex flex-col flex-1">
          <InsightUserStat userid={insight.data.member} />
        </div>

      </div>
    </div>
  );

} 

export function InsightConfigCard({
  insight
}: {
  insight: ConfigInsight
}) {

  return (
    <div style={{flex: 5}} className="flex flex-col justify-center">
      
      <InsightStringStat data={insight.data.key}  descriptor="Key:"/>
      <InsightStringStat data={insight.data.oldvalue}  descriptor="Old Value:"/>
      <InsightStringStat data={insight.data.newvalue}  descriptor="New Value:"/>

    </div>
  );

}

export function InsightLoadingcard({
  
}) {
  return (

    <div className="aspect-video rounded-xl bg-muted/50 flex justify-center flex-col animate-pulse align-items-center">
      <div className="rounded-xl animate-pulse animate-spin">
        <LoaderCircle color="#8fC3FF"/>
      </div>
    </div>

  )
}