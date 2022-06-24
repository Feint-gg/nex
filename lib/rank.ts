export function getColorFromDivision(division: string) {
    switch (division) {
        case "CHALLENGER":
            return "#FFC107";
        case "GRANDMASTER":
            return "#EC423C";
        case "MASTER":
            return "#1976D2";
        case "DIAMOND":
            return "#E3F2FD";
        case "PLATINUM":
            return "#E3F2FD";
        case "GOLD":
            return "#FFC107";
        case "SILVER":
            return "#BDBDBD";
        case "BRONZE":
            return "#FFC107";
        default:
            return "#FFC107";
    }
}

export function beautifyQueueType(type: string) {
    switch (type) {
        case "RANKED_SOLO_5x5":
            return "Solo Queue";
        case "RANKED_FLEX_SR":
            return "Flex Queue";
        case "RANKED_FLEX_TT":
            return "Flex Queue";
        default:
            return type;
    }
}