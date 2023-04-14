var app = new Vue({
  el: '#hamming-encoder',
  data: {
    dataBits: [],
    status: '',
    numberOfDataBits: 4
  },
  created: function () {
    this.initDataBits(this.numberOfDataBits);
  },
  methods: {
    initDataBits: function(numDataBits) {
      this.dataBits = [];

      for (var i = 0; i < numDataBits; i++) {
        var bit = { data: null };
        this.dataBits.push(bit);
      }
    },
    send: function() {
      if (this.validate(this.dataBits) === true) {
        var encodedMessage = this.encode(this.dataBits);
        this.status = encodedMessage + ' encoded sent to server';

        return /* axios.put("http://localhost:3000/message", {bits: encodedMessage}).then(
                response => (*/ this.status = response.data;

      } else {
        this.status = 'Input is not valid. Please use 0 or 1 as data bit values';
      }
    },
    encode: function(bits) {
      var numDataBits = bits.length;
      var numParityBits = Math.ceil(Math.log2(numDataBits + 1));

      // Calculate parity bits
      var parityBits = [];
      for (var i = 0; i < numParityBits; i++) {
        var p = 0;
        var mask = 1 << i;
        for (var j = 0; j < numDataBits; j++) {
          if ((j & mask) !== 0) {
            p ^= bits[j].data;
          }
        }
        parityBits.push(p);
      }

      // Calculate control bit
      var controlBit = 0;
      for (var i = 0; i < numParityBits; i++) {
        controlBit |= (parityBits[i] << i);
      }

      // Construct encoded message
      var encodedMessage = [];
      for (var i = 0; i < numParityBits; i++) {
        encodedMessage.push(parityBits[i]);
      }
      encodedMessage.push(controlBit);
      for (var i = 0; i < numDataBits; i++) {
        encodedMessage.push(bits[i].data);
      }
      return encodedMessage;
    },
    validate: function(bits) {
      for (var i = 0; i < bits.length; i++) {
        if (this.validateBit(bits[i].data) === false)
          return false;
      }
      return true;
    },
    validateBit: function(character) {
      if (character === null) return false;
      return (parseInt(character) === 0 || parseInt(character) === 1);
    }
  }
});