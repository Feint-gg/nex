import { useRouter } from "next/router";

export default function Multi() {
    const router = useRouter();
    const { region, summoners } = router.query;

    return (
        <div>

        </div>
    )
}