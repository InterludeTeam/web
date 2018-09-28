<template>
    <div class="card" style="width: 450px">
        <header class="modal-card-head">
            <p class="modal-card-title">
                Кошик
            </p>
        </header>
        <div class="modal-card-body">
            <div class="content">
                <b-table :data="items">
                    <template slot-scope="props">
                        <b-table-column field="item" label="Страва">
                            {{ props.row.item.title }}
                        </b-table-column>

                        <b-table-column field="amount" label="Кол-во" numeric>
                            {{ props.row.amount }}
                        </b-table-column>
                        <b-table-column field="item_id" label="Действие" width="40">
                            <!--{{JSON.stringify(props.index)}}-->
                            <a class="button is-small is-danger" @click="items.splice(props.index, 1)">x</a>
                            <!--{{ props.row.amount }}-->
                        </b-table-column>
                    </template>

                </b-table>
            </div>
        </div>
        <footer class="modal-card-foot">
            <button class="button">
                Cancel
            </button>
            <button class="button is-primary" @click.stop="buy()">
                Замовити
            </button>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "Cart",
        props: ['items', 'open'],
        data() {
            return {

            }
        },
        methods: {
            buy(){
                var items = this.items;
                var result = [];
                items.forEach(function (elem) {
                    result[result.length] = [elem.item_id, elem.amount];
                })
                this.$http.get('https://apiinterlude.in-story.org/api/method/bill.pay', {
                    params: {
                        items: result
                    }
                }).then(response => {
                    if (response.body.success == true){
                        this.$toast.open({
                            message: 'Замовленя додано в обробку',
                            type: 'is-success'
                        })
                    }

                });
                this.isOpen = false;
            },
        }
    }
</script>

<style scoped>

</style>
