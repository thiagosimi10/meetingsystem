<template>
    <div id="app">
        <v-grid
            theme="compact"
            :source="rows"
            :columns="columns"
        ></v-grid>
    </div>
</template>

<script>
import VGrid from "@revolist/vue-datagrid";
export default {
    name: "App",
    data() {
    return {
        columns: [{ prop: "name" }, { prop: "details" }],
        rows: [{
        name: "1",
        details: "Item 1",
        }]
    };
    },
    components: {
    VGrid,
    },
};
</script>