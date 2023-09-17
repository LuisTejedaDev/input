import {forwardRef, useEffect, useRef, useState} from 'react'
import {Animated, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default forwardRef(({title = '', icon = '', handleAction = () => {}, ...rest}, ref) => {
    
    const animatedValues = {
        animation: useRef(new Animated.Value(0)).current
    }
    
    const {animation} = animatedValues
    
    const [initialState, setInitialState] = useState({
        value: '',
        focus: false
    })

    const {value, focus} = initialState

    useEffect(() => {
        handleAnimated()
    }, [focus])

    const handleAnimated = () => {
        Animated.timing(animation, {
            toValue: focus ? 1 : value === '' ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    const animatedStyles = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -27],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    return(
        <View style={[styles.inputContainer]}>
            <TextInput
                ref={ref}
                style={[styles.input]}
                value={value}
                onChangeText={(e) => setInitialState({...initialState, value: e})}
                onFocus={() => setInitialState({...initialState, focus: true})}
                onBlur={() => setInitialState({...initialState, focus: false})}
                selectionColor={'rgba(58, 109, 200, 0.3)'}
                autoCapitalize={'none'}
                {...rest}
            />
            {
                icon
                &&
                    <TouchableOpacity 
                        style={{width: 45, height: 45, justifyContent: 'center', alignItems: 'center'}}
                        onPress={handleAction}
                    >
                        <FontAwesome name={icon} size={18} color={'#3a6dc8'}/>
                    </TouchableOpacity>
            }
            <Animated.View style={[styles.titleBox, animatedStyles]} pointerEvents={'none'}>
                <Animated.Text style={[styles.title, {color: focus || value ? 'rgba(58,109,200,1)' : 'rgba(58,109,200,.5)'}]}>{title}</Animated.Text>
            </Animated.View>
        </View>
    )
})

const styles = StyleSheet.create({
    inputContainer: {
        height: 55,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1.2,
        borderColor: '#3a6dc8',
        borderRadius: 8,
        marginBottom: 25,
        flexDirection: 'row'
    },
    input: {
        height: '80%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 13,
        color: '#383838',
    },
    titleBox: {
        height: 'auto',
        width: 'auto',
        paddingHorizontal: 2,
        paddingVertical: 0.5,
        backgroundColor: '#fff',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        color: '#6F37C6',
    }
})