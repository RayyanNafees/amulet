import Pocketbase from 'pocketbase'


const {DEV, PUBLIC_LOCAL_PB_URL, PUBLIC_REMOTE_PB_URL} = import.meta.env

const pb = new Pocketbase(DEV? PUBLIC_LOCAL_PB_URL: PUBLIC_REMOTE_PB_URL)

export default pb