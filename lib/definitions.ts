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

export type UserData = {
  _id: string;
  usersnowflake: string;
  role: string;
  reports: string[];
  commands: number;
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
  moderators: string[];
  ownerid: string;
}

export type Insight = {
  _id: string;
  type: 'modmail' | 'config' | 'loading';
  date: string;
  tagline: string;
  guild_id: string;
  data: object;
  url: string;
}

export interface ModmailInsight extends Insight {
  data: {
    mailid: string;
    messages: number;
    participants: number;
    member: string;
  };
}

export interface ConfigInsight extends Insight {
  data: {
    key: string;
    oldvalue: string;
    newvalue: string;
  };
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
  modmailId: string;
  sendersnowflake: string;
  attachments: string[];
  createdat: string;
  GuildSnowflake: string;
  messagecontent: string;
  transcripttype: string;
  comment: boolean;
}

export const DEFAULT_USER_DATA = {
  _id: "18387172983712908371290",
  usersnowflake: "24234798273498279048",
  role: "Member",
  reports: [],
  commands: 0
}

export const DEFAULT_TRANSCRIPT = {
  "modmailId": "32e90379-5d16-4b75-a4dd-6ac6d5ce6ea1",
  "sendersnowflake": "997041131550416926",
  "attachments": [],
  "createdat": "2024-12-08T11:34:48.901Z",
  "GuildSnowflake": "569929112932712469",
  "messagecontent": "did kurt get banned or did he leave",
  "transcripttype": "Modmail",
  "comment": false
}

export class Transcripts {
  
  messages: Transcript[];
  mailId: string;
  type: string;

  constructor(transcripts: Transcript[]) {

    this.messages = transcripts

    if (transcripts.length > 0) {
      this.mailId = transcripts[0].modmailId;
      this.type = transcripts[0].transcripttype;
    } else {
      this.mailId = ""
      this.type = ""
    }
    
  }

  // Returns the amount of messages in the transcript
  messageCount() {
    return this.messages.length;
  }

  // Returns the latest message
  getLatestMessage() {

    return this.messages.reduce((a, b) => {
      return new Date(a.createdat) > new Date(b.createdat) ? a : b
    })

  }

  // Returns a list of ids of all participants
  participants() {

    return this.messages.map(item => item.sendersnowflake)
      .filter((value, index, self) => self.indexOf(value) === index)

  }


}

export type RoleResponse = {
  id: string;
  position: number;
  name: string;
  managed: boolean;
  permissions: string;
  color: number;
  hoist: boolean;
  icon: string;
  unicode_emoji: string;
  mentionable: boolean;
}

export type EmojiResponse = {
  name : string;
  roles: string[];
  id : string;
  require_colons: boolean;
  managed : boolean;
  animated : boolean;
  available : boolean;
}

export type UserResponse = {
  id : string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  accent_color: number;
  global_name: string;
  avatar_decoration_data: number | null;
  banner_color: string;
  clan: string | null;
  mfa_enabled: boolean;
  locale: string;
  premium_type: number;
  email: string;
  verified: boolean;
  data: UserData;
}

export const DEFAULT_USER_RESPONSE : UserResponse = {
  "id": "393165866285662208",
  "username": "loading",
  "avatar": "",
  "discriminator": "0",
  "public_flags": 4194432,
  "flags": 4194432,
  "banner": "a_32d04e60db0f40a3b553ce4011064c21",
  "accent_color": 7686470,
  "global_name": "Loading...",
  "avatar_decoration_data": null,
  "banner_color": "#754946",
  "clan": null,
  "mfa_enabled": true,
  "locale": "en-US",
  "premium_type": 2,
  "email": "loading@gmail.com",
  "verified": true,
  "data": DEFAULT_USER_DATA
}

export type GuildResponseStripped = {
  id: string;
  name: string;
  icon: string;
  banner: string | null;
  owner: boolean;
  permissions: number;
  permissions_new: string;
  features: string[];
}

export const DEFAULT_GUILD_RESP_STRIPPED : GuildResponseStripped = {
  "id": "956600649536114759",
  "name": "Loading...",
  "icon": "389529dd78c55a6ddb6f1111861ac43e",
  "banner": null,
  "owner": false,
  "permissions": 2147483647,
  "permissions_new": "2251799813685247",
  "features": []
}

export type GuildResponse = {
  id : string;
  name : string;
  icon : string;
  description: string;
  splash : string;
  discovery_splash : string;
  approximate_member_count : number;
  approximate_presence_count : number;
  features : string[];
  emojis : EmojiResponse[]
  banner : string;
  owner_id : string;
  application_id : string;
  region : string;
  afk_channel_id : string;
  data: Guild;
  afk_timeout : number;
  system_channel_id : string;
  widget_enabled : boolean;
  widget_channel_id : string;
  verification_level : number;
  roles: RoleResponse[];
  default_message_notifications : number;
  mfa_level : number;
  explicit_content_filter : number;
  max_presences : number;
  max_members : number;
  max_video_channel_users : number;
  vanity_url_code : string;
  premium_tier: number;
  premium_subscription_count : number;
  system_channel_flags : number;
  preferred_locale : string;
  rules_channel_id : string;
  public_updates_channel_id : string;
  safety_alerts_channel_id : string;
}

export type TranscriptsResponse = {
  modmailId: string;
  transcripttype: string;
  GuildSnowflake: string;
  participants: string[];
  date: string;
}

export const DEFAULT_TRANSCRIPT_RESPONSE : TranscriptsResponse = {
  "modmailId": "dfc39eea-96c6-4173-be67-3e895fdd23a7",
  "transcripttype": "Jail",
  "GuildSnowflake": "569929112932712469",
  "participants": [
  ],
  "date": "2024-11-25T16:46:13.648Z"
}
export const EMPTY_GUILD_RESPONSE : GuildResponse = {
  "id": "",
  "name": "Select a Guild...",
  "icon": "",
  "description": "description",
  "splash": "75610b05a0dd09ec2c3c7df9f6975ea0",
  "discovery_splash": "null",
  "data" : {
    "_id": "",
    "guildsnowflake": "",
    "premium": false,
    "moderators": [],
    "ownerid": ""
  },
  "approximate_member_count": 2,
  "approximate_presence_count": 2,
  "features": [
  ],
  "emojis": [
  ],
  "banner": "5c3cb8d1bc159937fffe7e641ec96ca7",
  "owner_id": "53908232506183680",
  "application_id": "null",
  "region": "null",
  "afk_channel_id": "null",
  "afk_timeout": 300,
  "system_channel_id": "null",
  "widget_enabled": true,
  "widget_channel_id": "639513352485470208",
  "verification_level": 0,
  "roles": [
  ],
  "default_message_notifications": 1,
  "mfa_level": 0,
  "explicit_content_filter": 0,
  "max_presences": 1000,
  "max_members": 250000,
  "max_video_channel_users": 25,
  "vanity_url_code": "no",
  "premium_tier": 0,
  "premium_subscription_count": 0,
  "system_channel_flags": 0,
  "preferred_locale": "en-US",
  "rules_channel_id": "null",
  "public_updates_channel_id": "null",
  "safety_alerts_channel_id": "null"
}



export const DEFAULT_GUILD_RESPONSE : GuildResponse = {
  "id": "2909267986263572999",
  "name": "Select a guild...",
  "icon": "",
  "description": "loading",
  "splash": "75610b05a0dd09ec2c3c7df9f6975ea0",
  "discovery_splash": "null",
  "data" : {
    "_id": "672edb7cf91bbfa776751b1b",
    "guildsnowflake": "956600649536114759",
    "premium": false,
    "moderators": [],
    "ownerid": "1028093052851597413"
},
  "approximate_member_count": 2,
  "approximate_presence_count": 2,
  "features": [
    "INVITE_SPLASH",
    "VANITY_URL",
    "COMMERCE",
    "BANNER",
    "NEWS",
    "VERIFIED",
    "VIP_REGIONS"
  ],
  "emojis": [
    {
      "name": "ultrafastparrot",
      "roles": [],
      "id": "393564762228785161",
      "require_colons": true,
      "managed": false,
      "animated": true,
      "available": true
    }
  ],
  "banner": "5c3cb8d1bc159937fffe7e641ec96ca7",
  "owner_id": "53908232506183680",
  "application_id": "null",
  "region": "null",
  "afk_channel_id": "null",
  "afk_timeout": 300,
  "system_channel_id": "null",
  "widget_enabled": true,
  "widget_channel_id": "639513352485470208",
  "verification_level": 0,
  "roles": [
    {
      "id": "2909267986263572999",
      "name": "@everyone",
      "permissions": "49794752",
      "position": 0,
      "color": 0,
      "hoist": false,
      "managed": false,
      "mentionable": false,
      "unicode_emoji": "✅",
      "icon": "icon"
    }
  ],
  "default_message_notifications": 1,
  "mfa_level": 0,
  "explicit_content_filter": 0,
  "max_presences": 1000,
  "max_members": 250000,
  "max_video_channel_users": 25,
  "vanity_url_code": "no",
  "premium_tier": 0,
  "premium_subscription_count": 0,
  "system_channel_flags": 0,
  "preferred_locale": "en-US",
  "rules_channel_id": "null",
  "public_updates_channel_id": "null",
  "safety_alerts_channel_id": "null"
}

export const USE_HTTPS = process.env.USE_HTTPS === "true"
export const API_BASE_URL = process.env.UNITY_BASE_URI? `http${(USE_HTTPS? 's': '')}://${process.env.UNITY_BASE_URI}` : `http${(USE_HTTPS? 's': '')}://localhost:3000`
export const STATUS_SITE_URL = process.env.STATUS_SITE ?? `http${(USE_HTTPS? 's': '')}://localhost:3051/dashboard/3`
export const SITE_TITLE = process.env.SITE_TITLE ?? "ARC UNITY"
export const SITE_DESCRIPTION_META = process.env.SITE_DESCRIPTION_META?? "Arc unity dashboard dev version"
export const SITE_DESCRIPTION = process.env.SITE_DESCRIPTION?? `Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.`
export const SITE_HERO_IMAGE = process.env.SITE_HERO_IMAGE?? "https://shadcnblocks.com/images/block/placeholder-1.svg"