<template>
  <div>
    <button
      @click="open = !open"
      class="
        bg-transparent
        hover:bg-green-400
        text-white
        font-semibold
        hover:text-white
        py-1
        px-2
        hover:border-transparent
        rounded
      "
    >
      <i class="fa-solid fa-bars fa-xl"></i>
    </button>

    <div
      v-show="open"
      class="
        animated
        slideInDown
        faster
        fixed
        w-full
        h-full
        top-0
        left-0
        flex
        justify-center
        backdrop-blur-sm
      "
    >
      <div class="bg-black absolute w-full h-full opacity-75"></div>
      <div class="my-auto fixed border-white w-80 pt-16">
        <p class="text-2xl text-center text-white font-bold">Menu</p>
        <RouterLinkButton
          v-if="!userStore.id"
          @click="open = !open"
          class="w-full text-gray-100 text-center text-lg mt-2"
          btnText="Login"
          color="green"
          url="login"
        />

        <RouterLinkButton
          v-if="!userStore.id"
          @click="open = !open"
          class="w-full text-gray-100 text-center text-lg mt-2"
          btnText="Register"
          color="green"
          url="register"
        />

        <RouterLinkButton
          v-if="!userStore.id"
          @click="open = !open"
          class="w-full text-gray-100 text-center text-lg mt-2"
          btnText="Profile"
          color="green"
          :url="'/account/profile/' + userStore.id"
        />
        <RouterLinkButton
          v-if="userStore.id"
          @click="open = !open"
          class="w-full text-gray-100 text-center text-lg mt-2"
          btnText="Posts"
          color="green"
          :url="'/account/profile/' + userStore.id"
        />
        <RouterLinkButton
          v-if="userStore.id"
          class="w-full text-gray-100 text-center text-lg mt-2"
          btnText="LogOut"
          color="green"
          @click="logout"
        />
        <RouterLinkButton
          @click="open = !open"
          class="w-full text-gray-100 text-center text-lg mt-4"
          btnText="Close"
          color="red"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import RouterLinkButton from "../global/RouterLinkButton.vue";
import { useUserStore } from "../../store/user-store";
import { usePostStore } from "../../store/post-store";
import { useVideoStore } from "../../store/video-store";
import { useProfileStore } from "../../store/profile-store";
import { useSongStore } from "../../store/song-store";
import axios from "axios";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const postStore = usePostStore();
const videoStore = useVideoStore();
const profileStore = useProfileStore();
const songStore = useSongStore();
const router = useRouter();
let open = ref(false);

const logout = async () => {
  try {
    let res = await axios.post("api/logout", {
      user_id: userStore.id,
    });
    console.log(res.data);
    userStore.clearUser();
    profileStore.clearProfile();
    songStore.clearSongs();
    postStore.clearPosts();
    videoStore.clearVideos();
    router.push("/");
  } catch (err) {
    console.log(err);
  }
};
</script>