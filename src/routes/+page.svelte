<script>
  let url = "";
  function submit() {
    console.log("Submit");
  }
</script>

<header class="main-header">
  <div class="header-content">
    <h1 class="main-heading">Paste your URL 🔗!</h1>
    <form
      class="form"
      on:submit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div class="form-element">
        <label for="url">Your URL</label>
        <input
          bind:value={url}
          type="url"
          id="url"
          class="rounded-input"
          placeholder="goes here!"
        />
      </div>
      <div class="submit-wrp">
        <button class="submit rounded-input" type="submit">Shorten!</button>
      </div>
    </form>
  </div>
</header>
