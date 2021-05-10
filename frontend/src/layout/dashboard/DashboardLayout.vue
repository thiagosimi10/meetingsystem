<template>
    <div class="wrapper">
        <side-bar>
            <template slot="links">
                <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36" hidden/>
                <sidebar-link to="/icons" :name="$t('sidebar.icons')" icon="tim-icons icon-atom" hidden/>
                <sidebar-link to="/maps" :name="$t('sidebar.maps')" icon="tim-icons icon-pin" hidden/>
                <sidebar-link to="/notifications" :name="$t('sidebar.notifications')" icon="tim-icons icon-bell-55" hidden/>
                <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02" hidden/>
                <sidebar-link to="/table-list" :name="$t('sidebar.tableList')" icon="tim-icons icon-puzzle-10" hidden/>
                <sidebar-link to="/typography" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center" hidden/>
                <sidebar-link to="/dashboard?enableRTL=true" :name="$t('sidebar.rtlSupport')" icon="tim-icons icon-world" hidden/>
                <sidebar-link to="/meetings" :name="$t('sidebar.meetings')" icon="tim-icons icon-bullet-list-67"/>
            </template>
        </side-bar>
        <div class="main-panel">
            <top-navbar></top-navbar>
            <dashboard-content @click.native="toggleSidebar">
            </dashboard-content>
            <content-footer></content-footer>
        </div>
    </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
    components: {
        TopNavbar,
        ContentFooter,
        DashboardContent,
        MobileMenu
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false);
            }
        }
    }
};
</script>
