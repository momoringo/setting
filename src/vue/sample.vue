
<template>
    <div class="uu">
        <Mo />
    </div>
</template>

<script>
import Mo from '@/Mo'

export default {
  props: {},
  components: {
        Mo
  },  
  data () {
    return {
      map: ['A','B','C','D'],
      isDisabled: false,
      inc: 1
    }
  },
  computed: {
    addClass() {
      return 5
    },

  },

  created() {
    //this.map.concat([],this.maps)
  },
  mounted() {
  },
  methods: {
    delFunc(t) {
  
    }
  }
}
</script>

<style lang="scss">
  [data-cell-id^="cellID-"] {
    display: flex;
  }

  body {
    height: 99999px;
    .uu {
        background: #000;
    }
  }

</style>
