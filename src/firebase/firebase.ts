
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore'
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
  const featuresList = featuresSnapshot.docs.map(doc => {
    const data = doc.data()
    const idCollection = doc.id
    return { idCollection, ...data }
  })
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
export async function updateFeature (featureId: string | undefined, updatedFeatureData: any) {
  const featuresCollection = collection(db, 'features')
  const featureRef = doc(featuresCollection, featureId)
  try {
    await updateDoc(featureRef, updatedFeatureData)
    console.log('Feature actualizado correctamente')
  } catch (e) {
    console.error('Error al actualizar el Feature: ', e)
  }
}
export async function uploadImage (file: any, folder: string) {
  const storageRef = ref(storage, folder + '/' + v4())
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}
