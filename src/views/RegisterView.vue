<template>
  <div id="Register">
    <div class="w-full p-6 flex justify-center items-center">
      <div class="w-full max-w-xs">
        <div class="bg-black p-8 shadow rounded mb-6">
          <h1 class="mb-6 text-lg text-gray-100 font-thin">
            Let's get rocking
          </h1>
          <div class="mb-4">
            <TextInput
              label="First Name"
              :labelColor="false"
              placeholder="Jon"
              v-model:input="firstName"
              inputType="text"
              :error="errors.first_name ? errors.first_name[0] : ''"
            />

            <TextInput
              label="Last Name"
              :labelColor="false"
              placeholder="Doe"
              v-model:input="lastName"
              inputType="text"
              :error="errors.last_name ? errors.last_name[0] : ''"
            />
            <TextInput
              label="Email "
              :labelColor="false"
              placeholder="example@.com"
              v-model:input="email"
              inputType="email"
              :error="errors.email ? errors.email[0] : ''"
            />
            <TextInput
              label="Password "
              :labelColor="false"
              placeholder="....."
              v-model:input="password"
              inputType="password"
              :error="errors.password ? errors.password[0] : ''"
            />
            <TextInput
              label="Confirm Password "
              :labelColor="false"
              placeholder="....."
              v-model:input="confirmPassword"
              inputType="password"
              :error="errors.confirmPassword ? errors.confirmPassword[0] : ''"
            />
            <button
              class="
                block
                w-full
                bg-green-500
                text-white
                rounded-sm
                py-3
                text-sm
                tracking-wide
              "
              type="submit"
              @click="register"
            >
              Register
            </button>
          </div>
        </div>
        <p class="text-center text-md text-gray-900">
          Already have an account?
          <router-link
            to="login"
            class="text-blue-500 no-underline hover:underline"
            >Login</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import TextInput from "../components/global/TextInput.vue";
import { usePostStore } from "../../src/store/post-store";
import { useProfileStore } from "../../src/store/profile-store";
import { useSongStore } from "../../src/store/song-store";
import { useUserStore } from "../../src/store/user-store";
import { useVideoStore } from "../../src/store/video-store";
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
const postStore = usePostStore();
const profileStore = useProfileStore();
const songStore = useSongStore();
const userStore = useUserStore();
const videoStore = useVideoStore();

const router = useRouter();
let errors = ref([]);
let firstName = ref(null);
let lastName = ref(null);
let email = ref(null);
let password = ref(null);
let confirmPassword = ref(null);

const register = async () => {
  errors.value = [];
  try {
    const reg = await axios.post("api/register", {
      email: email.value,
      first_name: firstName.value,
      last_name: lastName.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    });
    axios.defaults.headers.common["Authorization"] = "Bearer " + reg.data.token;
    userStore.setUserDetails(reg);
    await profileStore.fetchProfileById(userStore.id);
    await songStore.fetchSongsByUserId(userStore.id);
    await postStore.fetchPostsByUserId(userStore.id);
    await videoStore.fetchVideosByUserId(userStore.id);
    router.push("/account/profile/" + userStore.id);
  } catch (error) {
    console.log(error.response.data.errors);
    errors.value = error.response.data.errors;
  }
};
</script>
<style lang="scss">
</style>