<template>
  <q-dialog :value="opened" @input="$emit('toggle', $event)">
    <q-card style="width: 600px;">
      <q-card-section>
        <q-input filled v-model="name_uz" label="your Name.." class="q-mb-md" :rules="[checkRequired]"/>
        <q-input filled v-model="address" label="youtr address.."  class="q-mb-md" :rules="[checkRequired]"/>
        <q-input filled v-model="cost" label="your price" type="number"  class="" :rules="[checkRequired]"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="cencel" color="negative" v-close-popup></q-btn>
        <q-btn flat label="add" color="primary" v-close-popup @click="$emit('added-product', {name_uz, address, cost })"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

  export default {
    name: 'modal-add',
    props: {
      opened: Boolean,
      product: Object,
    },
    data() {
      return {
        name_uz: '',
        address: '',
        cost: 0,
      }
    },
    methods: {
      checkRequired(val) {
        return !!val || 'Faild is required !'
      }
    },
    watch: {
      opened(state) {
        this.name_uz = state ? this.product.name_uz : '';
        this.address = state ? this.product.address : '';
        this.cost = state ? this.product.cost : '';
      }
    }
  }

</script>
