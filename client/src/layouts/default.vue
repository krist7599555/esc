<template>
  <div>
    <TheNav></TheNav>
    <slot></slot>
  </div>
</template>

<script>
import TheNav from "@/components/TheNavigationBar";
export default {
  components: { TheNav }
};
</script>
