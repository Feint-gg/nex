import { PlatformId, RiotAPITypes } from "@fightmegg/riot-api";
import { platform } from "os";
import { riot } from "./riot";

export async function getSummonerByName(name: string, region: string) {
    let platform: RiotAPITypes.LoLRegion;

    switch (region) {
        case "euw":
            platform = PlatformId.EUW1;
            break;
        case "eune":
            platform = PlatformId.EUNE1;
            break;
        case "na":
            platform = PlatformId.NA1;
            break;
        case "jp":
            platform = PlatformId.JP1;
            break;
        case "kr":
            platform = PlatformId.KR;
            break;
        case "la":
            platform = PlatformId.LA1;
            break;
        case "oce":
            platform = PlatformId.OC1;
            break;

        default:
            throw new Error(`Unknown region: ${region}`);
    }
    
    const summoner = riot.summoner.getBySummonerName({
        summonerName: name,
        region: platform
    })

    return summoner;
}

export async function getRankedInfo(id: string, region: string) {
    const rankedInfo = await riot.league.getEntriesBySummonerId({
        summonerId: id,
        region: PlatformId.NA1
    })

    return rankedInfo;
}