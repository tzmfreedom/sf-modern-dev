<template>
  <div>
    <b-spinner variant="primary" label="Spinning" class="spinner"></b-spinner>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
    }
  },
  methods: {
  },
  props: {
    show: Boolean,
  }
}
</script>

<style scoped>
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
}
.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3rem;
  height: 3rem;
  z-index: 11;
}
</style>
