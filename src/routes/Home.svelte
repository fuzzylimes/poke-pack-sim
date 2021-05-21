<script>
import PackDropdown from "../components/PackDropdown.svelte";

</script>
<section class="hero is-fullheight-with-navbar header-image">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-multiline is-vcentered is-centered is-mobile">
                <div class="column is-full has-text-centered mb-5">
                    <h1 class="title is-1 is-size-1-mobile has-text-white is-uppercase app-title">
                        Poké-Pack Sim
                    </h1>
                </div>
                <div class="column is-full has-text-centered my-3">
                    <PackDropdown />
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .app-title {
        font-size: 6rem;
    }
    .header-image {
        position: relative;
        background-image: url("https://unsplash.com/photos/dip9IIwUK6w/download?force=true&w=2400");
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        background-color: #999;
    }

    .header-image::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-color: rgba(0,0,0,0.7);
    }
</style>