<template>
    <label :for="id + '_button'" :class="{'active': isActive}" class="toggle__button">
        <!-- <span v-if="isActive" class="toggle__label">{{ enableText }}</span>
        <span v-if="! isActive" class="toggle__label">{{ disabledText }}</span> -->

        <input type="checkbox" :disabled="disabled" :id="id + '_button'" v-model="checkedValue">
        <span class="toggle__switch"></span>
    </label>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    // labelEnableText: {
    //   type: String,
    //   default: 'On'
    // },

    // labelDisableText: {
    //   type: String,
    //   default: 'Off'
    // },

    id: {
      type: String,
      default: 'primary'
    },

    defaultState: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      currentState: this.defaultState
    }
  },

  watch: {
    defaultState: function defaultState () {
      this.currentState = Boolean(this.defaultState)
    }
  },

  computed: {
    // currentState() {
    //     return this.defaultState;
    // },

    isActive () {
      return this.currentState
    },

    enableText () {
      return this.labelEnableText
    },

    disabledText () {
      return this.labelDisableText
    },

    checkedValue: {
      get () {
        return this.currentState
      },

      set (newValue) {
        this.currentState = newValue
        this.$emit('change', newValue)
      }
    }
  }
}
</script>

<style scoped>
.toggle__button {
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
}
.toggle__button input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
}
.toggle__button .toggle__switch {
    display: inline-block;
    height: 12px;
    border-radius:6px;
    width:40px;
    background: #e6e6e6;
    box-shadow: inset 0 0 1px #6e6e6e;
    position: relative;
    margin-left: 10px;
    transition: all .25s;
}

.toggle__button .toggle__switch::after,
.toggle__button .toggle__switch::before {
    content: "";
    position: absolute;
    display: block;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    left: 0;
    top: -3px;
    transform: translateX(0);
    transition: all .25s cubic-bezier(.5, -.6, .5, 1.6);
}

.toggle__button .toggle__switch::after {
    background: #adadad;
    box-shadow: 0 0 1px rgb(0, 0, 0);
}
.toggle__button .toggle__switch::before {
    background: #adadad;
    box-shadow: 0 0 0 3px rgba(44, 141, 41, 0.1);
    opacity:0;
}

.active .toggle__switch {
    background: #747474;
    box-shadow: inset 0 0 1px #000000;
}

.active .toggle__switch::after,
.active .toggle__switch::before{
    transform:translateX(40px - 18px);
}

.active .toggle__switch::after {
    left: 23px;
    background: #000000;
    box-shadow: 0 0 1px #000000;
}
</style>
