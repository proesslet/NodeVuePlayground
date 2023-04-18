<template>
  <div id="home">
    <p>This is my website.</p>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
#home {
  display: flex;
  place-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
}
p {
  color: var(--color-text);
}
</style>
