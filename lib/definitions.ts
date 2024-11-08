export type Appeal = {
  _id: string;
  userSnowflake: string;
  bannedBy: string;
  action: string;
  appealContent: string;
  nextAppeal: string;
}

export type Application = {
  guildSnowflake: string;
  userSnowflake: string;
  submitDate: string;
  experience: string;
  position: string;
  botexp: string;
  avail: string;
  message: string;
  about: string;
  age: string;
  joindate: string;
}

export type CommandStat = {
  _id: string;
  guild_id: string;
  args: object;
  command_name: string;
}

export type Comment = {
  userSnowflake: string;
  appealId: string;
  commentContents: string;
  commentDate: string;
}

export type Guild = {
  _id: string;
  guildsnowflake: string;
  premium: boolean;
  moderators: [string];
  ownerid: string;
}

export type Insisght = {
  _id: string;
  type: string;
  date: string;
  tagline: string;
  guild_id: string;
  data: object;
  url: string;
}

export type Note = {
  _id: string;
  usersnowflake: string;
  guildsnowflake: string;
  note: string;
  date: string;
  authorsnowflake: string;
}

export type Transcript = {
  modmailid: string;
  sendersnowflake: string;
  attachments: [string];
  createdat: Date;
  GuildSnowflake: string;
  messagecontent: string;
  transcripttype: 'modmail' | 'jail',
  comment: boolean;
}