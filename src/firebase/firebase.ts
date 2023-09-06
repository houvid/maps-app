
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEAPIKEY,
  authDomain: 'mapaapi-f3cd5.firebaseapp.com',
  databaseURL: 'https://mapaapi-f3cd5-default-rtdb.firebaseio.com',
  projectId: 'mapaapi-f3cd5',
  storageBucket: 'mapaapi-f3cd5.appspot.com',
  messagingSenderId: '890171645941',
  appId: '1:890171645941:web:ccc7f8985d6bdadd214abc'
}

export const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const auth = getAuth(app)
export const storage = getStorage(app)

export async function getFeatures () {
  const featuresCollection = collection(db, 'features')
  const featuresSnapshot = await getDocs(featuresCollection)
  const featuresList = featuresSnapshot.docs.map(doc => doc.data())
  console.log(featuresList)
  return featuresList
}
export async function addFeature (feature: any) {
  const featuresCollection = collection(db, 'features')
  const newFeatureRef = doc(featuresCollection)
  try {
    await addDoc(featuresCollection, { ...feature, id: newFeatureRef.id })
    console.log('Feature agregado correctamente')
  } catch (e) {
    console.error('Error al agregar el Feature: ', e)
  }
}
export async function uploadImage (file: any) {
  const storageRef = ref(storage, 'lugares/' + v4())
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}
