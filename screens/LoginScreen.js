import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebaseConfig";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Login successfully");
                navigation.replace("HomeScreen");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            })
            .finally(() => setLoading(false));
    };

    const handleSignUp = () => {
        navigation.navigate("RegScreen");
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../Images/AppBackimg.png')} style={styles.image} resizeMode="cover">
                <View style={styles.heading}>
                    <Text style={styles.headingText}>CAB Booking App</Text>
                </View>
                <View style={styles.overlay}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={styles.signup}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signupText}> Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal visible={loading} transparent={true} animationType='none'>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color='#0000ff' />
                    </View>
                </Modal>
            </ImageBackground>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        height: 100,
        color: '#000',
        backgroundColor: '#FFA500',
    },
    headingText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 30,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: 'skyblue',
        borderRadius: 10,
    },
    input: {
        width: '80%',
        height: 48,
        padding: 12,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        marginBottom: 16
    },
    button: {
        backgroundColor: '#FFA500',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    signup: {
        flexDirection: 'row',
    },
    signupText: {
        color: '#2196F3',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default LoginScreen;
