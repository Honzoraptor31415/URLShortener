<script lang="ts">
  export let code: Number;
  export let message: String;
</script>

<svelte:head>
  <title>Error {code}</title>
</svelte:head>

<header>
  <div class="error-wrp">
    <h1>Error {code}</h1>
    <p class="message">{message}</p>
  </div>
</header>
