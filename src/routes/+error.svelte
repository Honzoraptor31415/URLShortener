<script>
  import { page } from "$app/stores";
  import Error from "$lib/components/Error.svelte";
</script>

<Error
  code={$page.status}
  message={$page.error?.message ? $page.error?.message : ""}
/>
