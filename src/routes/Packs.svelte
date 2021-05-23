<script>
import Card from "../components/Card.svelte";


    export let params;

    let cards = {};
    let current = [];

    
    async function getCards() {
        const res = await fetch(`/api/cards?setId=${params.id}`);
        const json = await res.json();
        
        if (res.ok) {
            return json;
        } else {
            throw new Error(res);
        }
    }
    getCards().then(json => {
        const packButton = document.getElementById('open-packs');
        cards = json;
        packButton.removeAttribute('disabled');
    });

    async function drawPack() {
        window.scrollTo(0,0);
        // cards = await getCards();
        current = [];
        const energy = cards['Common'].filter(card => card.supertype == "Energy");
        const common = cards['Common'].filter(card => card.supertype !== "Energy")
        let rares = [];
        for (const [key, value] of Object.entries(cards)) {
            if (!['Common', 'Uncommon'].includes(key)) {
                rares = rares.concat(value);
            }
        }
        if (energy.length > 0) {
            current = current.concat(addCards(energy, 1));
            current = current.concat(addCards(common, 5));
        } else {
            current = current.concat(addCards(common, 6));
        }
        current = current.concat(addCards(cards['Uncommon'], 3));
        current = current.concat(addCards(rares, 1));
        console.log(current);
        return current;
    }

    const addCards = (cards, number) => {
        let addedCards = [];
        for (let i = 0; i < number; i++) {
            addedCards.push(cards[randomInt(cards.length-1)]);        
        }
        return addedCards;
    }

    const randomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
</script>

<!-- <div class="section"> -->
<section class="hero is-fullheight-with-navbar">
    <div class="hero-body">

        <div class="container">
            <div class="columns is-centered is-vcentered is-multiline">
                {#if current.length > 0}
                    <div class="column is-full">
                        <button class="button is-large is-fullwidth is-primary mb-3" on:click={drawPack}>Open New Pack</button>
                    </div>
                {/if}
    
                {#each current as card}
                    <div class="column is-4-tablet is-3-widescreen is-2-fullhd">
                        <Card bind:card />
                    </div>
                {/each}
    
                {#if current.length > 0}
                <div class="column is-full">
                    <button class="button is-large is-fullwidth is-primary mt-3" on:click={drawPack}>Open New Pack</button>
                </div>
                {:else}
                <div class="column is-full">
                    <button id="open-packs" disabled class="button is-large is-fullwidth is-primary" on:click={drawPack}>Open New Pack</button>
                </div>
                {/if}
            </div>
        </div>
    </div>
<!-- </div> -->
</section>
