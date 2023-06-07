import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';

export function Home() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

    // const participants = ['Marcio', 'James', 'Santana', 'Borges', 'Joaquim', 'Ribeiro', 'Carolina', 'Carol'];

    function handleParticipantAdd() {
        if (participants.includes(participantName)) {
            return Alert.alert('Atenção!', `${participantName} já foi cadastrado!`)
        }

        setParticipants(prevState => [...prevState, participantName]);
        setParticipantName('');
    }
    
    function handleParticipantRemove(name: string) {
        Alert.alert('Remover', `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(Participant => Participant !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do Evento
            </Text>

            <Text style={styles.eventDate}>
                Segunda, 5 de Junho de 2023.
            </Text>

            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            {/* <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewMarginBottom}>
                {
                    participants.map(participant => (
                        <Participant 
                            key={participant}
                            name={participant}
                            onRemove={ () => handleParticipantRemove(participant)}
                        />
                    ))
                }
            </ScrollView> */}
            
            <FlatList 
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant 
                        key={item}
                        name={item}
                        onRemove={ () => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Nenhum participante cadastrado!
                    </Text>
                )}

            />
        </View>
    )
}