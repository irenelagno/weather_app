/* 
* <license header>
*/

import allActions from '../config.json'
import React, { useState,useEffect } from 'react'
import getWeather from '../utils'

import {
    View, Well, Button, Text
} from '@adobe/react-spectrum'

const WeatherInfo = () => {
    const [list, setList] = useState('')
    useEffect (() => {
        (async () => {
            await getWeatherFromAction();
        })()
    }, [])
    return (
        <View>
            <Well justifySelf="center">
                <p>{list}</p>
                <Button variant="primary" onPress={getWeatherFromAction}>
                    <Text>Get latest weather</Text>
                </Button>
            </Well>
        </View>

    )

    /**
     * Retrieve weather from runtime action
     * @returns {Promise<void>}
     */
    async function getWeatherFromAction()
    {
        try {
            setList('Retrieveing weather list...')
            const response = await getWeather(allActions['get-weather'])
            const message = `The air temperature in ${response.location.name} , ${response.location.country} is ${response.current.feelslike_c}℃`
            setList(message)
        } catch (e) {
            console.log(e.message);
            setList(`There is a problem to retrieve weather in ${process.env.CITY}`)
        }

    }
}

export default WeatherInfo