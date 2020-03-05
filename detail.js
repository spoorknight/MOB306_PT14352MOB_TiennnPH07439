import * as React from 'react';
import {View, Text,Image,StyleSheet,ScrollView,ImageBackground} from 'react-native';

export default function detail ({route,navigation}){
    const {data} = route.params;
    const type=[];
        if(data.active){
            type.push(<Text style={styles.category_finished }>{` ${data.active ? 'Finished':"Loading..."}`}</Text>)    
        } else{
            type.push(<Text style={styles.category_loading }>{` ${data.active ? 'Finished':"Loading..."}`}</Text>)        
        }
        
    return(
        <ImageBackground source={{uri :'https://img.freepik.com/vector-gratis/fondo-particulas-tecnologia-realista_23-2148409680.jpg?size=626&ext=jpg'}} style={styles.bgk}>
            <ScrollView style={styles.container}>              
                <View  >
                    <View >
                        <Image style={styles.image}  source={{uri: `${data.avatar}`  }} />
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
                        <Text style={styles.category}>{` ${data.total_chapters}`}</Text>
                        </View>
                        <View style={styles.content_category}>
                        <Text style={styles.title_category}>{`Active:`}</Text>
                        {type}
                        </View>
                    </View>
                </View>  

            </ScrollView>
          </ImageBackground>
    );

}


const styles = StyleSheet.create({

    container:{
        width:'100%',
        height:'100%'
    },
    bgk:{
        width:'100%',
        height:'100%'
    },
    category_finished:{
        color:'red'
    },
    category_loading:{
        color:'white'
    },
    image:{  
        marginTop:5, 
        flex: 1,
        aspectRatio: 1.1,
        width: '100%',
        resizeMode: 'contain'
    },
    content_title:{
        marginTop:30,
        flexDirection:'row',
        marginLeft: 75,
        margin:6, 
    },
    title_name_comic:{
        color:'yellow',
        fontSize:25
    },
    name_comic:{
        fontSize:25,
        color:'white'
    },
    content_category:{
        flexDirection:'row',
        marginLeft: 75,
        margin: 10,
        
    },
    title_category:{
        color:'yellow',
        fontSize:15,
    },
    category:{
        fontSize:15,
        color:'white'
    },
    




   
});