import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, Modal, Pressable, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [profileModal, setProfileModal] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const GetUserData = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserName(docSnap.data().UserName);
            }
        }
        GetUserData();
    }, []);

    const handlePress = () => {
        navigation.navigate('MapScreen');
    };

    const handleBooking = () => {
        setProfileModal(!profileModal);
        navigation.navigate('BookDetailsScreen');
    };

    const handleLogout = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../Images/AppBackimg.png')} style={styles.image} resizeMode="cover">
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setProfileModal(true)}>
                        <Icon name="user" color="white" type="font-awesome" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={[
                        { id: '123', title: 'Get A Ride', image: require('../Images/CAR.png'), screen: 'MapScreen' },
                        { id: '456', title: 'Travel', image: require('../Images/Back.png'), screen: null, message: 'Service not available.' }
                    ]}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => item.screen ? handlePress() : alert(item.message)}>
                            <View style={styles.cardContentVertical}>
                                <Image style={styles.cardImage} source={item.image} />
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Icon style={styles.arrowIcon} name="arrowright" color="white" type="antdesign" />
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={profileModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.profileModalContent}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setProfileModal(false)}
                            >
                                <Icon name="close" color="black" type="font-awesome" />
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row', paddingVertical:20}}>
                            <Icon name="user" color="black" type="font-awesome" />
                            <Text style={styles.Modelheading}>{userName}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleBooking}
                            >
                                 <FontAwesome name="bookmark-o" size={20} color="#666" style={{ marginRight: 10 }} />
                                <Text style={styles.buttonText}>Your Bookings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                // onPress={handleSettings}
                            >
                                <FontAwesome name="cog" size={20} color="#666" style={{ marginRight: 10 }} />
                                <Text style={styles.buttonText}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.logoutButton]}
                                onPress={handleLogout}
                            >
                                <Icon name="sign-out" type="font-awesome" size={20} color="#666" style={{ marginRight: 10 }} />
                                <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#FFA500'
    },
    menuButton: {
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 20
    },
    flatList: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    card: {
        backgroundColor: '#fff',
        marginRight: 10,
        marginTop: 80,
        marginBottom: 30,
        marginLeft: 40,
        width: 250,
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 100,
        shadowColor: '#000',
        shadowOpacity: 10,
        shadowOffset: { width: 2, height: 2 },
    },
    cardContent: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    cardImage: {
        marginTop: 20,
        marginLeft: 65,
        width: 120,
        height: 80,
        marginBottom: 10,
    },
    cardTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    arrowIcon: {
        marginLeft: 100,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 40,
        width: 50,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      profileModalContent: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '60%',
        height: '100%',
        backgroundColor: 'white',
        padding: 20,
      },
      closeButton: {
        position: 'absolute',
        right: 0,
        padding: 10,
      },
      Modelheading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingHorizontal: 10,
        alignSelf: 'center',
      },
      button: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
      },
      logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FF5733',
        marginTop: 20,
      },
      logoutText: {
        color: '#fff',
      },
    });

export default HomeScreen;