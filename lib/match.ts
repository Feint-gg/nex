import { PlatformId } from "@fightmegg/riot-api";
import { riot } from "./riot";

export async function getMatchIdsByPUUID(puuid: string, region: string) {
    const matches = await riot.matchV5.getIdsbyPuuid({
        puuid: puuid,
        cluster: PlatformId.AMERICAS,
        params: {
            count: 10
        }
    })

    return matches;
}

export async function recentMatches(puuid: string) {
    const matches = await getMatchIdsByPUUID(puuid, "euw");

    let populatedMatches = [];

    for (const match of matches) {
        const matchDetails = await riot.matchV5.getMatchById({
            matchId: match,
            cluster: PlatformId.AMERICAS
        });

        populatedMatches.push(matchDetails);
    }

    return populatedMatches;
}