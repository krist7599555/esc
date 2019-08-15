<template>
  <div>
    <TheNavigationBar />
    <div style="padding-top: 50px">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TheNavigationBar from "@/components/TheNavigationBar";
export default {
  components: { TheNavigationBar }
};
</script>
