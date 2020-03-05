import React from 'react';
import {Text, StyleSheet, View,Image,TouchableOpacity, Alert} from 'react-native';

export default function truyenTranh({item,handleDelete,next,navigation}) {

    const alertDelete = (id,handleDelete) => {
        return Alert.alert(
            'Delete this story ?', // tham so dau tien: title
            `Do you want to delete this story`, // tham so t2: content
            [
                {
                    text: 'Yes',
                    onPress: () => {handleDelete(id)}
                },
                {
                    text: 'No',
                    onPress: () => {}
                }
            ],
            {cancleable: false}
        )
    };

    const intent = (item,next) => {
        {next(item)}
    }
   
    return (
        <View style={styles.hienthi}>
            <View style={styles.left}>
            <Image source={{ uri: `${item.avatar}` }} style = {styles.avatar}></Image>
            </View>
        <View style={styles.right}>
            <Text style={styles.textName}>{` ${item.name}`}</Text>
            <Text style={styles.text}>{`Category: ${item.category}`}</Text>
            <Text style={styles.text}>{`Chapters: ${item.total_chapters}`}</Text>
            <Text style={styles.text}>{`Active: ${item.active ? 'Finished' : "Loading"}`}</Text>
          <View style={styles.btnAll}>

            <TouchableOpacity style={styles.btn1} onPress={() => {intent(item,next)}} >
            <Text style={styles.textbtn} >DETAIL</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.btn2} onPress={() => {alertDelete(item.id,handleDelete)}} >
            <Text style={styles.textbtn}>DELETE</Text>
            </TouchableOpacity>

            </View>  
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    hienthi:{
        flex: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ccc",
        padding:9,
        margin: 4,
        borderRadius:15
    },
    avatar:{
        width: 120,
        height: 170,
    },
    left:{
        width: 115,
    },
    right:{
        textAlign:'center',
        margin:10,
        marginLeft:20
    },
    text:{
        color:'white',
        fontSize:15,
        padding:5,
        width:200,
        height:26
    },
    textName:{
        textAlign:'center',
        color:'red',
        fontSize:25,
        bottom:10
    },
    btn1:{
        backgroundColor: 'gray',
        height: 30,
        width:55,
        borderRadius:10,
        padding:8
    },
    btn2:{
        left:20,
        backgroundColor: 'gray',
        height: 30,
        width:55,
        borderRadius:10,
        padding:8
    },
    textbtn:{
        fontSize:10,
        color:'white',
        textAlign:'center'
    },
    btnAll:{
        top:10,
        left:40,
        flex:1,
        flexDirection:'row',
        alignItems:'center',

    }


});