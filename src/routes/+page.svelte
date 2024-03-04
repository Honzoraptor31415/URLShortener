<script>
  import { Client, Databases, ID, Query } from "appwrite";
  import { client } from "$lib/appwrite";
  import {
    PUBLIC_APPWRITE_DB,
    PUBLIC_APPWRITE_COLLECTION,
  } from "$env/static/public";
  let url = "";

  const databases = new Databases(client);

  function getData() {
    let promise = databases.listDocuments(
      PUBLIC_APPWRITE_DB,
      PUBLIC_APPWRITE_COLLECTION,
      [Query.equal("hash", "test")],
    );

    promise.then(
      function (response) {
        console.log(response.documents[0].url);
      },
      function (error) {
        console.log(error);
      },
    );
  }
  getData();

  function submit() {
    console.log("Submit");
    const promise = databases.createDocument(
      PUBLIC_APPWRITE_DB,
      PUBLIC_APPWRITE_COLLECTION,
      ID.unique(),
      { url: url, hash: "test" },
    );

    promise.then(
      function (response) {
        console.log(response);
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
          required
        />
      </div>
      <div class="submit-wrp">
        <button class="submit rounded-input" type="submit">Shorten!</button>
      </div>
    </form>
  </div>
</header>
