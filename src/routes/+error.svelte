<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>Error {$page.status}</title>
</svelte:head>

<header>
  <div class="error-wrp">
    <h1>Error {$page.status}</h1>
    <p class="message">{$page.error?.message}</p>
  </div>
</header>
