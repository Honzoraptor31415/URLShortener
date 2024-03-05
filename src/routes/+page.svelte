<script>
  import { Databases, ID, Query } from "appwrite";
  import { client } from "$lib/appwrite";
  import {
    PUBLIC_APPWRITE_DB,
    PUBLIC_APPWRITE_COLLECTION,
  } from "$env/static/public";
  let url = "";
  let existsInDB = false;

  const databases = new Databases(client);

  function shorten() {
    try {
      let getDataPromise = databases.listDocuments(
        PUBLIC_APPWRITE_DB,
        PUBLIC_APPWRITE_COLLECTION,
        [Query.equal("hash", "test")],
      );
      getDataPromise.then(
        function (response) {
          if (response.total > 0) {
            // the hash already exists in the db and I have generate a new one.
            console.log("Hash already exists");
          } else {
            console.log("hash dosn't exist");
            const insertPromise = databases.createDocument(
              PUBLIC_APPWRITE_DB,
              PUBLIC_APPWRITE_COLLECTION,
              ID.unique(),
              { url: url, hash: "test" },
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
    } catch (e) {
      console.error(`Error in the try/catch: ${e}`);
    }
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
