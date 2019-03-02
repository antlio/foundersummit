<template>
  <div id="home">
    <div class="background-icons">
      <div class="triangle triangle-1"></div>
      <div class="triangle triangle-2"></div>
      <div class="triangle triangle-3"></div>
      <div class="triangle triangle-4"></div>
      <div class="triangle triangle-5"></div>
      <div class="triangle triangle-6"></div>
      <div class="triangle triangle-7"></div>
      <div class="triangle triangle-8"></div>
      <div class="triangle triangle-9"></div>
      <div class="triangle triangle-10"></div>
      <div class="triangle triangle-11"></div>
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="circle circle-4"></div>
      <div class="circle circle-5"></div>
      <div class="circle circle-6"></div>
      <div class="circle circle-7"></div>
      <div class="circle circle-8"></div>
      <div class="circle circle-9"></div>
    </div>
    <section class="banner">
      <div class="banner__background">
        <img src="../assets/images/background-banner.png" alt="" width="950px">
      </div>
      <div class="banner__title">
        <h1>Founder Summit 2019</h1>
        <p class="banner__title--catchline">L’événement qui rassemble les différents experts de la tech lyonnaise pour vous aider à créer ou à développer vos projets.</p>
      </div>
      <div class="banner__countdown">
        <div class="banner__countdown--date">
          <div class="content">
            <span class="date day">04</span>
            <span class="date">avril 2019</span>
          </div>
        </div>
        <div class="banner__countdown--badge">Commence dans</div>
        <div class="banner__countdown--time">
          <app-skeleton 
            v-if="loading" 
            width="100%"
            height="10px">
          </app-skeleton>
          <div v-else-if="!loading && timeLeft > 0" class="value">
            <div><span v-if="days < 10">0</span>{{ days }}</div>
            <div><span v-if="hours < 10">0</span>{{ hours }}</div>
            <div><span v-if="minutes < 10">0</span>{{ minutes }}</div>
            <div><span v-if="seconds < 10">0</span>{{ seconds }}</div>
          </div>
          <div v-else class="value notimeleft">
            <span>L'évènement a commencé</span>
          </div>
          <div v-if="!loading && timeLeft > 0" class="label">
            <span>j.</span>
            <span>h.</span>
            <span>m.</span>
            <span>s.</span>
          </div>
        </div>
        <div class="banner__countdown--buttons">
          <div class="btn btn-red">S'inscrire</div>
          <div class="btn btn-white">En savoir plus</div>
        </div>
      </div>
    </section>
    <section class="description">
      <div class="description__images">
        <div class="description__images--image"></div>
        <div class="description__images--image"></div>
        <div class="description__images--image"></div>
      </div>
      <div class="description__content">
        <h3>Bienvenue au Founder Summit</h3>
        <p class="description__content--text">Vous souhaitez créer votre entreprise mais vous n’avez pas encore toutes les cartes en main pour le faire ?<br /><br />
          Vous êtes intéressé par le monde de l’entrepreneuriat en général et souhaitez en apprendre plus sur la création d’entreprise ?<br /><br />
          Le <a href="#">Founder Summit</a> vous apportera les réponses dont vous avez besoin.<br /><br />
          Inscrivez-vous à cette demi-journée d’incubation durant laquelle vous pourrez rencontrer des experts métiers de domaines divers, tels que la <strong>comptabilité</strong>, la <strong>levée de fonds</strong>, la <strong>communication</strong> ou encore le <strong>marketing</strong>.
        </p>
        <div class="btn btn-red">S'inscrire</div>
      </div>
    </section>
    <section class="conduct">
      <h2>Le <span class="tag tag-red">déroulement</span></h2>
      <div class="conduct__cards">
        <div v-for="(card, index) in cards" :key="index" class="conduct__cards--card">
          <span class="step">{{ index + 1 }}</span>
          <h4>{{ card.title }}</h4>
          <p class="content">{{ card.content }}</p>
        </div>
      </div>
    </section>
    <section id="intervenants" class="slider">
      <h2>Les <span class="tag tag-yellow">intervenants</span></h2>
      <p class="slider__subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
      <div class="slider__slides">
        <div class="slider__slides--tabs">
          <div v-for="(attendee, index) in attendees" :key="index" @click="activeTab = index + 1" :class="['tab', activeTab === index + 1 ? 'active' : '']">
            <span class="tab__name">{{ attendee.full_name }}</span>
            <span class="tab__activity">{{ attendee.activity }}</span>
          </div>
        </div>
        <div class="slider__slides--content">
          <div class="content">
            <span class="content__title">{{ currentTab.title }}</span>
            <div class="content__photo">
              <div class="content__photo--image">
                <img :src="currentTab.photo" :alt="currentTab.full_name + ' photo'">
              </div>
            </div>
            <span class="content__fullname">{{ currentTab.full_name }}</span>
            <span class="content__activity">{{ currentTab.activity }}</span>
            <div class="content__company">
              <a :href="currentTab.link" target="_blank"><img class="content__company" :src="currentTab.company" alt="logo entreprise"></a>
            </div>
            <div class="content__description">
              <span class="content__description--description">{{ currentTab.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="planning">
      <h2>Le <span class="tag tag-yellow">planning</span></h2>
    </section>
  </div>
</template>

<script>
import SkeletonBox from "@/components/SkeletonBox.vue";

export default {
  data() {
    return {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      timeLeft: null,
      loading: true,
      cards: [
        {
          title: "Selection d'un intervenant",
          content:
            "Choisissez un ou plusieurs expert(s) métier selon le domaine qui vous intéresse, de la comptabilité à la communication."
        },
        {
          title: "Rencontre avec l'expert",
          content:
            "Vous disposez de 10 minutes avec le fondateur choisi pour discuter de vos problématiques et lui poser toutes les questions nécessaires."
        },
        {
          title: "Gain d'expérience",
          content:
            "Une fois les 10 minutes terminées, vous disposez des réponses à vos questions et pouvez passer à un autre intervenant selon vos besoins."
        }
      ],
      attendees: [
        {
          id: 1,
          full_name: "Tiphaine Frugier",
          title: "",
          activity: "Market/Com",
          company: "Girlz in web",
          link: "",
          photo: "",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          id: 2,
          full_name: "Alisson Grosdemange",
          title: "",
          activity: "1kubator",
          company: "1kubator",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 3,
          full_name: "Romaric Gouedard",
          title: "",
          activity: "CEO",
          company: "From Smash",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 4,
          full_name: "Romain Hetzel",
          title: "",
          activity: "UX/UI Designer",
          company: "",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 5,
          full_name: "Erwan Jarrand",
          title: "",
          activity: "Comptable",
          company: "Gonéo",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 6,
          full_name: "Mickael Rigard",
          title: "",
          activity: "Pitch",
          company: "Attractive Labs",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 7,
          full_name: "Marie Nguyen",
          title: "",
          activity: "Fondatrice",
          company: "We Dress Fair",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 8,
          full_name: "Emmanuel Cohen",
          title: "",
          activity: "Avocat",
          company: "Cohen avocat",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 9,
          full_name: "Kévin Chavanne",
          title: "Développeur",
          activity: "Senior Développeur Full-Stack",
          company: require("@/assets/images/company/le-wagon-logo.png"),
          link: "https://www.lewagon.com",
          photo: require("@/assets/images/attendees/kevin-chavanne.png"),
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          id: 10,
          full_name: "Pierre-Alban Toth",
          title: "",
          activity: "Product Manager",
          company: "Clearwage",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 11,
          full_name: "Erwan Jarrand",
          title: "",
          activity: "Comptable",
          company: "",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 12,
          full_name: "Louis Delon",
          title: "",
          activity: "Fondateur",
          company: "Holdies",
          link: "",
          photo: "",
          description: ""
        },
        {
          id: 13,
          full_name: "Vincent Mendes",
          title: "",
          activity: "CEO",
          company: "Entrup",
          link: "",
          photo: "",
          description: ""
        }
      ],
      activeTab: 1
    };
  },
  computed: {
    currentTab() {
      return this.attendees.find(attendee => {
        return attendee.id == this.activeTab;
      });
    }
  },
  components: {
    "app-skeleton": SkeletonBox
  },
  methods: {
    countDown() {
      const countDownDate = new Date("Apr 4, 2019 12:00:00").getTime();
      const self = this;
      const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        self.timeLeft = distance;

        self.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        self.hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        self.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        self.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      }, 0);
    }
  },
  mounted() {
    this.countDown();
    this.$nextTick(() => {
      setTimeout(() => (this.loading = false), 200);
    });
  }
};
</script>


<style lang="postcss" scoped>
.banner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  height: 800px;
  align-content: center;
  padding: 50px var(--spacing-base) 0 var(--spacing-base);
  &__background {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
  }
  &__title {
    margin-top: 50px;
    &--catchline {
      padding: 0 5px;
      margin-top: 60px;
      line-height: 20px;
    }
  }
  &__countdown {
    width: 451px;
    height: 361px;
    box-shadow: var(--shadow);
    border-radius: 3px;
    position: relative;
    padding: 110px 40px 45px 40px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
    justify-self: end;
    background-color: white;
    &--date {
      position: absolute;
      top: -70px;
      transform: translateX(-50%);
      left: 50%;
      border-radius: 3px;
      height: 150px;
      width: 267px;
      background-color: var(--color-lightred);
      display: flex;
      justify-content: center;
      align-items: center;
      .content {
        display: flex;
        flex-flow: column;
        .date {
          color: var(--color-red);
          font-size: 3em;
          font-family: var(--font-head-medium);
          &.day {
            font-size: 4.5em;
          }
        }
      }
    }
    &--badge {
      width: 122px;
      font-size: 0.75em;
      text-align: center;
      padding: 6px 0;
      border-radius: 3px;
      font-family: var(--font-head-medium);
      color: var(--color-red);
      box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.1);
      animation: ping 2s ease-in-out infinite both;
    }
    &--time {
      width: 100%;
      font-family: var(--font-head-medium);
      display: flex;
      flex-flow: column;
      .value {
        display: grid;
        grid-template-columns: repeat(4, 55px);
        font-size: 3em;
        justify-content: space-between;
        div {
          &:last-child {
            color: var(--color-gray);
            justify-self: end;
          }
        }
        &.notimeleft {
          grid-template-columns: 1fr;
          font-size: 1.9em;
        }
      }
      .label {
        display: grid;
        grid-template-columns: repeat(4, 55px);
        justify-content: space-between;
        justify-items: end;
        font-size: 1.125em;
        color: var(--color-gray);
      }
    }
    &--buttons {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .btn-white {
        width: 169px;
      }
    }
  }
}
.description {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  height: 450px;
  position: relative;
  margin-top: 250px;
  padding: 0 var(--spacing-base);
  &__images {
    &--image {
      border-radius: 3px;
      box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
      &:nth-child(2),
      &:last-child {
        left: 120px;
      }
      &:first-child {
        width: 377px;
        height: 283px;
        background: linear-gradient(
            rgba(253, 16, 21, 0.1),
            rgba(253, 16, 21, 0.1)
          ),
          url(../assets/images/le-wagon-talk-1.jpg) no-repeat center;
        background-size: cover;
        margin: 0 auto;
      }
      &:nth-child(2) {
        width: 225px;
        height: 150px;
        background: linear-gradient(
            rgba(253, 16, 21, 0.2),
            rgba(253, 16, 21, 0.2)
          ),
          url(../assets/images/le-wagon-talk-2.jpg) no-repeat center;
        background-size: cover;
        position: absolute;
        top: 0;
        z-index: -1;
        opacity: 0.4;
      }
      &:last-child {
        width: 245px;
        height: 163px;
        background: linear-gradient(
            rgba(253, 16, 21, 0.2),
            rgba(253, 16, 21, 0.2)
          ),
          url(../assets/images/le-wagon-talk-3.jpg) no-repeat center;
        background-size: cover;
        position: absolute;
        bottom: 0;
        z-index: -1;
        opacity: 0.4;
      }
    }
  }
  &__content {
    width: 591px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 20px 0;
    &--text {
      line-height: 20px;
      a {
        color: var(--color-red);
      }
      strong {
        padding: 0 2px;
        position: relative;
        &:before {
          content: "";
          display: inline-block;
          position: absolute;
          bottom: -2px;
          transform: translateX(50%);
          left: -50%;
          width: 100%;
          height: 9px;
          background-color: var(--color-lightyellow);
          border-radius: 2px;
          z-index: -1;
          transition: height 0.15s ease;
        }
        &:hover:before {
          height: 20px;
        }
      }
    }
  }
}
.conduct {
  text-align: center;
  margin-top: 150px;
  position: relative;
  padding: 150px var(--spacing-base);
  width: 100%;
  left: 0;
  &:before {
    content: "";
    position: absolute;
    background: url(../assets/images/conduct-background-1.svg) no-repeat center;
    background-size: cover;
    transform: translateX(-50%);
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    background: url(../assets/images/conduct-background-2.svg) no-repeat center;
    background-size: cover;
    transform: translateX(-50%);
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    &:before {
      content: "";
      position: absolute;
      background: url(../assets/images/conduct-line.svg) no-repeat center;
      background-size: contain;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 100%;
      height: 228px;
    }
    &--card {
      display: grid;
      align-content: center;
      justify-content: center;
      grid-gap: 20px;
      margin-top: 40px;
      &:first-child {
        justify-self: start;
      }
      &:nth-child(2) {
        .step {
          padding-top: 40px;
        }
      }
      &:last-child {
        justify-self: end;
      }
      &:first-child,
      &:last-child {
        .step {
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
      }
      .step {
        font-family: var(--font-head-black);
        color: white;
        font-size: 9.375em;
        height: 270px;
      }
      .content {
        padding: 0 25px;
      }
    }
  }
}
.slider {
  text-align: center;
  margin-top: 160px;
  padding: 0 var(--spacing-base);
  &__subtitle {
    margin-top: 30px;
  }
  &__slides {
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    grid-column-gap: 130px;
    margin-top: 87px;
    &--tabs {
      height: 522px;
      overflow-y: scroll;
      display: grid;
      grid-row-gap: 10px;
      .tab {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        justify-content: center;
        background: white;
        border: 0.5px solid rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        height: 67px;
        padding-left: 30px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.2s ease;
        &__name {
          font-family: var(--font-head-medium);
          font-size: 1.25em;
        }
        &__activity {
          font-family: var(--font-head-regular);
          font-size: 0.875em;
        }
        &.active,
        &:hover {
          color: var(--color-red);
          background-color: var(--color-lightyellow);
          border: 0.5px solid transparent;
        }
      }
    }
    &--content {
      .content {
        display: grid;
        grid-template-columns: 0.8fr 1fr;
        grid-template-rows: repeat(2, auto) repeat(2, 1fr);
        text-align: left;
        &__title {
          padding: 10px 20px;
          color: var(--color-blue);
          background-color: var(--color-lightblue);
          width: fit-content;
          height: fit-content;
          border-radius: 3px;
          font-size: 1.125em;
          font-family: var(--font-head-medium);
          margin-bottom: 45px;
        }
        &__fullname {
          font-family: var(--font-head-black);
          font-size: 2em;
        }
        &__activity {
          font-family: var(--font-head-regular);
          font-size: 1.125em;
          margin-top: 10px;
        }
        &__photo {
          grid-column: 2;
          grid-row: 1 / span 4;
          justify-self: center;
          background-image: url(../assets/icons/background-photo-dots.svg);
          background-size: cover;
          height: 335px;
          width: 335px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 50px;
          position: relative;
          &:before {
            content: "";
            background-image: url(../assets/icons/rectangle.svg);
            height: 82px;
            width: 82px;
            position: absolute;
            z-index: -1;
            left: -40px;
            bottom: 33px;
          }
          &:after {
            content: "";
            background-image: url(../assets/icons/rectangle.svg);
            height: 109px;
            width: 109px;
            position: absolute;
            z-index: -1;
            top: -14px;
            right: -7px;
          }
          &--image {
            height: 235px;
            width: 235px;
            border-radius: 50%;
            background-color: var(--color-lightyellow);
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        &__company {
          img {
            filter: grayscale(100);
            opacity: 0.7;
            height: 45px;
            transition: all 0.2s ease;
            &:hover {
              filter: grayscale(0);
              opacity: 1;
            }
          }
        }
        &__description {
          grid-column: span 2;
          margin-top: 90px;
          border-left: 2px dashed rgba(0, 0, 0, 0.2);
          padding-left: 10px;
          &--description {
            line-height: 20px;
            position: relative;
          }
        }
      }
    }
  }
}
.planning {
  text-align: center;
  margin-top: 150px;
}
@keyframes ping {
  0% {
    box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.15);
  }
  50% {
    box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.05);
  }
  100% {
    box-shadow: 0px 4px 10px rgba(253, 16, 21, 0.15);
  }
}
</style>
