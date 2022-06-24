export function getColorFromDivision(division: string) {
    switch (division) {
        case "CHALLENGER":
            return "#FFC107";
        case "GRANDMASTER":
            return "#D32F2F";
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