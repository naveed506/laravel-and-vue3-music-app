<template>
  <div id="EditProfile" class="container max-w-4xl mx-auto pt-20 pb-20 px-6">
    <div class="text-gray-900 text-xl">Edit Profile</div>
    <div class="bg-green-500 w-full h-1"></div>

    <!-- Cropper Modal -->
    <CropperModal
      v-if="showModal"
      minAspectRatioProp="{width:8,height:8}"
      maxAspectRatioProp="{width:8,height:8}"
      @croppedImageData="setCroppedImageData"
      @showModal="showModal = false"
    />

    <div class="flex flex-wrap mt-4 mb-6">
      <!-- First Name -->
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="First Name"
          placeholder="First Name"
          inputType="text"
          v-model:input="firstName"
          :error="errors.first_name ? errors.first_name[0] : ''"
        />
      </div>
      <!-- Last Name -->
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Last Name"
          placeholder="Last Name"
          inputType="text"
          v-model:input="lastName"
          :error="errors.last_name ? errors.last_name[0] : ''"
        />
      </div>
    </div>

    <div class="flex flex-wrap mt-4 mb-6">
      <!-- Location -->
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Location"
          placeholder="Lahore, Punjab, Pakistan"
          inputType="text"
          v-model:input="location"
          :error="errors.location ? errors.location[0] : ''"
        />
      </div>
    </div>

    <!-- Profile Image -->
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <DisplayCropperButton
          label="Profile Image"
          btnText="Update Profile Image"
          @showModal="showModal = true"
        />
      </div>
    </div>

    <!-- Cropped Image -->
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <CroppedImage label="Cropped Image" :image="image" />
      </div>
    </div>

    <!-- Description -->
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full px-3">
        <TextArea
          label="Description"
          placeholder="Please enter some information here!"
          v-model:description="description"
          :error="errors.description ? errors.description[0] : ''"
        />
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex flex-wrap mt-8 mb-6">
      <div class="w-full px-3">
        <SubmitFormButton btnText="Update Profile" @click="updateUser" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import TextInput from "@/components/global/TextInput.vue";
import DisplayCropperButton from "@/components/global/DisplayCropperButton.vue";
import TextArea from "@/components/global/TextArea.vue";
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import CropperModal from "@/components/global/CropperModal.vue";
import CroppedImage from "@/components/global/CroppedImage.vue";
import { useUserStore } from "@/store/user-store";

let showModal = ref(false);
let firstName = ref(null);
let lastName = ref(null);
let location = ref(null);
let description = ref(null);
// let imageData = null;
let image = ref(null);
let errors = ref([]);
const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  (firstName.value = userStore.firstName || null),
    (lastName.value = userStore.lastName || null),
    (location.value = userStore.location || null),
    (description.value = userStore.description || null);
  image.value = userStore.image || null;
});

const updateUser = async () => {
  errors.value = [];
  let data = new FormData();
  data.append("first_name", firstName.value || null);
  data.append("last_name", lastName.value || null);
  data.append("location", location.value || null);
  data.append("description", description.value || null);
  try {
    await axios.post("api/users/" + userStore.id + "?_method=PUT", data);

    await userStore.fetchUser();
    console.log(router.push("/account/profile/"));
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};

const setCroppedImageData = (data) => {
  // imageData = data;
  image.value = data.imageUrl;
};
</script>

<style lang="scss" scoped></style>






