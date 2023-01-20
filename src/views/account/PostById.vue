<template>
  <div class="container mx-auto max-w-4xl py-6 px-3">
    <div class="text-gray-900 text-xl">Post By Id</div>
    <div class="bg-green-500 w-full h-1 mb-4"></div>

    <div class="mx-auto">
      <div class="my-4">
        <div class="flex items-center py-2">
          <img
            src="https://via.placeholder.com/50"
            class="rounded-full"
            width="50"
          />

          <div class="ml-2 font-bold text-2xl">Post Name</div>
        </div>
        <img class="w-full" src="https://via.placeholder.com/800" alt="" />
        <div class="p-4">
          <p class="text-3xl font-bold hover:text-gray-700 pb-4">Post Title</p>
          <p class="py-2 text-lg">Event Location: Post Location</p>
          <p class="pb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sed
            adipisci repellat iusto. Labore dolores, ea odit fugit quia veniam
            blanditiis eum recusandae? Vel natus velit quisquam sunt, numquam
            odit.
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center p-2">
        <v-pagination class="p-10" active-color="#337aff" />
      </div>
    </div>
  </div>
</template>

