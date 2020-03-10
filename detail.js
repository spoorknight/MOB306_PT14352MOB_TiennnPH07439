import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';

export default function detail({ route, navigation }) {
    const { data } = route.params;
    const type = [];
    if (data.active) {
        type.push(<Text style={styles.category_finished}>{` ${data.active ? 'Finished' : "Loading..."}`}</Text>)
    } else {
        type.push(<Text style={styles.category_loading}>{` ${data.active ? 'Finished' : "Loading..."}`}</Text>)
    }

    return (
        <ImageBackground source={{ uri: 'https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista_23-2148409680.jpg?size=626&ext=jpg' }} style={styles.bgk}>
            <ScrollView style={styles.container}>
                <View style={styles.top} >
                    <View >
                        <Image style={styles.image} source={{ uri: `${data.avatar}` }} />
                    </View>
                    <View >
                        <View style={styles.content_title}>
                            <Text style={styles.title_name_comic} >{`Name:`}</Text>
                            <Text style={styles.name_comic}>{` ${data.name}`}</Text>
                        </View>
                        <View style={styles.content_category}>
                            <Text style={styles.title_category}>{`Category:`}</Text>
                            <Text style={styles.category}>{` ${data.category}`}</Text>
                        </View>
                        <View style={styles.content_category}>
                            <Text style={styles.title_category}>{`Chapters:`}</Text>
                            <Text style={styles.total_chapters}>{` ${data.total_chapters}`}</Text>
                        </View>
                        <View style={styles.content_category}>
                            <Text style={styles.title_Active}>{`Active:`}</Text>
                            {type}
                        </View>
                    </View>
                </View>
                <View style={styles.bot}>
                    <View style={styles.bot_content}>
                        <Text style={styles.bot_content_title}>Nội dung</Text>
                    </View>
                    <View style={styles.bot_content_detail}>
                        <ScrollView>
                        <Text style={styles.bot_content_detail_text}>{`${data.content}`}</Text>
                        </ScrollView>
                    </View>
                </View>
                <View>
                    
                </View>
            </ScrollView>
        </ImageBackground>
    );

}


const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%'
    },
    bgk: {
        width: '100%',
        height: '100%'
    },
    category_finished: {
        color: 'red'
    },
    category_loading: {
        color: 'white'
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        top: '5%',
        height: 190
    },
    image: {
        width: 150,
        height: 160,
        left: 5,
        marginTop:20,
        borderRadius:100
    },
    content_title: {
        marginTop: 10,
        flexDirection: 'row',
        marginLeft: 15,
        margin: 15,
        top: 10
    },
    title_name_comic: {
        color: 'yellow',
        fontSize: 20
    },
    name_comic: {
        fontSize: 20,
        color: 'white'
    },
    content_category: {
        flexDirection: 'row',
        marginLeft: 15,
        margin: 12,
        top: 10
    },
    title_category: {
        color: 'yellow',
        fontSize: 15,
    },
    category: {
        fontSize: 15,
        color: 'white',
    },
    total_chapters: {
        fontSize: 15,
        color: 'white',
    },
    title_Active: {
        fontSize: 15,
        color: 'yellow',
    },
    bot: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: 'gray',
        flex: 1,
    },
    bot_content_title: {
        color: 'gray',
        fontSize: 20,
        textDecorationLine: 'underline',
        top: 40
    },
    bot_content_detail: {
        borderColor: 'gray',
        borderRadius: 20,
        borderWidth: 1,
        width: 300,
        height: 160,
        top: 50,
    },
    bot_content_detail_text:{
        color:'white',
        margin:10,
        lineHeight:20
    }




});