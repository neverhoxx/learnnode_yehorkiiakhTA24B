<script setup>

</script>
<template>
    <div class="tabs is-centered">
        <ul>
            <li v-for="route in $router.getRoutes()" :class="{'is-active': $route.path === route.path}">
                <RouterLink :to="route.path">{{route.name}}</RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.tabs {
    margin-bottom: 15px;
}

.tabs ul {
    display: flex;
    justify-content: center;

    gap: 8px;

    padding: 0;

    list-style: none;
}

.tabs li {
    border: 1px solid #ccc;
    border-radius: 4px;

    background: #f5f5f5;
}

.tabs li.is-active {
    background: #00d1b2;
}

.tabs a {
    display: block;

    padding: 8px 14px;

    text-decoration: none;
    color: #363636;
}

.tabs li.is-active a {
    color: white;
}
</style>