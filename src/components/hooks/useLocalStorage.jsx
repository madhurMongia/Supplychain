import {useEffect,useState} from "react";


function getSavedValue(key, initialValue){
    const testValue = localStorage.getItem(key)?localStorage.getItem(key):"null"
    console.log(testValue)
    const savedValue = JSON.parse(testValue)
    if(savedValue) return savedValue

    if( initialValue instanceof Function) return initialValue()

    return initialValue
}

export function useLocalStorage(key , initialValue){

    const [value,setValue] = useState(() =>{
        return getSavedValue(key,initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(value))
    },[value])

    return [value,setValue]
}