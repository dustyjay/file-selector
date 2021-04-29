<template>
  <div class="container">
    <section class="select-button__box">
      <button type="button" class="select-button" @click="showModal = true">
        Select Files
      </button>
      <FileModal
        :file-structure="fileStructure"
        :selectedFiles.sync="selectedFiles"
        :show.sync="showModal"
      />
    </section>
    <br />
    <div class="select-files" v-if="selectedFileNames.length > 0">
      <h4><strong>Files selected</strong></h4>
      <p
        class="first-letter"
        v-for="(name, index) in selectedFileNames"
        :key="index"
      >
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script>
import FileModal from '../components/FileModal.vue';
import { fetchFolders } from '../helpers';
export default {
  components: { FileModal },
  name: 'file-explorer',
  data() {
    return {
      fileStructure: {},
      selectedFiles: [],
      showModal: false
    };
  },
  computed: {
    selectedFileNames() {
      return this.selectedFiles.map(({ name }) => name);
    }
  },
  async created() {
    this.fileStructure = await fetchFolders();
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 7.75rem;
}
.select {
  &-button {
    &__box {
      position: relative;
      z-index: 2;
      display: inline-block;
    }
  }
  &-files {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    padding: 1rem 0.75rem;
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 0.625rem;
    }
  }
}
</style>
