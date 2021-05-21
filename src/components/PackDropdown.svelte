<div class="select">
  <select>
    <option value="" disabled selected>Choose a Pack</option>
    {#await getPacks() then packs}
        {#each packs.data as pack}
            <option value="{pack.id}">{pack.name}</option>
        {/each}
    {/await}
  </select>
</div>

<script>
async function getPacks() {
    const res = await fetch('/api/sets');
    const json = await res.json();

    if (res.ok) {
        return json;
    } else {
        throw new Error(res);
    }
}
</script>