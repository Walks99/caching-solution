<script type="module">
  import { openDB, deleteDB, wrap, unwrap } from 'https://cdn.jsdelivr.net/npm/idb@8/+esm';
  async function doDatabaseStuff() {
    const db = await openDB(/* ... */);
    // Perform database operations
  }
</script>
