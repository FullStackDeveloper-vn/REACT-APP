import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export default function showNotification(message, theme = 'dark') {
  Toastify({
    text: message,
    duration: 5000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'blue' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast()
};
