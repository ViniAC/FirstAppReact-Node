import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function Meals() {

    const [meals, setMeals] = useState([]);

    const navigation = useNavigation();

    function navigateToDetail() {
        navigation.navigate('Detail');
    }

    async function loadIncidents() {
        const response = await api.get('meals');
        setMeals(response.data);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <Image source={logoImg} />
                <Text style={styles.headerText} >
                    Total de <Text style={styles.headerTextBold}>0 pratos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha os pratos abaixo e mate sua fome!</Text>

            <FlatList
                style={styles.mealList}
                data={meals}
                keyExtractor={meal => String(meal.pk_id_meal)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: meal }) => (
                    <View style={styles.meal}>
                        <Text style={styles.mealProperty}>Restaurante:</Text>
                        <Text style={styles.mealValue}>{meal.companie_name}</Text>

                        <Text style={styles.mealProperty}>Prato:</Text>
                        <Text style={styles.mealValue}>{meal.meal_name}</Text>

                        <Text style={styles.mealProperty}>Valor:</Text>
                        <Text style={styles.mealValue}>{meal.value}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={navigateToDetail}
                        >
                            <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View >
    );
}