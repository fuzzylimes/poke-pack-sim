// Components
import Home from './routes/Home.svelte'
import About from './routes/About.svelte'
import Packs from './routes/Packs.svelte'

// Export the route definition object
export default {
    '/': Home,
    '/about': About,
    '/packs/:id': Packs
}