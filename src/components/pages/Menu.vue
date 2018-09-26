<template>
    <section>
        <div class="columns is-mobile is-multiline">
            <div class="column is-one-third-desktop is-full-mobile is-full-tablet mobile-padding" v-bind:key="item.id"
                 v-for="(item, index) in items">
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-1by1">
                            <img :src="getCover(item.id)">
                        </figure>
                    </div>
                    <div class="card-header-title">
                        {{item.title}}
                    </div>
                    <div class="card-content">ТУТ буде склад (короткий) як тiльки зробемо №2</div>
                    <footer class="card-footer">
                        <a class="card-footer-item" @click.stop="buyModal(index)">Замовити</a>
                    </footer>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                items: []
            }
        },
        created() {
            this.getAll()
        },
        methods: {
            getCover(id){
                return "https://apiinterlude.in-story.org/api/getCoverById?elem_id="+id;
            },
            getAll() {
                this.$http.get('https://apiinterlude.in-story.org/api/method/menu.get').then(response => {
                    if (response.body.success == true)
                        this.items = response.body.response;
                });
            },
            buyModal(index){
                var item = this.items[index];
                this.$dialog.prompt({
                    title: 'Замовити '+item.title,
                    message: 'Скiльки?',
                    confirmText: "Замовити",
                    inputAttrs: {
                        type: 'number',
                        // placeholder: '',
                        value: '1',
                        maxlength: 4,
                        min: 1,
                    },
                    onConfirm: (amount) => this.buy(item.id, amount)
                })
            },
            buy(item_id, amount){
                this.$http.get('https://apiinterlude.in-story.org/api/method/bill.pay', {
                    body: {
                        item_id: item_id,
                        amount: amount
                    }
                }).then(response => {
                    if (response.body.success == true){
                        this.$toast.open({
                            message: 'Замовленя додано в обробку',
                            type: 'is-success'
                        })
                    }

                });
            }
        }
    }
</script>

<style scoped>

</style>
