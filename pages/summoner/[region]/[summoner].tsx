import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { recentMatches } from "../../../lib/match";
import { getRankedInfo, getSummonerByName } from "../../../lib/summoner";
import Image from "next/image";
import {
  formatTime,
  getSummonerSpell,
  upperFirstLetter,
} from "../../../lib/utils";
import { getColorFromDivision } from "../../../lib/rank";
import ThemedBackground from "../../../components/Gradient";
import Link from "next/link";
import { ArrowDownIcon } from '@radix-ui/react-icons'

export default function Summoner({
  summoner,
  matches,
  info,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (!summoner) {
    return <div>Loading...</div>;
  }

  const theme = getColorFromDivision(info[0].tier);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <ThemedBackground backgroundColor={theme} />
      <div className="flex gap-x-2">
        <img
          className="rounded-full border-2"
          height={70}
          width={70}
          src={`https://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/${summoner.icon}.png`}
        />
        <div className="flex flex-col">
          <div className="text-2xl font-semibold">{summoner.name}</div>
          <div className="text-mute">{summoner.level}</div>
        </div>
      </div>
      <div className="flex pt-5 gap-5">
        <div className="flex flex-col gap-5">
          {info.map((rank) => (
            <div
              key={rank.queue}
              className="flex gap-5 rounded border bg-primary-100 p-3"
            >
              <div>
                <Image
                  height={50}
                  width={50}
                  src={`/ranks/${rank.tier.toLowerCase()}.webp`}
                />
              </div>
              <div>
                <div style={{ color: getColorFromDivision(rank.tier) }}>
                  {upperFirstLetter(rank.tier)} {rank.rank}
                </div>
                <div className="text-sm">{rank.lp} LP</div>
                <div>
                  {rank.wins}W {rank.losses}L{" "}
                  {Math.round((rank.wins / (rank.wins + rank.losses)) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          {matches.map((match) => (
            <div
              key={match.gameId}
              className="flex items-center gap-5 rounded border bg-primary-100 p-3"
            >
              <div className="flex flex-col mb-auto">
                <div className="">Ranked Solo</div>
                <div className="text-sm">
                  {new Date(match.gameEnd as number).toDateString()}
                </div>
                <div>{match.me.win ? "Victory" : "Defeat"}</div>
                <div>{formatTime(match.gameDuration)}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <div>
                    <img
                      width={40}
                      src={`https://ddragon.leagueoflegends.com/cdn/12.11.1/img/champion/${match.me.championName}.png`}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <img
                      width={15}
                      src={`http://ddragon.leagueoflegends.com/cdn/12.11.1/img/spell/${getSummonerSpell(
                        match.me.summoner1Id
                      )}.png`}
                    />
                    <img
                      width={15}
                      src={`http://ddragon.leagueoflegends.com/cdn/12.11.1/img/spell/${getSummonerSpell(
                        match.me.summoner2Id
                      )}.png`}
                    />
                  </div>
                  <div className="text-sm px-2">
                    {match.me.kills}/{match.me.deaths}/{match.me.assists}
                  </div>
                  <div className="ml-auto gap-2 flex">
                    <img
                      className="border rounded-full"
                      width={25}
                      src={`http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/${match.me.ward}.png`}
                    />
                  </div>
                </div>
                <div className="flex gap-1">
                  {match.me.items.map((item) => {
                    if (item === 0) {
                      return (
                        <div
                          style={{ width: "25px", height: "25px" }}
                          className="border rounded"
                        />
                      );
                    }

                    return (
                      <img
                        className="border rounded"
                        width={25}
                        src={`http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/${item}.png`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div>{match.me.kp}%</div>
                <div>Control Wards {match.me.pinkWards}</div>
                <div>
                  CS {match.me.cs} (
                  {Math.round((match.me.cs / (match.gameDuration / 60)) * 10) /
                    10}
                  )
                </div>
                <div>Wards {match.me.wards}</div>
              </div>
              <div className="flex flex-col ml-auto">
                {match.allies.map((ally) => (
                  <Link
                    href={`/summoner/${
                      router.query.region
                    }/${ally.name}`}
                  >
                    <a className="flex gap-1 items-center hover:text-blue-500">
                      <img
                        width={20}
                        src={`https://cdn.communitydragon.org/latest/champion/${ally.championId}/square`}
                      />
                      <div>{ally.name}</div>
                    </a>
                  </Link>
                ))}
              </div>
              <div className="flex flex-col ml-auto">
                {match.enemies.map((enemy) => (
                  <Link
                    href={`/summoner/${
                      router.query.region
                    }/${enemy.name}`}
                  >
                    <a className="flex gap-1 hover:text-blue-500 items-center">
                      <img
                        width={20}
                        src={`https://cdn.communitydragon.org/latest/champion/${enemy.championId}/square`}
                      />
                      <div>{enemy.name}</div>
                    </a>
                  </Link>
                ))}
              </div>
              <div className="ml-auto">
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  if (!context.params) {
    return { props: {}, revalidate: 1 };
  }

  const { region, summoner } = context.params;

  if (typeof summoner !== "string") {
    return { props: {}, revalidate: 1 };
  }

  const summ = await getSummonerByName(summoner, "na");
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
        const me = match.info.participants.find(
          (p) => p.summonerId === summ.id
        );

        if (!me) {
          throw new Error("Could not find me in match");
        }

        const myTeam = match.info.teams.find((t) => t.teamId === me.teamId);

        if (!myTeam) {
          throw new Error("Could not find my team");
        }

        const enemies: { championId: number; name: string }[] = [];
        const allies: { championId: number; name: string }[] = [];

        match.info.participants.forEach((p) => {
          if (p.teamId === myTeam.teamId) {
            allies.push({
              championId: p.championId,
              name: p.summonerName,
            });
          } else {
            enemies.push({
              championId: p.championId,
              name: p.summonerName,
            });
          }
        });

        return {
          gameDuration: match.info.gameDuration,
          gameEnd: (match.info as any).gameEndTimestamp,
          gameId: match.info.gameId,
          queueId: match.info.queueId,
          type: match.info.gameType,
          me: {
            win: me.win,
            kills: me.kills,
            deaths: me.deaths,
            assists: me.assists,
            championName: me.championName,
            summoner1Id: me.summoner1Id,
            summoner2Id: me.summoner2Id,
            summonerId: me.summonerId,
            items: [me.item0, me.item1, me.item2, me.item3, me.item4, me.item5],
            ward: me.item6,
            cs: me.totalMinionsKilled + me.neutralMinionsKilled,
            kp: me.kills / myTeam.objectives.champion.kills,
            pinkWards: me.visionWardsBoughtInGame,
            wards: me.wardsPlaced,
          },
          allies: allies,
          enemies: enemies,
        };
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
        };
      }),
    },
  };
}
