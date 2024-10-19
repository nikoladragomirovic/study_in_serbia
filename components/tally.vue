<template>
  <div class="container">
    <iframe
      :data-tally-src="tallyUrl"
      width="100%"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      title="Study in Serbia"
    ></iframe>
  </div>
</template>

<script setup lang="js">
const props = defineProps({ userId: String });
const config = useRuntimeConfig();

const tallyUrl = `${config.public.tallyUrl}&user_id=${props.userId}`;

onMounted(() => {
  var d = document,
    w = "https://tally.so/widgets/embed.js",
    v = function () {
      "undefined" != typeof Tally
        ? Tally.loadEmbeds()
        : d
            .querySelectorAll("iframe[data-tally-src]:not([src])")
            .forEach(function (e) {
              e.src = e.dataset.tallySrc;
            });
    };
  if ("undefined" != typeof Tally) v();
  else if (d.querySelector('script[src="' + w + '"]') == null) {
    var s = d.createElement("script");
    (s.src = w), (s.onload = v), (s.onerror = v), d.body.appendChild(s);
  }
});
</script>

<style scoped>
.container {
  width: 30%;
  min-width: 300px;
  margin-right: auto;
  margin-left: auto;
}
</style>
