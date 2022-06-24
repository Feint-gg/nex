// Make only first letter uppercase
export function upperFirstLetter(str: string): string {
    str = str.toLocaleLowerCase()

    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Format seconds to m : s
export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
}

export function getSummonerSpell(id: number) {
    switch (id) {
        case 21:
            return "SummonerBarrier"
        case 1:
            return "SummonerBoost"
        case 14:
            return "SummonerDot"
        case 3:
            return "SummonerExhaust"
        case 4:
            return "SummonerFlash"
        case 6:
            return "SummonerHaste"
        case 7:
            return "SummonerHeal"
        case 13:
            return "SummonerMana"
        case 30:
            return "SummonerPoroRecall"
        case 31:
            return "SummonerPoroThrow"
        case 11:
            return "SummonerSmite"
        case 39:
            return "SummonerSnowURFSnowball_Mark"
        case 32:
            return "SummonerSnowball"
        case 12:
            return "SummonerTeleport"
        case 54:
            return "Summoner_UltBookPlaceholder"
        case 55:
            return "Summoner_UltBookSmitePlaceholder"
        default:
            return "";
    }
}