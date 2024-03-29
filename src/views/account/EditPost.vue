<template>
  <div id="EditPost" class="container max-w-4xl mx-auto pt-20 pb-20 px-6">
    <div class="text-gray-900 text-xl">Edit Post</div>
    <div class="bg-green-500 w-full h-1"></div>

    <!-- Cropper Modal -->
    <CropperModal
      v-if="showModal"
      :minAspectRatioProp="{ width: 16, height: 9 }"
      :maxAspectRatioProp="{ width: 16, height: 9 }"
      @croppedImageData="setCroppedImageData"
      @showModal="showModal = false"
    />

    <div class="flex flex-wrap mt-4 mb-6">
      <!-- First Name -->
      <div class="w-full md:w-1/2 px-3">
        <TextInput
          label="Title"
          placeholder="Awesome concert"
          inputType="text"
          v-model:input="title"
          :error="errors.title ? errors.title[0] : ''"
        />
      </div>
      <!-- Last Name -->
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

    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full md:w-1/2 px-3">
        <DisplayCropperButton
          label="Post Image"
          btnText="Update Post Image"
          @showModal="showModal = true"
        />
      </div>
    </div>

    <!-- Cropped Image -->
    <div class="flex flex-wrap mt-4 mb-6">
      <div class="w-full px-3">
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
        <SubmitFormButton btnText="Update Post" @click="updatePost" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TextInput from "@/components/global/TextInput.vue";
import DisplayCropperButton from "@/components/global/DisplayCropperButton.vue";
import TextArea from "@/components/global/TextArea.vue";
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import CropperModal from "@/components/global/CropperModal.vue";
import CroppedImage from "@/components/global/CroppedImage.vue";
import axios from "axios";
import { usePostStore } from "../../store/post-store";
import { useUserStore } from "@/store/user-store";
import { useRoute } from "vue-router";
import Swal from "@/sweetalert2";
import { useRouter } from "vue-router";

const route = useRoute();
const postStore = usePostStore();
const userStore = useUserStore();
const router = useRouter();

let showModal = ref(false);
let title = ref(null);
let location = ref(null);
let description = ref(null);
let imageData = null;
let image = ref(null);
let errors = ref([]);

const setCroppedImageData = (data) => {
  imageData = data;
  image.value = data.imageUrl;
};

onMounted(async () => {
  getPostById();
});

const getPostById = async () => {
  try {
    let res = await axios.get("api/posts/" + route.params.id);
    title.value = res.data.title;
    location.value = res.data.location;
    image.value = postStore.postImage(res.data.image);
    description.value = res.data.description;
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};

const updatePost = async () => {
  errors.value = [];
  if (imageData === null) {
    Swal.fire(
      "No cropped image found?",
      "Please crop an image of your choice and complete all other inputs",
      "warning"
    );
    return null;
  }
  let data = new FormData();

  data.append("title", title.value || "");
  data.append("location", location.value || "");
  data.append("description", description.value || "");

  if (imageData) {
    data.append("user_id", userStore.id || "");
    data.append("image", imageData.file || "");
    data.append("height", imageData.height || "");
    data.append("width", imageData.width || "");
    data.append("left", imageData.left || "");
    data.append("top", imageData.top || "");
  }
  try {
    await axios.post("api/posts/" + route.params.id + "?_method=PUT", data);
    Swal.fire(
      "post updated!",
      'The post you updated was called "' + title.value + '"',
      "success"
    );
    await postStore.fetchPostsByUserId(userStore.id);

    router.push("/account/profile/" + userStore.id);
  } catch (err) {
    errors.value = err.response.data.errors;
  }
};
</script>

<style lang="scss" scoped></style>






