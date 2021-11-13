import React, { ReactElement } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SlideProps } from './Slide'

export interface SliderProps {
    index: number
    setIndex: (value: number) => void
    children: ReactElement<SlideProps>
    prev?: ReactElement<SlideProps>
    next?: ReactElement<SlideProps> 
}


const Slider = ({index, setIndex, children, prev, next}: SliderProps) => {
    return (
        <View style={StyleSheet.absoluteFill}>
            { children }
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({})
