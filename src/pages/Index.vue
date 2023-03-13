<template>
 <div class="wrapper">

    <bg-video />

    <div class="app">
      <header class="q-mb-md">

        <q-btn icon="add" round size="md" color="primary" @click="openModalAdd"/>

        <modal-add
          :opened="show_dialog"
          @toggle="show_dialog = false"
          @added-product="handleEvent"
          :product="currentProduct"
        />


      </header>

      <q-table
        title="Products"
        :data="products"
        :columns="columns"
        row-key="name"
        class="app__item q-pa-md"
      >

        <template v-slot:body-cell-controls="props">
          <q-td :props="props">
            <div>
              <q-btn color="positive" round size="sm" icon="edit" class="q-mr-sm" @click="openEditModal(props)"/>

              <q-btn color="negative" round size="sm" icon="remove" @click="delRow(props)"/>
            </div>
          </q-td>
        </template>

      </q-table>

    </div>
  </div>
</template>

<script>
import { api } from 'src/boot/axios.js';
import ModalAdd from 'src/components/modalAdd.vue';
import BgVideo from 'src/components/bgVideo.vue';

export default {
  name: 'PageIndex',
  components:{
    ModalAdd,
    BgVideo,
  },
  data() {
    return {
      products: [],
      limit: 9,
      isEdit: false,
      isOpen: false,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Product name',
          align: 'left',
          field: row => row.name_uz,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'address', align: 'center', label: 'Address', field: 'address', sortable: true },
        { name: 'price', label: 'Price', field: 'cost', sortable: true },
        { name: 'controls', label: 'controls', field: 'controls' },
      ],
      show_dialog: false,
      currentProduct: {},
    }
  },
  created() {
    this.loadProducts()
  },
  methods: {
    async loadProducts() {
      const data = await api.get(`/api/product`);
      this.products = await data.data;
    },
    async delRow(item) {
      const result = await api.delete(`/api/product/${item.row.id}`)

      if(result.data) {
        this.loadProducts()
      }

    },

    detectBtnPressed() {
      this.show_dialog = true;
    },


    openEditModal(item) {
      this.currentProduct = item.row
      this.show_dialog = true;
    },

    openModalAdd() {
      this.show_dialog =true;
      this.currentProduct = {
        name_uz: '',
        address: '',
        cost: '',
        id: 0,
      }
    },

    async addRow(form) {
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const data = {
        product_type_id: 0,
        name_uz: form.name_uz,
        cost: form.cost,
        address: form.address,
        created_date: '2023-03-11T12:55:08.010Z'
      }

      const res = await api.post('/api/product', data, config)

      if (res.status === 200) {
        this.loadProducts()
      }
    },


    async editRow(form) {
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const data = {
        id: this.currentProduct.id,
        product_type_id: 1,
        name_uz: form.name_uz,
        cost: form.cost,
        address: form.address,
        created_date: '2023-03-11T13:46:49.114Z'
      }

      const res = await api.put(`/api/product`, data, config)
      if (res.status === 200) {
        this.loadProducts()
      }
    },


    handleEvent(form) {
      if(this.currentProduct.id === 0) {
        this.addRow(form)
        return;
      }
      this.editRow(form)
    }


  },
}
</script>
