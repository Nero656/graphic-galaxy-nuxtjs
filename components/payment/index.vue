<script lang="ts" setup>
import { ref } from 'vue';
import {useAuthStore} from "@/stores/auth.store"
import {md5} from "js-md5"
import {useLazyFetch} from "#app";

const props = withDefaults(
    defineProps<
        {open: boolean, showModal: () => void, handleOk: ()=>void, handleCancel: ()=> void, productList: any}>(),
    {open : true, productList: {}})

const telephone = ref('')
const cardNumber = ref('')
const cardEnd = ref('')
const cardName = ref('')
const cvc = ref('')
const address = ref('')

let date = new Date()

let today = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear()

let toDeliver = (date.getDate()+5) + '.' + (date.getMonth()+1) + '.' + date.getFullYear()

const query = `mutation CreateOrder($userId: ID!,
     $productList: JSON!,
     $quantity: Int!
     $email: String!,
     $Telephone: String!,
     $CardNumber: String!,
     $CardEnd: String!,
     $CardName: String!,
     $CardCVC: String!,
     $Address: String!,
     $created: String!,
     $will_deliver: String!,
     ) {
        createOrderList(data: {
            users_permissions_user: $userId,
            product_list: $productList,
            quantity: $quantity,
            email: $email,
            Telephone: $Telephone,
            cardNumber: $CardNumber,
            CardEnd: $CardEnd,
            CardName: $CardName,
            CardCVC: $CardCVC,
            Address: $Address,
            publishedAt: "2021-12-03T20:08:17.740Z",
            created: $created,
            will_deliver: $will_deliver
        }) {
            data {
                attributes {
                    users_permissions_user {
                        data {
                            id
                        }
                    }
                    product_list
                    quantity
                }
            }
        }
    }`


const sendForm = async () => {
  await useLazyFetch('http://192.168.1.90:1337/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: {
        userId: useAuthStore().isAuth.user.id,
        productList: props.productList,
        quantity: 1,
        email: useAuthStore().isAuth.user.email,
        Telephone: telephone.value,
        CardNumber: md5(cardNumber.value),
        CardEnd: md5(cardEnd.value),
        CardName: md5(cardName.value),
        CardCVC: md5(cvc.value),
        Address: address.value,
        created: today,
        will_deliver: toDeliver,
      }
    }),
    server: false
  })

  props.handleOk
}

</script>

<template>
    <a-modal v-bind:open="open" title="Оплата" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel" danger>Отмена</a-button>
        <a-button key="submit" type="primary" @click="sendForm">Купить</a-button>
      </template>
      <a-form
          layout="vertical"
          name="basic"
          autocomplete="off"
      >
        <a-form-item
            label="Номер телефона"
            name="telephone"
        >
          <a-input v-model:value="telephone"/>
        </a-form-item>

        <a-form-item
            label="Номер карты"
            name="card number"
        >
          <a-input v-model:value="cardNumber"/>
        </a-form-item>

        <a-form-item
            label="дата окончания"
            name="card end"
        >
          <a-input v-model:value="cardEnd"/>
        </a-form-item>

        <a-form-item
            label="Имя владельца"
            name="card name"
        >
          <a-input v-model:value="cardName"/>
        </a-form-item>
        <a-form-item
            label="cvc"
            name="cvc"
        >
          <a-input v-model:value="cvc"/>
        </a-form-item>

        <a-form-item
            label="Адрес"
            name="address"
        >
          <a-input v-model:value="address"/>
        </a-form-item>
      </a-form>
    </a-modal>
</template>
