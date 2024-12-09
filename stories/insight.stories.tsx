import '../app/globals.css'

import type { Meta, StoryObj } from '@storybook/react';

import { InsightCard } from "@/components/unity/insights/insight-card";

const meta = {
    title: 'Insight Card',
    component: InsightCard,
    decorators: [
        (Story) => (
          <div className="flex flex-1 flex-col gap-4 p-4 ">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
              <Story/>
              <Story/>
              <Story/>
              <Story/>
            </div>
          </div>
        ),
    ],
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
      layout: 'fullscreen',
    },
    args: {
      insight: {
        "_id": "892f17ca-0283-4dcc-84e3-31c69c9d3860",
        "type": "config",
        "date": "1720330557",
        "tagline": "Config value was changed",
        "guild_id": "569929112932712469",
        "data": {
          "key": "testing-insights",
          "oldvalue": "testvalue",
          "newvalue": "new-value"
        },
        "url": ""
      },
    },
  } satisfies Meta<typeof InsightCard>;
  
  export default meta;
  
  type Story = StoryObj<typeof meta>;

  export const ConfigInsight: Story = {

  };


  export const ModmailInsight: Story = {
    args: {
      insight: {
        "_id": "91a36ac6-c580-4b6c-9c19-a1ca4a624e9d",
        "type": "modmail",
        "date": "1720380208",
        "tagline": "Modmail has high activity",
        "guild_id": "569929112932712469",
        "data": {
        "mailid": "23290113-ccd9-4d4d-9c7f-a15727f05172",
        "messages": 13,
        "participants": 6,
        "member": "543547697408376832"
        },
        "url": "/569929112932712469/transcripts/23290113-ccd9-4d4d-9c7f-a15727f05172"
      },
    }
  };

  export const LoadingInsight: Story = {
    args: {
      insight: {
        "_id": "",
        "type": "loading",
        "date": "",
        "tagline": "",
        "guild_id": "",
        "data": {
        "mailid": "",
        "messages": 0,
        "participants": 0,
        "member": ""
        },
        "url": "/569929112932712469/transcripts/23290113-ccd9-4d4d-9c7f-a15727f05172"
      },
    }
  };