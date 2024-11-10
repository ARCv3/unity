import { Insight } from "@/lib/definitions";
import { LoaderCircle } from "lucide-react";

export function InsightCard({
  insight
}: {
  insight: Insight
}) {

  return (
    <>
      {
        (() => {

          if (insight)
            switch (insight.type) {
              case 'config':
                return <InsightConfigCard insight={insight} />
              case 'modmail':
                return <InsightModmailCard insight={insight} />
              default:
                return <InsightLoadingcard />

              }

          return <InsightLoadingcard />
        })()

      }
    </>

  );
}

export function InsightModmailCard({
  insight
}: {
  insight: Insight
}) {

  return (
    <div className="aspect-video p-5 rounded-xl bg-muted/50 flex flex-col">
      <h1 className="text-xl font-bold" >{insight.tagline}</h1>
      <div className="flex-1">
        
      </div>
    </div>
  );

} 

export function InsightConfigCard({
  insight
}: {
  insight: Insight
}) {

  return (
    <div className="aspect-video rounded-xl bg-muted/50 flex justify-center flex-col align-items-center">
      
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