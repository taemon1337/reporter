import Vue from 'vue'
import { capitalize } from '@/lib/capitalize'
import { substring } from '@/lib/substring'

Vue.filter('capitalize', capitalize)
Vue.filter('substring', substring)
