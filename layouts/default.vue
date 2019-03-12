<template>
  <div>
    <app-header></app-header>
    <nuxt />
    <no-ssr>
      <cookie-consent>
        <template slot="message">
          <p>
            <span>🍪</span> En continuant à naviguer sur ce site Web, vous consentez à ce que
            nous utilisions des cookies.
          </p>
        </template>
        <template slot="button">
          <button class="btn--cookie">
            <svg width="12" height="10" viewBox="0 0 12 10">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.28027 6.77839L1.68962 4.20639L0.400391 5.48603L4.26808 9.32679L11.5654 2.0803L10.2762 0.800049L4.28027 6.77839V6.77839Z"
                fill="#ffc96b"
              ></path>
            </svg>
            <span>J'accepte</span>
          </button>
        </template>
      </cookie-consent>
    </no-ssr>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    "app-header": Header
  },
  mounted() {
    console.log(
      "%cFOUNDER SUMMIT 2019 🚀",
      "color:#fd1015; font-size:20px; font-family: arial; font-weight: bold;"
    );
    console.log(
      "%cBILLETERIE 🎟 %chttp://bit.ly/lewagonfs2019",
      "color:black; font-size:20px; font-family: arial; font-weight: bold;",
      "color:blue; font-size:20px; font-family: arial; font-weight: bold;"
    );
  },
  created() {
    this.$nuxt.$on("buttonId", id => {
      window.EBWidgets.createWidget({
        widgetType: "checkout",
        eventId: "58542912427",
        modal: true,
        modalTriggerElementId: id
      });
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("buttonId");
  }
};
</script>


<style lang="postcss">
#__layout {
  position: relative;
  overflow: hidden;
}

html {
  font-family: "Graphik Regular", "Helvetica", sans-serif;
  font-size: var(--font-base);
  letter-spacing: 0.5px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.cookie-consent {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 10px;
  position: fixed;
  bottom: 40px;
  background-color: white;
  padding: 0 7px;
  border-radius: 50px;
  font-size: 0.8em;
  font-weight: 300;
  transform: translate(-50%, 50%);
  left: 50%;
  width: fit-content;
  height: 40px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 20;
  p {
    display: flex;
    align-items: center;
    span {
      font-size: 20px;
      margin-top: 3px;
      margin-right: 5px;
    }
  }
  section {
    .btn--cookie {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      background-color: var(--color-lightyellow);
      color: var(--color-yellow);
      border-radius: 50px;
      border: 0;
      width: 90px;
      padding: 7px 3px 7px 0;
      font-size: 1em;
      font-family: var(--font-content-regular);
      font-weight: 500;
      cursor: pointer;
    }
  }
}

@media (--mobile), (--tablet) {
  #Smallchat {
    display: none;
  }
  #__layout {
    overflow: hidden;
  }
  .cookie-consent {
    width: 90%;
    grid-auto-flow: row;
    justify-items: center;
    padding: 10px 20px;
    text-align: center;
    height: auto;
    bottom: 60px;
    p {
      text-align: left;
      span {
        margin-right: 10px;
      }
    }
  }
}
@media (--mobile) and (orientation: landscape) {
  .cookie-consent {
    width: 95%;
    grid-auto-flow: column;
    bottom: 40px;
  }
}
@media (--tablet) {
  .cookie-consent {
    width: fit-content;
    padding: 10px 20px;
  }
}
@media (--tablet) and (orientation: landscape) {
  .cookie-consent {
    width: fit-content;
    grid-auto-flow: column;
    bottom: 50px;
    padding: 10px 20px;
  }
}
@media (max-width: 812px), (max-width: 1024px) and (min-width: 814px) {
  .cookie-consent {
    grid-auto-flow: column;
  }
}
</style>
