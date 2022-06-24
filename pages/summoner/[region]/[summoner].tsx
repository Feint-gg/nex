import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { getMatchIdsByPUUID, recentMatches } from "../../../lib/match";
import { getRankedInfo, getSummonerByName } from "../../../lib/summoner";
import Image from 'next/image'
import { upperFirstLetter } from "../../../lib/utils";
import { useState } from "react";
import { getColorFromDivision } from "../../../lib/rank";
import ThemedBackground from "../../../components/Gradient";

export default function Summoner({ summoner, matches, info }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    if (!summoner) {
        return <div>Loading...</div>;
    }

    const theme = getColorFromDivision(info[0].tier)

    return (
        <div className="max-w-6xl mx-auto px-5 py-10">
            <ThemedBackground backgroundColor={theme} />
            <div className="flex gap-x-2">
                <img className="rounded-full border-2" height={70} width={70} src={`https://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/${summoner.icon}.png`} />
                <div className="flex flex-col">
                    <div className="text-2xl font-semibold">{summoner.name}</div>
                    <div className="text-mute">{summoner.level}</div>
                </div>
            </div>
            <div className="flex pt-5 gap-5">
               <div className="flex flex-col gap-5">
                    {info.map((rank: any) => (
                        <div key={rank.queueType} className="flex gap-5 rounded border bg-primary-100 p-3">
                            <div>
                                <Image height={50} width={50} src={`/ranks/${rank.tier.toLowerCase()}.webp`} />
                            </div>
                            <div>
                                <div style={{ color: getColorFromDivision(rank.tier) }}>{upperFirstLetter(rank.tier)} {rank.rank}</div>
                                <div className="text-sm">{rank.leaguePoints} LP</div>
                                <div>{rank.wins}W {rank.losses}L {Math.round(rank.wins / (rank.wins + rank.losses) * 100)}%</div>
                            </div>
                        </div>
                    ))}
                </div> 
                <div className="flex flex-col gap-5">
                    {matches.map((match: any) => (
                        <div key={match.gameId} className="flex flex-col gap-5 rounded border bg-primary-100 p-3">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/12.11.1/img/champion/${"ok"}.png`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    if (!context.params) {
        return { props: {}, revalidate: 1 };
    }
    
    const { region, summoner } = context.params;
    
    if (typeof summoner !== "string") {
        return { props: {}, revalidate: 1 };
    }

    const summ = await getSummonerByName(summoner, "na")
    if (!summ) {
        return { props: {}, revalidate: 1 };
    }

    const rankedInfo = await getRankedInfo(summ.id, "na");

    const matches = await recentMatches(summ.puuid);
    if (!matches) {
        return { props: {}, revalidate: 1 };
    }
    
    return {
        props: {
            matches: matches.map((match) => {
                return {
                    gameDuration: match.info.gameDuration,
                    gameEnd: ((match.info) as any).gameEndTimestamp,
                    gameId: match.info.gameId,
                    queueId: match.info.queueId,
                    me: match.info.participants.find((p) => p.summonerId === summ.id),
                    participants: match.info.participants.map((participant) => {
                        return {
                            championId: participant.championId,
                            name: participant.summonerName,
                        }
                    }),
                }
            }),
            summoner: {
                name: summ.name,
                icon: summ.profileIconId,
                level: summ.summonerLevel,
            },
            info: rankedInfo.map((info) => {
                return {
                    tier: info.tier,
                    rank: info.rank,
                    queue: info.queueType,
                    lp: info.leaguePoints,
                    wins: info.wins,
                    losses: info.losses,

                }
            })
        }
    }
}