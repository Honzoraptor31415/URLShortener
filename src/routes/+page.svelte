<script lang="ts">
  import { Databases, ID, Query } from "appwrite";
  import { client } from "$lib/appwrite";
  import {
    PUBLIC_APPWRITE_DB,
    PUBLIC_APPWRITE_COLLECTION,
  } from "$env/static/public";
  import CopyIcon from "$lib/icons/CopyIcon.svelte";
  let url = "";
  let urlHash = "";
  let showCopiedMsg = false;
  let urlLabel = "";

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

  function copy() {
    navigator.clipboard.writeText(
      `${location.protocol}//${location.host}/${urlHash}`,
    );
    console.log(
      `Copied text: ${location.protocol}//${location.host}/${urlHash}`,
    );
    showCopiedMsg = true;
    setTimeout(() => {
      showCopiedMsg = false;
    }, 1390);
  }

  function urlCheck() {
    if (url.length < 1) {
      urlLabel = "URL can't be empty";
      return false;
    } else if (
      !url.match(
        /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
      )
    ) {
      urlLabel = "Invalid URL";
      return false;
    } else {
      urlLabel = "";
      return true;
    }
  }

  function shorten() {
    if (urlCheck()) {
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
                console.log(response.hash);
                urlHash = response.hash;
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
        <label for="url" class={urlLabel !== "" ? "form-error" : ""}
          >{urlLabel === "" ? "Your URL" : urlLabel}</label
        >
        <input
          bind:value={url}
          type="text"
          id="url"
          class="rounded"
          placeholder="goes here!"
        />
      </div>
      {#if urlHash}
        <div class="form-element">
          <p class="label-p">Shortened URL</p>
          <div class="url-result-wrp rounded">
            <p class="url">
              <span class="less">{location.protocol}//</span>
              <span>{location.host}/{urlHash}</span>
            </p>
            <button
              on:click={(e) => {
                e.preventDefault();
                copy();
              }}
              class="copy-btn"
            >
              {#if showCopiedMsg}
                <p class="copied-message">Copied!</p>
              {/if}
              <CopyIcon />
            </button>
          </div>
        </div>
      {/if}
      {#if !urlHash}
        <div class="submit-wrp">
          <button class="submit rounded" type="submit">Shorten!</button>
        </div>
      {/if}
    </form>
  </div>
</header>
