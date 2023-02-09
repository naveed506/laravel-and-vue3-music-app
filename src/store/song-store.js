import axios from 'axios'
import { defineStore } from 'pinia'
export const useSongStore = defineStore('song', {
    state: () => ({
        songs: [],
        artistId: null,
        artistName: null

    }),
    actions: {

        async fetchSongsByUserId(userId) {

            let res = await axios.get('api/user/' + userId + '/songs')
            this.artistId = res.data.artist_id,
                this.artistName = res.data.artist_name
            this.$state.songs = res.data.songs
        },
        clearSongs() {
            this.$state.songs = []
            this.$state.artistId = null
            this.$state.artistName = null
        }
    },
    persist: true

}) 