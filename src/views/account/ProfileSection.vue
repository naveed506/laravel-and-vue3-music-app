<template>
  <div class="container max-w-4xl mx-auto flex">
    <div class="w-1/3">
      <img
        class="w-full rounded-lg h-auto shadow-lg"
        :src="profileStore.image"
        alt="profile-pic"
      />
    </div>
    <div class="w-full pl-4">
      <div class="flex">
        <div class="w-1/2">
          <h1 class="text-2xl md:text-4xl test-left text-gray-900">
            {{ profileStore.firstName }} {{ profileStore.lastName }}
          </h1>
          <span class="text-md text-gray-700">
            <i
              ><b>{{ profileStore.location }}</b></i
            >
          </span>
        </div>
        <div class="w-1/2 mt-2">
          <RouterLinkButton
            v-if="userStore.id == route.params.id"
            btnText="Edit Profile"
            color="green"
            url="/account/edit-profile"
          />
        </div>
      </div>
      <ProfileInfoSection />
      <ProfileAboutSection />
      <YoutubeVideosSection />
    </div>
  </div>
  <SongsSection />
  <PostSection />
</template>
<script setup>
import ProfileInfoSection from "@/components/partials/profile/ProfileInfoSection.vue";
import ProfileAboutSection from "@/components/partials/profile/ProfileAboutSection.vue";
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";
import SongsSection from "@/components/partials/profile/SongsSection.vue";
import YoutubeVideosSection from "@/components/partials/profile/YoutubeVideosSection.vue";
import PostSection from "@/components/partials/profile/PostSection.vue";
import { useUserStore } from "@/store/user-store";
import { useProfileStore } from "@/store/profile-store";
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const profileStore = useProfileStore();
const route = useRoute();

onMounted(async () => {
  await profileStore.fetchProfileById(route.params.id);
});
</script>
<style lang="scss">
</style>
