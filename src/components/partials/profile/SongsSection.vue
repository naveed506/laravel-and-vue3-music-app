<template>
  <div>
    <div class="mx-auto py-4">
      <div class="flex flex-wrap font-bold text-gray-100">
        <div class="text-gray-900 text-xl">Songs</div>
        <div class="bg-green-500 w-full h-1"></div>

        <div class="w-full mt-4">
          <RouterLinkButton
            v-if="userStore.id == route.params.id"
            class="ml-2"
            btnText="Delete Song"
            color="red"
            url="/account/delete-song"
          />
          <RouterLinkButton
            btnText="Add Song"
            color="green"
            url="/account/add-song"
          />
        </div>
      </div>
    </div>

    <div class="pb-4">
      <SongPlayer />
    </div>
  </div>
</template>

<script setup>
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";
import SongPlayer from "./SongPlayer.vue";
import { useUserStore } from "@/store/user-store";
import { useSongStore } from "@/store/song-store";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const userStore = useUserStore();
const songStore = useSongStore();
const route = useRoute();

onMounted(async () => {
  await songStore.fetchSongsByUserId(route.params.id);
});
</script>
