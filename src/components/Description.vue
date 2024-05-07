<template>
  <div class="p-4">
    <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Enter the text:</label>
    <input id="description" v-model="text" @input="handleInput" class="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300">
    <div v-if="isTextBalanced !== null" class="text-sm text-gray-700">
      {{ isTextBalanced ? balancedMessage : unbalancedMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      balancedMessage: 'The text is balanced.',
      unbalancedMessage: 'The text is not balanced.',
      isTextBalanced: null,
      typingTimer: null,
      typingDelay: 500, // Adjust the delay as needed
    };
  },
  methods: {
    isBalanced(text) {
      const stack = [];
      const openingBrackets = ['(', '[', '{'];
      const closingBrackets = [')', ']', '}'];

      for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (openingBrackets.includes(char)) {
          stack.push(char);
        } else if (closingBrackets.includes(char)) {
          if (stack.length === 0) {
            return false;
          }

          const lastOpeningBracket = stack.pop();
          const matchingOpeningBracket = openingBrackets[closingBrackets.indexOf(char)];

          if (lastOpeningBracket !== matchingOpeningBracket) {
            return false;
          }
        }
      }

      return stack.length === 0;
    },
    checkBalance() {
      this.isTextBalanced = this.text === '' ? null : this.isBalanced(this.text);
    },
    handleInput() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.checkBalance, this.typingDelay);
    },
  },
};
</script>
