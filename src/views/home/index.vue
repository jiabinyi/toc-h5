<template>
  <div class="home-container"></div>
</template>
<script lang="ts" setup name="Home">
import { onMounted } from 'vue';
import { useRouteQuery } from '@vueuse/router';
import useTheme from '@/utils/hooks/useTheme';
onMounted(() => {
  const theme = useRouteQuery('theme');
  const { setBodyClassName } = useTheme();
  setBodyClassName(theme.value ?? 'blue');
});
</script>
