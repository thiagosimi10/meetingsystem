<template>
    <div class="row">
        <div class="col-12">
            <card :title="table1.title">
                <div class="table-responsive">
                    <base-table :data="table1.data"
                                :columns="table1.columns"
                                thead-classes="text-primary">
                    </base-table>
                </div>
            </card>
        </div>
    </div>
</template>
<script>
import { BaseTable } from "@/components";
const tableColumns = [
    "id",
    "Ata",
    "Aprovadores"
];
const tableData = [

];

export default {
    components: {
    BaseTable
},
    data() {
        return {
            table1: {
                title: "",
                columns: [...tableColumns],
                data: [...tableData]
            },
        };
    }
};
</script>
<style>
</style>
