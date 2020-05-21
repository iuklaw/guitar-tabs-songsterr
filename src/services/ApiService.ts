export type Query = string

export type TabType = "PLAYER" | "TEXT_GUITAR_TAB" | "CHORDS" | "TEXT_BASS_TAB"

export type Artist = Readonly<{
    id: number
    name: string
    nameWithoutPrefix: string
    type: string
    useThePrefix: boolean
}>

export type Tab = Readonly<{
    artist: Artist
    chordsPresent: boolean
    id: number
    tabTypes: ReadonlyArray<TabType>
    title: string,
    type: string
}>

class ApiService {

    private async searchByArtist(query: Query) {
        const data = await fetch(`https://www.songsterr.com/a/ra/songs/byartists.json?artists="${encodeURIComponent(query)}"`)
        const artistTabs: ReadonlyArray<Tab> = await data.json()
        return artistTabs
    }

    private async searchBySong(query: Query) {
        const data = await fetch(`https://www.songsterr.com/a/ra/songs.json?pattern=${query}`)
        const songTabs: ReadonlyArray<Tab> = await data.json()
        return songTabs
    }

    public async getTabs(query: Query): Promise<ReadonlyArray<Tab>> {
        const [
            songResult,
            artistResult,
        ] = await Promise.all([
            this.searchBySong(query),
            this.searchByArtist(query),
        ])

        const uniqueData = new Map<Tab['id'], Tab>()

        for (const result of [...songResult, ...artistResult]) {
            uniqueData.set(result.id, result)
        }

        return Array.from(uniqueData.values())
    }
}


export default new ApiService()
