new Vue({
    el: '#app',
    data: {
      message: ''
    },
    methods: {
      processMessage: function() {
        if (this.message === '123') {
          alert('Message is equal to 123.')
        }
      }
    }
  })