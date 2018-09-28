<template>
    <section class="container">
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
                        <span class="tag is-info is-medium" style="margin-right: 0.5%">{{item.price}} грн.</span>{{item.title}}
                    </div>
                    <div class="card-content">ТУТ буде склад (короткий) як тiльки зробемо №2</div>
                    <footer class="card-footer">
                        <a class="card-footer-item" @click.stop="buyModal(index)">Замовити</a>
                    </footer>
                </div>
            </div>
        </div>
        <div class="floatbuuton">
            <a class="button is-rounded is-medium" @click="cartmodal = true">
    <span class="icon is-small">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#000000"
          d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
</svg>
    </span>
            </a>
            <span class="badge" style="color: black">{{cart.length}}</span>
        </div>
        <b-modal :active.sync="cartmodal" has-modal-card>
            <Cart :items="cart"></Cart>
        </b-modal>
    </section>
</template>

<script>
    import Cart from '../Cart.vue'

    export default {
        name: "Menu",
        components: {
            Cart
        },
        data() {
            return {
                items: [],
                cart: [],
                cartmodal: false
            }
        },
        created() {
            this.getAll()
        },
        methods: {
            getCover(id) {
                return "https://apiinterlude.in-story.org/api/getCoverById?elem_id=" + id;
            },
            getAll() {
                this.$http.get('https://apiinterlude.in-story.org/api/method/menu.get').then(response => {
                    if (response.body.success == true)
                        this.items = response.body.response;
                });
            },
            buyModal(index) {
                var item = this.items[index];
                this.$dialog.prompt({
                    title: 'Замовити ' + item.title,
                    message: 'Скiльки?',
                    confirmText: "Додати у кошик",
                    inputAttrs: {
                        type: 'number',
                        // placeholder: '',
                        value: '1',
                        maxlength: 4,
                        min: 1,
                    },
                    onConfirm: (amount) => this.addToCart(item.id, amount, index)
                })
            },
            addToCart(item_id, amount, index) {
                // this.$set(this.cart, item_id, {item_id: item_id, amount: amount, item: this.items[index]})
                this.cart.push({item_id: item_id, amount: amount, item: this.items[index]});
                this.success('Страва додана у кошик');
            },

            success(message) {
                this.$toast.open({
                    duration: 3000,
                    message: message,
                    position: 'is-top',
                    type: 'is-success'
                })
            }
        }
    }
</script>

<style scoped>
    .floatbuuton {
        z-index: 4;
        bottom: 16px;
        position: fixed;
        right: 16px;
    }

    .badge {
        color: #fff;
        display: flex;
        position: absolute;
        font-size: 14px;
        top: -2px;
        right: -3px;
        border-radius: 50%;
        height: 22px;
        width: 22px;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
</style>
