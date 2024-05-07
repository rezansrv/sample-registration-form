<template>
  <div class="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
    <h2 class="text-xl font-semibold mb-4">Step: {{ steps[currentStep] }}</h2>
    <div v-if="currentStep === 1" class="mb-4">
      <label for="username" class="block mb-1">Username:</label>
      <input type="text" id="username" name="username" :value="username" @input="updateUsername($event.target.value)" class="w-full border border-gray-300 rounded px-3 py-2">
    </div>
    <div v-else-if="currentStep === 2" class="mb-4">
      <label for="email" class="block mb-1">Email:</label>
      <input type="email" id="email" name="email" :value="email" @input="updateEmail($event.target.value)" class="w-full border border-gray-300 rounded px-3 py-2">
    </div>
    <div v-else class="mb-4">
      <p class="mb-2">Review your information:</p>
      <p class="mb-1">Username: {{ username }}</p>
      <p class="mb-1">Email: {{ email }}</p>
    </div>
    <button @click="prevStep" :disabled="currentStep === 1" id="btn-prev" class="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50">Prev</button>
    <button @click="nextStep" :disabled="currentStep === 3 || isNextDisabled" id="btn-next" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none" :class="{ 'cursor-not-allowed opacity-50': isNextDisabled }">Next</button>
    <div v-show="!isValidUsername && currentStep === 1" class="text-red-500 mt-2">Invalid Username.</div>
    <div v-show="!isValidEmail && currentStep === 2" class="text-red-500 mt-2">Invalid email address.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      username: '',
      email: '',
      isNextDisabled: true,
      isValidUsername: false,
      isValidEmail: false,
      steps: { 1: 'username', 2: 'email', 3: 'review' },
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < 3) {
        if (this.currentStep === 2 && this.email.trim() === '') {
          this.isNextDisabled = true;
        } else {
          this.currentStep++;
          this.isNextDisabled = this.currentStep === 3 || this.email.trim() === '';
        }
      }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
      if (this.username !== '') {
        this.isNextDisabled = false;
      }
    },
    updateUsername(username) {
      this.username = username;
      this.checkInputFilled();
      this.CheckValidUsername(username);
    },
    updateEmail(email) {
      this.email = email;
      this.checkInputFilled();
      this.CheckValidEmail(email);
    },
    CheckValidUsername(username) {
      if (username === '') {
        this.isValidUsername = false;
      } else if (username.trim() === '') {
        this.isValidUsername = false;
      } else {
        const regex = /^[a-zA-Z0-9_]*[a-zA-Z0-9][a-zA-Z0-9_]*$/;
        this.isValidUsername = regex.test(username);
      }
    },
    CheckValidEmail(email) {
      if (email.trim() === '') {
        this.isValidEmail = false;
      } else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.isValidEmail = regex.test(email);
      }
    },
    checkInputFilled() {
      if (this.currentStep === 1) {
        this.isNextDisabled = this.username === '';
      } else if (this.currentStep === 2) {
        this.isNextDisabled = !(this.username !== '' && this.email !== '');
      }
    },
  },
};
</script>