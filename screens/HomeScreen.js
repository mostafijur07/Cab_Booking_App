import React, {useState} from 'react';
import {
StyleSheet,
Text,
View,
SafeAreaView,
FlatList,
TouchableOpacity,
Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const data = [
{
id: '123',
title: 'Get a ride',
image: require('../Images/CAR.png'),
screen: 'MapScreen',
},
];

const HomeScreen = () => {
const navigation = useNavigation();

const handlePress = () => {
navigation.navigate('MapScreen');
};

return (
<SafeAreaView style={tw`h-full bg-white`}>
<FlatList
data={data}
keyExtractor={item => item.id}
horizontal
showsHorizontalScrollIndicator={false}
contentContainerStyle={tw`px-4 pb-4`}
renderItem={({item}) => (
<TouchableOpacity
style={tw`p-2 bg-gray-100 mr-4 mt-4 mb-4 w-64 rounded-xl`}
onPress={handlePress}>
<View style={tw`items-center`}>
<Image
style={{width: '100%', height: 200, resizeMode: 'contain'}}
source={item.image}
/>
<Text style={tw`text-xl font-semibold mt-2`}>{item.title}</Text>
<Icon
style={tw`p-2 bg-black rounded-full w-10 mt-4`}
name="arrowright"
color="white"
type="antdesign"
/>
</View>
</TouchableOpacity>
)}
/>
</SafeAreaView>
);
};

export default HomeScreen;

const styles = StyleSheet.create({});