<template>
  <header>
    <div class="__logo">
      <img src="../assets/images/le-wagon-smart-up-logo.svg" alt="Le wagon x Smart up logo">
    </div>
    <a href="http://maps.google.com/maps?q=20+rue+des+capucins,+69001+lyon" target="_blank" class="__adress">20 rue des capucins, 69001 Lyon</a>
    <div class="__navigation">
      <a class="__navigation--underline" href="#">Intervenants</a>
      <a class="__navigation--underline" href="#">Contact</a>
      <a class="btn btn-white" href="#">S'inscrire</a>
    </div>

  </header>
</template>

<style lang="postcss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
  z-index: 10;
  .__logo {
    display: flex;
    align-items: center;
    position: relative;
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      right: -25px;
      height: 43px;
      border: 0.5px solid rgba(0, 0, 0, 0.2);
    }
  }
  .__adress {
    flex: 1;
    margin-left: 40px;
    &:before {
      content: '';
      display: inline-block;
      height: 15px;
      width: 8px;
      background: url(../assets/icons/pin.svg) center no-repeat;
      margin: 0 15px;
    }
  }
  .__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    color: white;
    &--underline {
      &:after {
        border-bottom: 1px solid white;
        content: '';
        display: block;
        margin: 0.25em auto 0;
        transition: width 250ms ease-in-out 0s;
        width: 0;
      }
      &:hover {
        &:after {
          width: 100%;
          transition: width 100ms ease-in-out 0s;
        }
      }
    }
  }
}
</style>
