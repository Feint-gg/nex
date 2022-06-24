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
        case 4:
            return "SummonerFlash";
        case 12:
            return "SummonerTeleport";
        case 13:
            return "SummonerHaste";
        case 14:
            return "SummonerClairvoyance";
        case 21:
            return "SummonerBarrier";
        case 3:
            return "SummonerExhaust";
        case 1:
            return "SummonerBoost";
        case 11:
            return "SummonerSmite";
        case 7:
            return "SummonerHeal";
        case 2:
            return "SummonerMana";
        case 6:
            return "SummonerDot";
        default:
            return "";
    }
}