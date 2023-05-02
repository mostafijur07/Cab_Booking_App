import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const RegScreen = () => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Validate email and password
    if (!email || !password || !userName || !phoneNumber) {
      setError("Please fill all input fields");
      return;
    }
    if (!/\S+@\S+\.com/.test(email)) {
      setError("Invalid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      setError("Invalid phone number");
      return;
    }

    // Call Firebase createUserWithEmailAndPassword method
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;

      // Add a new document to Firestore with the same UID as the Auth user
      await setDoc(doc(db, "users", uid), {
        UserName: userName,
        PhoneNumber: phoneNumber,
        Email: email,
      });
      alert("User Sign Up successfully");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/email-already-in-use') {
        setError('The email address is already in use.');
      } else {
        alert(error.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../Images/AppBackimg.png')} style={styles.image} resizeMode="cover">
        <View style={styles.heading}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={30} style={{ marginLeft: 10, marginTop: 30 }} />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10, marginTop: 45 }}>Go Back</Text>
          </View>
        </View>
        <View style={styles.overlay}>
          <Text style={styles.title}>Create Account</Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={userName}
            onChangeText={setUserName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
    fontSize: 30,
    fontWeight: 'bold',
    height: 100,
    color: '#000',
    backgroundColor: '#FFA500',
  },
  backButton: {
    marginTop: 16
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
    padding: 12,
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  error: {
    color: 'red',
    marginBottom: 16
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
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default RegScreen;
