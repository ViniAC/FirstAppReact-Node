import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {

    const navigation = useNavigation();
    const message = 'Olá mundo';

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: 'teste',
            recipients: ['igorjales_@hotmail.com'],
            body: message,
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=5581999457335&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>

            </View>


            <View style={styles.meal}>

                <Text style={[styles.mealProperty, { marginTop: 0 }]}>Restaurante:</Text>
                <Text style={styles.mealValue}>Outback</Text>

                <Text style={styles.mealProperty}>Prato:</Text>
                <Text style={styles.mealValue}>Costela</Text>

                <Text style={styles.mealProperty}>Valor:</Text>
                <Text style={styles.mealValue}>R$120,00</Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.titleContact}>Algum problema ou dúvida?</Text>

                <Text style={styles.contactDescription}>Entre em contato com a empresa: </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-Mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}