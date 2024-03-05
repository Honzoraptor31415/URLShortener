<script>
  import { Databases, ID, Query } from "appwrite";
  import { client } from "$lib/appwrite";
  import {
    PUBLIC_APPWRITE_DB,
    PUBLIC_APPWRITE_COLLECTION,
  } from "$env/static/public";
  let url = "";

  const databases = new Databases(client);

  function hash() {
    let chars =
      "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzY1234567890";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  function shorten() {
    let randomHash = hash();
    let getDataPromise = databases.listDocuments(
      PUBLIC_APPWRITE_DB,
      PUBLIC_APPWRITE_COLLECTION,
      [Query.equal("hash", randomHash)],
    );
    getDataPromise.then(
      function (response) {
        if (response.total > 0) {
          // the hash already exists in the db and I have generate a new one.
          console.log("Hash already exists");
          shorten();
        } else {
          console.log("hash dosn't exist");
          const insertPromise = databases.createDocument(
            PUBLIC_APPWRITE_DB,
            PUBLIC_APPWRITE_COLLECTION,
            ID.unique(),
            { url: url, hash: randomHash },
          );

          insertPromise.then(
            function (response) {
              console.log(response);
            },
            function (error) {
              console.log(error);
            },
          );
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }
</script>

<header class="main-header">
  <div class="header-content">
    <h1 class="main-heading">Paste your URL 🔗!</h1>
    <form
      class="form"
      on:submit={(e) => {
        e.preventDefault();
        shorten();
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
          required
        />
      </div>
      <div class="submit-wrp">
        <button class="submit rounded-input" type="submit">Shorten!</button>
      </div>
    </form>
  </div>
</header>
