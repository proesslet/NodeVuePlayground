<template>
  <div id="about">
    <p>This is my about page.</p>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
#about {
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
