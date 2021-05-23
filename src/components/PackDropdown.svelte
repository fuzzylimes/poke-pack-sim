<div id="dropdown" class="select is-medium is-loading">
  <select bind:value={selected}>
    <option value="" disabled selected>Choose a Pack</option>
    {#await getSeries() then series}
        {#each Object.entries(series.data) as [sname, sets]}
            <optgroup label="{sname} Series">
            {#each sets as set}
                <option value="{set.id}">{set.name}</option>
            {/each}
            </optgroup>
        {/each}
    {:catch err}
        <option value="">Bad stuff</option>
    {/await}
  </select>
</div>

<script>
    export let selected;
async function getSeries() {
    const res = await fetch('/api/sets');
    const json = await res.json();

    if (res.ok) {
        const d = document.getElementById('dropdown');
        d.classList.remove('is-loading');
        return json;
    } else {
        throw new Error(res);
    }
}
</script>