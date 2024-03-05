<script>
  export let data;
  import {
    PUBLIC_APPWRITE_DB,
    PUBLIC_APPWRITE_COLLECTION,
  } from "$env/static/public";
  import { Databases, ID, Query } from "appwrite";
  import { client } from "$lib/appwrite";
  import Error from "$lib/components/Error.svelte";
  let error = false;

  const databases = new Databases(client);

  function getData() {
    try {
      let getDataPromise = databases.listDocuments(
        PUBLIC_APPWRITE_DB,
        PUBLIC_APPWRITE_COLLECTION,
        [Query.equal("hash", data.hash)],
      );

      getDataPromise.then(
        function (response) {
          console.log(response);
          if (response.total > 0) {
            window.location.assign(response.documents[0].url);
          } else {
            error = true;
          }
        },
        function (error) {
          console.log(error);
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  getData();
</script>

<Error code={404} message="Hash not found" />
