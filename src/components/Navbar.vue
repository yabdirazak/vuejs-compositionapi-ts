<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <router-link
            class="button"
            to="/post/new"
        >
          New Post
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;
}

.navbar-end {
  justify-content: flex-end;
}

.buttons {

}
.button {
  padding: 4px 8px;
  border: 1px solid #797979;
  cursor: pointer;
  text-decoration: none;
  color: #44474a;
}

</style>
