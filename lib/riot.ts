import { RiotAPI } from "@fightmegg/riot-api"

const key = process.env.RIOT_API_KEY;

if (!key) {
    throw new Error("Missing RIOT_API_KEY environment variable");
}

export const riot = new RiotAPI(key)