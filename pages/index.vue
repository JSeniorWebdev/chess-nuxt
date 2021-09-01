<template>
  <div class="main-container">
    <h1>Index page</h1>
  </div>
</template>

<script>
export default {
  middleware({ route, redirect, from }) {
    return redirect("/tests/series");
  },
};
</script>
