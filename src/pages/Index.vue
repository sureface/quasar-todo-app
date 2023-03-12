<template>
 <div class="wrapper">
    <div class="video-bg">
      <video autoplay loop muted>
        <source src="~/src/assets/video/bg.mp4" type="video/webm">
        <source src="~/src/assets/video/bg.mp4" type="video/mp4">
      </video>
    </div>
    <div class="app">
      <header class="q-mb-md">
        <q-btn icon="add" round size="md" color="primary" @click="show_dialog = true"/>
        <q-dialog v-model="show_dialog">
          <q-card style="width: 600px;">
            <q-card-section>
              <q-input filled v-model="name_uz" label="your Name.." class="q-mb-md" :rules="[val => !!val || 'Field is required']"/>
              <q-input filled v-model="address" label="youtr address.."  class="q-mb-md" :rules="[val => !!val || 'Field is required']"/>
              <q-input filled v-model="cost" label="your price" type="number"  class="" :rules="[val => !!val || 'Field is required']"/>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="cencel" color="negative" v-close-popup></q-btn>
              <q-btn flat label="add" color="primary" v-close-popup @click="addRow"></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="show_dialog2">
          <q-card style="width: 600px;">
            <q-card-section>
              <q-input filled v-model="name_uz" label="your Name.."  class="q-mb-md"/>
              <q-input filled v-model="address" label="youtr address.."  class="q-mb-md"/>
              <q-input filled v-model="cost" label="your price" type="number"  class=""/>
            </q-card-section>
            <q-card-actions align="right">
             <q-btn flat label="add" color="primary" v-close-popup @click="editRow"></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
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
              <q-btn color="positive" round size="sm" icon="edit" class="q-mr-sm" @click="sendRowProp(props)"/>
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

export default {
  name: 'PageIndex',
  components: {
  },
  data() {
    return {
      products: [],
      limit: 9,
      name_uz: '',
      address: '',
      cost: 0,
      isEdit: false,
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
      show_dialog2: false,
      editId: 0,
    }
  },
  created() {
    this.loadProducts()
  },
  methods: {
    async loadProducts(pageNum) {
      const data = await api.get(`/api/product`);
      this.products = await data.data;
    },
    async delRow(item) {
      const id = item.row.id
      const result = await api.delete(`/api/product/${id}`)

      if(result.data) {
        this.loadProducts()
      }

    },
    async addRow() {

      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const data = {
        product_type_id: 0,
        name_uz: this.name_uz,
        cost: this.cost,
        address: this.address,
        created_date: '2023-03-11T12:55:08.010Z'
      }

      const res = await api.post('/api/product', data, config)
      if (res.status === 200) {
        this.loadProducts()
        this.name_uz = ''
        this.address = ''
        this.cost = null
      }
    },
    sendRowProp(item) {
      console.log(item.row);
      this.editId = item.row.id
      this.show_dialog2 = true;
      this.name_uz = item.row.name_uz
      this.address = item.row.address
      this.cost = item.row.cost
    },
    async editRow() {
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const data = {
        id: this.editId,
        product_type_id: 1,
        name_uz: this.name_uz,
        cost: this.cost,
        address: this.address,
        created_date: '2023-03-11T13:46:49.114Z'
      }

      const res = await api.put(`/api/product`, data, config)
      if (res.status === 200) {
        this.loadProducts()
        this.name_uz = ''
        this.address = ''
        this.cost = null
        this.editId = 1
      }
    }
  },
}
</script>
