<template>
    <section>
        <div class="columns is-mobile is-multiline">
            <div class="column is-one-third-desktop is-full-mobile is-full-tablet mobile-padding" v-bind:key="item.id"
                 v-for="item in items">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-1by1">
                            <img src="http://komora.kitchen/wp-content/uploads/2017/09/poltavska-300x250.jpg" alt="Placeholder image">
                        </figure>
                    </div>
                    <div class="card-header-title">
                        {{item.title}}
                    </div>
                    <div class="card-content">ТУТ буде склад (короткий) як тiльки зробемо №2</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                items: []
            }
        },
        created() {
            this.getAll()
        },
        methods: {
            getAll() {
                this.$http.get('https://apiinterlude.in-story.org/api/method/menu.get').then(response => {
                    if (response.body.success == true)
                        this.items = response.body.response;
                });
            }
        }
    }
</script>

<style scoped>

</style>
