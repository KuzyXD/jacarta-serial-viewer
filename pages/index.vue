<template>
  <div class="container">
    <c-grid template-columns="1" gap="6">
      <c-grid-item justify-self="center">
        <CHeading text-align="center" my="4">
          ⚡️ Jacarta-серийнико-выдаватель
        </CHeading>
      </c-grid-item>

      <c-grid-item justify-self="center">
        <c-text fontSize="lg" mb="3">Нажмите на кнопку, чтобы вывести список:</c-text>
        <c-button variant-color="blue" size="lg" @click="getDevicesList">
          Нажми на меня
        </c-button>
      </c-grid-item>
      <c-grid-item w="20%" justify-self="center">
        <c-textarea v-model="rememberDevices" :value="rememberDevices" placeholder="Здесь будет список серийных номеров, которые нужно было запомнить"></c-textarea>
      </c-grid-item>

      <c-grid-item justify-self="center">
        <SerialNumber @remember="addToList" :text="token.tokenInfo.serialNumber" v-for="token in this.devices" :key="token.tokenInfo.serialNumber"/>
      </c-grid-item>
    </c-grid>
  </div>
</template>

<script lang="js">
  import SerialNumber from "../components/SerialNumber";
  import {getAllSlots} from "../static/helpers.js";

  export default {
    name: 'IndexPage',
    components: {SerialNumber},
    data() {
      return {
        devices: [],
        rememberDevices: ''
      }
    },
    computed: {},
    methods: {
      async jacartaInit() {
        const vue = this;

        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "./JCWebClient.js";

        script.onload = async function () {
          window.JCWebClient2.defaults({
            async: true,
            errorToString: true,
          });

          window.JCWebClient2.initialize();

          if (window.JCWebClient2.isInitialized()) {
            await vue.getDevicesList();
          }
        }

        document.body.appendChild(script);
      },
      async handleJCError(error) {
        this.makeToast(`Ошибка: ${error}. Обновите страницу.`, "Ошибка", "danger");
        await this.logout();
      },
      async getDevicesList() {
        const vue = this;

        window.JCWebClient2.getAllSlots({
          onSuccess: function (results) {
            vue.devices = getAllSlots(results);
          },
          onError: error => vue.handleJCError(error)
        });
      },
      addToList(value) {
        this.rememberDevices += value + '\r';
      }
    },
    mounted() {
      this.jacartaInit();
    }

  }
</script>
