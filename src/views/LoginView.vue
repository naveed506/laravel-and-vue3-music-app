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
              label="Email"
              :labelColor="false"
              placeholder="example@...com"
              v-model:input="email"
              inputType="text"
              :error="errors.email ? errors.email[0] : ''"
            />
            <TextInput
              label="Password"
              :labelColor="false"
              placeholder="....."
              v-model:input="password"
              inputType="password"
              :error="errors.password ? errors.password[0] : ''"
            />
            <span class="text-red-500">This is an error message </span>
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
            >
              Register
            </button>
          </div>
        </div>
        <p class="text-center text-md text-gray-900">
          Don't have an account?
          <router-link
            to="register"
            class="text-blue-500 no-underline hover:underline"
            >Register</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import TextInput from "../components/global/TextInput.vue";
import { ref } from "vue";
let errors = ref([]);
let email = ref(null);
let password = ref(null);
</script>
<style lang="scss">
</style>